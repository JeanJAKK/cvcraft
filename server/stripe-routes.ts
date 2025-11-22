import express, { type Express } from 'express';
import { storage } from './storage';
import { stripeService } from './stripeService';

export function registerStripeRoutes(app: Express) {
  app.get('/api/stripe/subscription', async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user?.id || req.session?.userId);
      if (!user?.stripeSubscriptionId) {
        return res.json({ subscription: null });
      }

      const subscription = await storage.getSubscription(user.stripeSubscriptionId);
      res.json({ subscription });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/stripe/checkout', async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user?.id || req.session?.userId);
      const { priceId } = req.body;

      if (!priceId) {
        return res.status(400).json({ error: 'priceId is required' });
      }

      let customerId = user?.stripeCustomerId;
      if (!customerId && user?.id) {
        const customer = await stripeService.createCustomer(user?.email || user?.username || 'user', user.id);
        await storage.updateUserStripeInfo(user?.id!, { stripeCustomerId: customer.id });
        customerId = customer.id;
      }

      const session = await stripeService.createCheckoutSession(
        customerId,
        priceId,
        `${req.protocol}://${req.get('host')}/checkout/success`,
        `${req.protocol}://${req.get('host')}/checkout/cancel`
      );

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/stripe/customer-portal', async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user?.id || req.session?.userId);
      if (!user?.stripeCustomerId) {
        return res.status(400).json({ error: 'No Stripe customer found' });
      }

      const session = await stripeService.createCustomerPortalSession(
        user.stripeCustomerId,
        `${req.protocol}://${req.get('host')}/account`
      );

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/stripe/products', async (req, res) => {
    try {
      const products = await storage.listProducts();
      res.json({ data: products });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/stripe/products-with-prices', async (req, res) => {
    try {
      const rows = await storage.listProductsWithPrices();

      const productsMap = new Map();
      for (const row of rows) {
        if (!productsMap.has(row.product_id)) {
          productsMap.set(row.product_id, {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            active: row.product_active,
            prices: []
          });
        }
        if (row.price_id) {
          productsMap.get(row.product_id).prices.push({
            id: row.price_id,
            unit_amount: row.unit_amount,
            currency: row.currency,
            recurring: row.recurring,
            active: row.price_active,
          });
        }
      }

      res.json({ data: Array.from(productsMap.values()) });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/stripe/prices', async (req, res) => {
    try {
      const prices = await storage.listPrices();
      res.json({ data: prices });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/stripe/products/:productId/prices', async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const prices = await storage.getPricesForProduct(productId);
      res.json({ data: prices });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
