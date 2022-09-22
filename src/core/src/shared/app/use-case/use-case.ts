export default interface UseCase<I = any, O = any> {
  execute(input?: I): Promise<O>;
}
