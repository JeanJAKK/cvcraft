import { 
  type User, 
  type InsertUser, 
  type CV, 
  type InsertCV,
  type Template 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // CV methods
  getCV(id: string): Promise<CV | undefined>;
  getAllCVs(): Promise<CV[]>;
  createCV(cv: InsertCV): Promise<CV>;
  updateCV(id: string, cv: Partial<InsertCV>): Promise<CV | undefined>;
  deleteCV(id: string): Promise<boolean>;

  // Template methods
  getTemplate(id: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cvs: Map<string, CV>;
  private templates: Map<string, Template>;

  constructor() {
    this.users = new Map();
    this.cvs = new Map();
    this.templates = new Map();
    this.initializeTemplates();
  }

  private initializeTemplates() {
    const defaultTemplates: Template[] = [
      {
        id: "modern",
        name: "Modern Professional",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "classic",
        name: "Classic Elegance",
        category: "Classic",
        isPremium: false,
        price: null,
      },
      {
        id: "minimal",
        name: "Minimal Clean",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "creative",
        name: "Creative Bold",
        category: "Creative",
        isPremium: false,
        price: null,
      },
      {
        id: "executive",
        name: "Executive Pro",
        category: "Classic",
        isPremium: false,
        price: null,
      },
      {
        id: "tech",
        name: "Tech Modern",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "designer",
        name: "Designer Portfolio",
        category: "Creative",
        isPremium: false,
        price: null,
      },
      {
        id: "academic",
        name: "Academic Scholar",
        category: "Classic",
        isPremium: false,
        price: null,
      },
      {
        id: "elegant",
        name: "Elegant Refined",
        category: "Classic",
        isPremium: false,
        price: null,
      },
      {
        id: "sidebar",
        name: "Sidebar Modern",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "cards",
        name: "Cards Style",
        category: "Creative",
        isPremium: false,
        price: null,
      },
      {
        id: "twocolumn",
        name: "Two Column",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "minimalist",
        name: "Minimalist",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "corporate",
        name: "Corporate",
        category: "Classic",
        isPremium: false,
        price: null,
      },
      {
        id: "blue",
        name: "Modern Blue",
        category: "Modern",
        isPremium: false,
        price: null,
      },
      {
        id: "clean",
        name: "Clean Layout",
        category: "Modern",
        isPremium: false,
        price: null,
      },
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // CV methods
  async getCV(id: string): Promise<CV | undefined> {
    return this.cvs.get(id);
  }

  async getAllCVs(): Promise<CV[]> {
    return Array.from(this.cvs.values());
  }

  async createCV(insertCV: InsertCV): Promise<CV> {
    const id = randomUUID();
    const cv: CV = { ...insertCV, id };
    this.cvs.set(id, cv);
    return cv;
  }

  async updateCV(id: string, updates: Partial<InsertCV>): Promise<CV | undefined> {
    const existing = this.cvs.get(id);
    if (!existing) return undefined;

    const updated: CV = { ...existing, ...updates };
    this.cvs.set(id, updated);
    return updated;
  }

  async deleteCV(id: string): Promise<boolean> {
    return this.cvs.delete(id);
  }

  // Template methods
  async getTemplate(id: string): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }
}

export const storage = new MemStorage();
