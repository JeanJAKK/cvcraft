import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCvSchema, insertUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
