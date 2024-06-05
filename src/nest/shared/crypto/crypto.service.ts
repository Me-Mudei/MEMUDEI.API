export abstract class CryptoService {
  public abstract hash(value: string): Promise<string>;

  public abstract compare(value: string, hash: string): Promise<boolean>;
}
