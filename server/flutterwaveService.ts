import { storage } from './storage';
import { 
  createFlutterwavePayment, 
  verifyFlutterwaveTransaction,
  getFlutterwaveTransaction
} from './flutterwaveClient';

export class FlutterwaveService {
  async initiateCheckout(
    userId: string,
    priceId: string,
    amount: number,
    currency: string,
    successUrl: string,
    cancelUrl: string
  ) {
    const user = await storage.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const email = user.email || `user_${user.id}@cvcraft.app`;
    const phoneNumber = '1234567890'; // Placeholder - can be extended to user profile

    const payment = await createFlutterwavePayment(
      Math.round(amount * 100), // Convert to cents
      currency,
      email,
      phoneNumber,
      user.username,
      successUrl,
      {
        userId,
        priceId,
        type: 'subscription',
      }
    );

    return {
      link: payment.link,
      transactionId: payment.id,
      status: payment.status,
    };
  }

  async verifyTransaction(transactionId: string) {
    try {
      const transaction = await verifyFlutterwaveTransaction(transactionId);
      return {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount / 100, // Convert from cents
        currency: transaction.currency,
        email: transaction.customer.email,
        userId: transaction.meta?.userId,
        priceId: transaction.meta?.priceId,
      };
    } catch (error: any) {
      throw new Error(`Failed to verify transaction: ${error.message}`);
    }
  }

  async getTransaction(transactionId: string) {
    try {
      const transaction = await getFlutterwaveTransaction(transactionId);
      return {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount / 100,
        currency: transaction.currency,
        email: transaction.customer.email,
        createdAt: transaction.created_at,
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch transaction: ${error.message}`);
    }
  }

  async updateUserSubscription(userId: string, priceId: string) {
    // Map Flutterwave payment to subscription
    const subscription = {
      id: `sub_${Date.now()}`,
      status: 'active',
      priceId,
      userId,
    };

    // Store subscription in database
    return subscription;
  }
}

export const flutterwaveService = new FlutterwaveService();
