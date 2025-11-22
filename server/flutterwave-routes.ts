import express, { type Express } from 'express';
import { storage } from './storage';
import { flutterwaveService } from './flutterwaveService';

export function registerFlutterwaveRoutes(app: Express) {
  // Get products with prices
  app.get('/api/payment/products', async (req, res) => {
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
            amount: row.unit_amount / 100, // Convert from cents to currency
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

  // Initiate payment
  app.post('/api/payment/checkout', async (req: any, res) => {
    try {
      const userId = req.session?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const { priceId, amount, currency = 'NGN' } = req.body;

      if (!priceId || !amount) {
        return res.status(400).json({ error: 'priceId and amount are required' });
      }

      const successUrl = `${req.protocol}://${req.get('host')}/payment/success`;
      const cancelUrl = `${req.protocol}://${req.get('host')}/payment/cancel`;

      const payment = await flutterwaveService.initiateCheckout(
        userId,
        priceId,
        amount,
        currency,
        successUrl,
        cancelUrl
      );

      res.json({ 
        paymentLink: payment.link,
        transactionId: payment.transactionId,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Verify payment
  app.post('/api/payment/verify', async (req: any, res) => {
    try {
      const { transactionId } = req.body;

      if (!transactionId) {
        return res.status(400).json({ error: 'transactionId is required' });
      }

      const transaction = await flutterwaveService.verifyTransaction(transactionId);

      // Update user subscription if payment successful
      if (transaction.status === 'successful' && transaction.userId) {
        await storage.updateUserStripeInfo(transaction.userId, {
          stripeSubscriptionId: `sub_${transaction.id}`,
        });
      }

      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get transaction details
  app.get('/api/payment/transaction/:id', async (req, res) => {
    try {
      const transaction = await flutterwaveService.getTransaction(req.params.id);
      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Webhook for Flutterwave events
  app.post('/api/payment/webhook', async (req, res) => {
    try {
      const { event, data } = req.body;

      if (event === 'charge.completed') {
        // Payment completed
        console.log('Payment completed:', data);
        
        // Verify and update subscription
        const transaction = await flutterwaveService.verifyTransaction(data.id);
        if (transaction.userId) {
          await storage.updateUserStripeInfo(transaction.userId, {
            stripeSubscriptionId: `sub_${transaction.id}`,
          });
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: error.message });
    }
  });
}
