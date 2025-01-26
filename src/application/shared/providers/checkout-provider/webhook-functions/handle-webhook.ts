import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import Stripe from 'stripe';
import { accountUpdate } from './account-updated';

export async function handleWebhook(event: Stripe.Event) {
  const accountRepo = makeAccountRepository();

  const events: Partial<Record<Stripe.Event.Type, () => Promise<void>>> = {
    'account.updated': accountUpdate(event.data.object as Stripe.Account, accountRepo)
  };

  events[event.type]?.();
}
