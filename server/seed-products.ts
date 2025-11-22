import { getUncachableStripeClient } from './stripeClient';

async function seedProducts() {
  try {
    const stripe = await getUncachableStripeClient();

    console.log('Creating Premium Templates product...');
    const product = await stripe.products.create({
      name: 'Premium CV Templates',
      description: 'Access to exclusive CV templates and advanced features',
      metadata: {
        category: 'templates',
        featured: 'true',
      }
    });

    console.log('Creating monthly price...');
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 999, // $9.99
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: {
        tier: 'premium',
      }
    });

    console.log('Creating yearly price...');
    const yearlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 9999, // $99.99
      currency: 'usd',
      recurring: { interval: 'year' },
      metadata: {
        tier: 'premium',
        savings: '17%',
      }
    });

    console.log('\n✓ Products created successfully!');
    console.log(`Product ID: ${product.id}`);
    console.log(`Monthly Price ID: ${monthlyPrice.id}`);
    console.log(`Yearly Price ID: ${yearlyPrice.id}`);
    console.log('\nWebhooks will automatically sync these to your database.');
  } catch (error) {
    console.error('Error creating products:', error);
    process.exit(1);
  }
}

seedProducts();
