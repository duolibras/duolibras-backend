import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCourseRepository } from '@/application/modules/course/repositories/make-course-repository';
import Stripe from 'stripe';
import { accountUpdate } from './account-updated';
import { checkoutSessionUpdated } from './checkout-session';

export async function handleWebhook(event: Stripe.Event) {
  const accountRepo = makeAccountRepository();
  const courseRepo = makeCourseRepository();

  const eventData = event.data.object;

  const checkoutSessionFn = checkoutSessionUpdated(eventData as Stripe.Checkout.Session, courseRepo);

  const events: Partial<Record<Stripe.Event.Type, () => Promise<void>>> = {
    'account.updated': accountUpdate(eventData as Stripe.Account, accountRepo),
    'checkout.session.completed': checkoutSessionFn,
    'checkout.session.async_payment_succeeded': checkoutSessionFn,
    'checkout.session.expired': checkoutSessionFn,
    'checkout.session.async_payment_failed': checkoutSessionFn,
  };

  await events[event.type]?.();
}
