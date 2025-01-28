import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import Stripe from 'stripe';

export async function stripeUnarchiveCourse(stripe: Stripe, stripeCourseId: string, stripeAccountId: string) {
  try {
    await stripe.products.update(stripeCourseId, {
      active: true
    }, {
      stripeAccount: stripeAccountId
    });
  } catch (error: any) {
    if (error.code === 'resource_missing') {
      throw new NotFoundHTTPError('Produto não encontrado no Stripe!');
    }
    throw new InternalServerHTTPError('Erro ao ativar o produto no Stripe.');
  }
}
