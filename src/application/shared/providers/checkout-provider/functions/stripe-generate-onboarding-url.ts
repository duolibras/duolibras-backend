import { env } from '@/application/config/env';
import Stripe from 'stripe';
import { makeTokenProvider } from '../../token-provider/make-token-provider';

export async function stripeGenerateOnboardingUrl(
  stripe: Stripe, stripeAccountId: string, returnUrl: string, previousToken?: string
) {
  const tokenProvider = makeTokenProvider();

  const token = previousToken ?? tokenProvider.generateStripeToken({
    sub: stripeAccountId,
    expiresIn: '15m'
  });

  const encodedReturnUrl = encodeURIComponent(returnUrl);
  const refreshUrl =
      `${env.baseUrl}/payments-details/onboarding?returnUrl=${encodedReturnUrl}&token=${token}`;

  const { url } = await stripe.accountLinks.create({
    account: stripeAccountId,
    type: 'account_onboarding',
    return_url: returnUrl,
    refresh_url: refreshUrl,
  });

  return url;
}
