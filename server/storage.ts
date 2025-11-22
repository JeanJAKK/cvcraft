import { 
  type User, 
  type InsertUser, 
  type CV, 
  type InsertCV,
  type Template 
} from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { users as usersTable } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeInfo: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }): Promise<User | undefined>;

  // CV methods
  getCV(id: string): Promise<CV | undefined>;
  getAllCVs(): Promise<CV[]>;
  createCV(cv: InsertCV): Promise<CV>;
  updateCV(id: string, cv: Partial<InsertCV>): Promise<CV | undefined>;
  deleteCV(id: string): Promise<boolean>;

  // Template methods
  getTemplate(id: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;

  // Stripe methods
  getProduct(productId: string): Promise<any>;
  listProducts(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  listProductsWithPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPrice(priceId: string): Promise<any>;
  listPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPricesForProduct(productId: string): Promise<any[]>;
  getSubscription(subscriptionId: string): Promise<any>;
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
        isPremium: true,
        price: 999,
      },
      {
        id: "executive",
        name: "Executive Pro",
        category: "Classic",
        isPremium: true,
        price: 999,
      },
      {
        id: "tech",
        name: "Tech Modern",
        category: "Modern",
        isPremium: true,
        price: 999,
      },
      {
        id: "designer",
        name: "Designer Portfolio",
        category: "Creative",
        isPremium: true,
        price: 999,
      },
      {
        id: "academic",
        name: "Academic Scholar",
        category: "Classic",
        isPremium: true,
        price: 999,
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
    const user: User = { 
      ...insertUser, 
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null
    };
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

  // Stripe methods
  async updateUserStripeInfo(userId: string, stripeInfo: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;

    const updated: User = { 
      ...user,
      ...(stripeInfo.stripeCustomerId && { stripeCustomerId: stripeInfo.stripeCustomerId }),
      ...(stripeInfo.stripeSubscriptionId && { stripeSubscriptionId: stripeInfo.stripeSubscriptionId }),
    };
    this.users.set(userId, updated);
    return updated;
  }

  async getProduct(productId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE id = ${productId}`
    );
    return result.rows[0] || null;
  }

  async listProducts(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async listProductsWithPrices(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`
        WITH paginated_products AS (
          SELECT id, name, description, metadata, active
          FROM stripe.products
          WHERE active = ${active}
          ORDER BY id
          LIMIT ${limit} OFFSET ${offset}
        )
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM paginated_products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        ORDER BY p.id, pr.unit_amount
      `
    );
    return result.rows;
  }

  async getPrice(priceId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
    );
    return result.rows[0] || null;
  }

  async listPrices(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async getPricesForProduct(productId: string): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE product = ${productId} AND active = true`
    );
    return result.rows;
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.subscriptions WHERE id = ${subscriptionId}`
    );
    return result.rows[0] || null;
  }
}

export const storage = new MemStorage();
