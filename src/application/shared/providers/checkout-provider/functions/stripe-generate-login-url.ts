import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import Stripe from 'stripe';

export async function stripeGenerateLoginUrl(stripe: Stripe, stripeAccountId: string) {
  const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);

  if (!loginLink.url) {
    throw new InternalServerHTTPError('Não foi possível gearr o link de login');
  }

  return loginLink.url;
}
