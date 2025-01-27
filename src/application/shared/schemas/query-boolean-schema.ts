import { z } from 'zod';

export const queryBooleanSchema = z.string().optional().transform(value => {
  if (value === undefined) return undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error('Owned must be a boolean (true or false)');
});
