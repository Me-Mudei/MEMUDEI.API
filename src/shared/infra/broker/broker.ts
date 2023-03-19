export interface DomainEvent {
  name: string;
}

export interface Handler {
  name: string;
  handle(event: DomainEvent): Promise<void>;
}

export class Broker {
  handlers: Handler[];

  constructor() {
    this.handlers = [];
  }

  register(handler: Handler) {
    this.handlers.push(handler);
  }

  async publish(event: DomainEvent) {
    for (const handler of this.handlers) {
      if (handler.name === event.name) {
        await handler.handle(event);
      }
    }
  }
}
