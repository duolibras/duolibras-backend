import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import Stripe from 'stripe';
import { makeStripe } from '../make-stripe';
import { CheckoutUrlOptions, ICalculateRevenueSplit, ICheckoutCourseUrlResponse } from '../types';

export async function stripeGenerateCheckoutCourseUrl(
  stripe: Stripe,
  stripeAccountId: string,
  stripeCourseId: string,
  { cancelUrl, successUrl }: CheckoutUrlOptions,
  revenueSplit: ICalculateRevenueSplit,
): Promise<ICheckoutCourseUrlResponse> {
  const connectedStripe = makeStripe(stripeAccountId);

  const stripeCourse = await connectedStripe.products.retrieve(stripeCourseId);

  if (!stripeCourse) {
    throw new NotFoundHTTPError('Esse curso não foi encontrado dentro do Stripe!');
  }

  const prices = await connectedStripe.prices.list({ product: stripeCourse.id, limit: 1 }, {
    stripeAccount: stripeAccountId,
  });

  const price = prices.data?.[0];

  if (!price) {
    throw new NotFoundHTTPError('Esse curso não tem um preço cadastrado no Stripe!');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_intent_data: {
      application_fee_amount: revenueSplit.platformFee,
    }
  }, {
    stripeAccount: stripeAccountId
  });

  if (!session || !session.url) {
    throw new InternalServerHTTPError('Algo deu errado a gerar o link de pagamento!');
  }

  return {
    checkoutSessionId: session.id,
    url: session.url,
  };
}
