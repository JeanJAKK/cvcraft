import type { Template } from "@shared/schema";

export const TEMPLATES: Template[] = [
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

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id);
}

export function getFreeTemplates(): Template[] {
  return TEMPLATES.filter(t => !t.isPremium);
}

export function getPremiumTemplates(): Template[] {
  return TEMPLATES.filter(t => t.isPremium);
}
