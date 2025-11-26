export abstract class AbstractHandler {
  private nextHandler: AbstractHandler | null;

  constructor() {
    this.nextHandler = null;
  }

  setNext(handler: AbstractHandler): AbstractHandler {
    this.nextHandler = handler;
    return handler;
  }

  abstract execute(solicitacao_id: number): any;

  protected passToNext(solicitacao_id: number): any {
    if (this.nextHandler) {
      return this.nextHandler.execute(solicitacao_id);
    }
    return null;
  }
}
