import { pgTable, text, varchar, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// CV Data Schema
export const cvs = pgTable("cvs", {
  id: varchar("id").primaryKey(),
  templateId: text("template_id").notNull(),
  personalInfo: jsonb("personal_info").notNull().$type<PersonalInfo>(),
  experience: jsonb("experience").notNull().$type<ExperienceEntry[]>(),
  education: jsonb("education").notNull().$type<EducationEntry[]>(),
  skills: jsonb("skills").notNull().$type<string[]>(),
});

// Templates Schema
export const templates = pgTable("templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  isPremium: boolean("is_premium").notNull().default(false),
  price: integer("price"),
});

// TypeScript Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Zod Schemas for Validation
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
});

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string().min(1, "Description is required"),
});

export const educationEntrySchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string(),
});

export const cvDataSchema = z.object({
  templateId: z.string(),
  personalInfo: personalInfoSchema,
  experience: z.array(experienceEntrySchema),
  education: z.array(educationEntrySchema),
  skills: z.array(z.string()),
});

// Insert Schemas
export const insertCvSchema = createInsertSchema(cvs).omit({ id: true }).extend({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceEntrySchema),
  education: z.array(educationEntrySchema),
  skills: z.array(z.string()),
});

export const insertTemplateSchema = createInsertSchema(templates);

// Select Types
export type CV = typeof cvs.$inferSelect;
export type InsertCV = z.infer<typeof insertCvSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

// Users (keep existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
