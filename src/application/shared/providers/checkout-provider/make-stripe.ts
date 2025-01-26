import { env } from '@/application/config/env';
import Stripe from 'stripe';

export function makeStripe(stripeAccountId?: string) {
  return new Stripe(env.stripe.secretKey, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
    stripeAccount: stripeAccountId,
  });
}
