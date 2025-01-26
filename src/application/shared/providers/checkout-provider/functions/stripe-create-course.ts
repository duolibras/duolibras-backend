import { Course } from '@/application/modules/course/entities/course';
import Stripe from 'stripe';
import { ICreateCourseResponse } from '../types';

export async function stripeCreateCourse(stripe: Stripe, stripeAccountId: string, course: Course): Promise<ICreateCourseResponse> {
  const product = await stripe.products.create({
    name: course.name,
    description: course.description,
    default_price_data: {
      currency: 'BRL',
      unit_amount: course.priceInCents,
    }
  }, {
    stripeAccount: stripeAccountId
  });

  return {
    stripeCourseId: product.id
  };
}
