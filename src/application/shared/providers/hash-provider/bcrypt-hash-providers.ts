import { compare, hash } from 'bcryptjs';
import { HashProvider } from './hash-provider';

export class BcryptyHashProvider implements HashProvider {
  constructor(
    private readonly salt: number,
  ) {}

  async encrypt(payload: string): Promise<string> {
    const generatedHash = await hash(payload, this.salt);

    return generatedHash;
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    const isValid = await compare(payload, hash);

    return isValid;
  }

}
