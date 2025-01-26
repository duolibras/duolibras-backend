import { CheckoutProvider } from './checkout-provider';
import { makeStripe } from './make-stripe';
import { StripeCheckoutProvider } from './stripe-checkout-provider';

export function makeCheckoutProvider(): CheckoutProvider {
  const stripe = makeStripe();

  return new StripeCheckoutProvider(stripe);
}
