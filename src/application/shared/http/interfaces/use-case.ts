export interface IUseCase<IInput, IOutput> {
  execute(input: IInput): Promise<IOutput>;
}
