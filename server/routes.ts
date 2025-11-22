import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCvSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
