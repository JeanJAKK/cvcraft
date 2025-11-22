import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage } from "./storage";
import { insertCvSchema, insertUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { registerStripeRoutes } from "./stripe-routes";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn('DATABASE_URL not set, skipping Stripe initialization');
    return;
  }

  try {
    console.log('Initializing Stripe schema...');
    await runMigrations({ 
      databaseUrl
    });
    console.log('Stripe schema ready');

    const stripeSync = await getStripeSync();

    console.log('Setting up managed webhook...');
    const webhookBaseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost'}`;
    const { webhook, uuid } = await stripeSync.findOrCreateManagedWebhook(
      `${webhookBaseUrl}/api/stripe/webhook`,
      {
        enabled_events: ['*'],
        description: 'Managed webhook for Stripe sync',
      }
    );
    console.log(`Webhook configured: ${webhook.url}`);

    // Sync in background
    stripeSync.syncBackfill()
      .then(() => {
        console.log('Stripe data synced');
      })
      .catch((err: any) => {
        console.error('Error syncing Stripe data:', err);
      });
  } catch (error) {
    console.error('Stripe initialization note:', error instanceof Error ? error.message : error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Stripe on startup
  await initStripe();

  // Register Stripe webhook route BEFORE express.json()
  app.post(
    '/api/stripe/webhook/:uuid',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const signature = req.headers['stripe-signature'];

      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature' });
      }

      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;

        if (!Buffer.isBuffer(req.body)) {
          const errorMsg = 'STRIPE WEBHOOK ERROR: req.body is not a Buffer.';
          console.error(errorMsg);
          return res.status(500).json({ error: 'Webhook processing error' });
        }

        const { uuid } = req.params;
        await WebhookHandlers.processWebhook(req.body as Buffer, sig, uuid);

        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error('Webhook error:', error.message);
        res.status(400).json({ error: 'Webhook processing error' });
      }
    }
  );

  // Now apply JSON middleware for all other routes
  app.use(express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));
  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      req.session!.userId = user.id;
      res.status(201).json({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create account" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      req.session!.userId = user.id;
      res.json({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to login" });
      }
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      res.json({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Template routes
  app.get("/api/templates", async (_req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  // CV routes
  app.get("/api/cvs", async (_req, res) => {
    try {
      const cvs = await storage.getAllCVs();
      res.json(cvs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch CVs" });
    }
  });

  app.get("/api/cvs/:id", async (req, res) => {
    try {
      const cv = await storage.getCV(req.params.id);
      if (!cv) {
        return res.status(404).json({ error: "CV not found" });
      }
      res.json(cv);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch CV" });
    }
  });

  app.post("/api/cvs", async (req, res) => {
    try {
      const validatedData = insertCvSchema.parse(req.body);
      const cv = await storage.createCV(validatedData);
      res.status(201).json(cv);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create CV" });
      }
    }
  });

  app.patch("/api/cvs/:id", async (req, res) => {
    try {
      const validatedData = insertCvSchema.partial().parse(req.body);
      const cv = await storage.updateCV(req.params.id, validatedData);
      if (!cv) {
        return res.status(404).json({ error: "CV not found" });
      }
      res.json(cv);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update CV" });
      }
    }
  });

  app.delete("/api/cvs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCV(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "CV not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete CV" });
    }
  });

  // Register Stripe payment routes
  registerStripeRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
