export interface HashProvider {
  encrypt(payload: string): Promise<string>;
  compare(payload: string, hash: string): Promise<boolean>;
}

