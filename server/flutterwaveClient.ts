import axios from 'axios';

let flutterwaveApiKey: string | null = null;
let flutterwaveBaseUrl: string;

export async function initFlutterwave() {
  // Get API key from environment
  flutterwaveApiKey = process.env.FLUTTERWAVE_SECRET_KEY;
  
  // Use test URL for development, live for production
  const isProduction = process.env.REPLIT_DEPLOYMENT === '1';
  flutterwaveBaseUrl = isProduction
    ? 'https://api.flutterwave.com/v3'
    : 'https://api.flutterwave.com/v3';

  if (!flutterwaveApiKey) {
    throw new Error('FLUTTERWAVE_SECRET_KEY environment variable is not set');
  }
}

export async function createFlutterwavePayment(
  amount: number,
  currency: string,
  email: string,
  phoneNumber: string,
  fullName: string,
  redirectUrl: string,
  metadata: Record<string, any> = {}
) {
  if (!flutterwaveApiKey) {
    await initFlutterwave();
  }

  const payload = {
    tx_ref: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    redirect_url: redirectUrl,
    customer: {
      email,
      phonenumber: phoneNumber,
      name: fullName,
    },
    customizations: {
      title: 'CVCraft Premium Templates',
      description: 'Unlock premium CV templates',
      logo: 'https://cvcraft.app/logo.png',
    },
    meta: metadata,
  };

  const response = await axios.post(
    `${flutterwaveBaseUrl}/payments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data;
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
  if (!flutterwaveApiKey) {
    await initFlutterwave();
  }

  const response = await axios.get(
    `${flutterwaveBaseUrl}/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveApiKey}`,
      },
    }
  );

  return response.data.data;
}

export async function getFlutterwaveTransaction(transactionId: string) {
  if (!flutterwaveApiKey) {
    await initFlutterwave();
  }

  const response = await axios.get(
    `${flutterwaveBaseUrl}/transactions/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveApiKey}`,
      },
    }
  );

  return response.data.data;
}

export async function createFlutterwaveChargeForUser(
  userId: string,
  amount: number,
  currency: string,
  cardToken: string,
  email: string
) {
  if (!flutterwaveApiKey) {
    await initFlutterwave();
  }

  const payload = {
    amount,
    currency,
    email,
    tx_ref: `charge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    token: cardToken,
  };

  const response = await axios.post(
    `${flutterwaveBaseUrl}/charges?type=card`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data;
}
