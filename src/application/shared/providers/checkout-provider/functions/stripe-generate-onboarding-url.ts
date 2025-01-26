import { env } from '@/application/config/env';
import Stripe from 'stripe';

export async function stripeGenerateOnboardingUrl(stripe: Stripe, stripeAccountId: string, returnUrl: string) {
  const encodedReturnUrl = encodeURIComponent(returnUrl);
  const refreshUrl =
      `${env.baseUrl}/payments-details/onboarding?returnUrl=${encodedReturnUrl}&stripeAccountId=${stripeAccountId}`;

  const { url } = await stripe.accountLinks.create({
    account: stripeAccountId,
    type: 'account_onboarding',
    return_url: returnUrl,
    refresh_url: refreshUrl,
  });

  return url;
}
