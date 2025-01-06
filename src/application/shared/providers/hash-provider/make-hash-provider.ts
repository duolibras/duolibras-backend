import { BcryptyHashProvider } from './bcrypt-hash-providers';
import { HashProvider } from './hash-provider';

export function makeHashProvider(salt: number = 10): HashProvider {
  return new BcryptyHashProvider(salt);
}
