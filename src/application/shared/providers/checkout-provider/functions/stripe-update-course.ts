import { Course } from '@/application/modules/course/entities/course';
import { BadRequestHttpError } from '@/application/shared/http/errors/bad-request-http-error';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import Stripe from 'stripe';

export async function stripeUpdateCourse(stripe: Stripe, course: Course, stripeAccountId: string) {
  if (!course.stripeCourseId) {
    throw new BadRequestHttpError('Esse curso não tem produto cadastrado no stripe');
  }

  const product = await stripe.products.retrieve(course.stripeCourseId, {}, {
    stripeAccount: stripeAccountId
  });

  if (!product.default_price) {
    throw new InternalServerHTTPError('Preço do produto não existe');
  }

  const price = await stripe.prices.retrieve(product.default_price.toString(), {}, {
    stripeAccount: stripeAccountId
  });

  let newPrice = price;

  if (price.unit_amount !== course.priceInCents) {
    await stripe.prices.update(product.default_price.toString(), {
      active: false
    }, {
      stripeAccount: stripeAccountId,
    });

    newPrice = await stripe.prices.create({
      currency: 'BRL',
      unit_amount: course.priceInCents,
    }, {
      stripeAccount: stripeAccountId
    });
  }


  await stripe.products.update(course.stripeCourseId, {
    name: course.name,
    description: course.description,
    default_price: newPrice.id
  }, {
    stripeAccount: stripeAccountId
  });
}
