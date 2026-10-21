import { Polar } from '@polar-sh/sdk';
import { validateEvent } from '@polar-sh/sdk/webhooks';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});

export async function createPolarCheckout(productId: string, customerEmail: string) {
  return await polar.checkouts.create({
    products: [productId],
    customerEmail,
    successUrl: 'https://example.com/success?checkout_id={CHECKOUT_ID}',
  });
}

export function verifyPolarWebhook(rawBody: string, headers: Record<string, string>) {
  return validateEvent(rawBody, headers, process.env.POLAR_WEBHOOK_SECRET!);
}
