import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import Stripe from 'stripe';
import { CheckoutUrlOptions, ICalculateRevenueSplit, ICheckoutCourseUrlResponse } from '../types';

export async function stripeGenerateCheckoutCourseUrl(
  stripe: Stripe,
  stripeAccountId: string,
  stripeCourseId: string,
  { cancelUrl, successUrl }: CheckoutUrlOptions,
  revenueSplit: ICalculateRevenueSplit,
): Promise<ICheckoutCourseUrlResponse> {
  const stripeCourse = await stripe.products.retrieve(stripeCourseId, {}, {
    stripeAccount: stripeAccountId,
  });

  if (!stripeCourse) {
    throw new NotFoundHTTPError('Esse curso não foi encontrado dentro do Stripe!');
  }

  if (!stripeCourse.default_price) {
    throw new NotFoundHTTPError('Esse curso não tem um preço cadastrado no Stripe!');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: stripeCourse.default_price.toString(),
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
