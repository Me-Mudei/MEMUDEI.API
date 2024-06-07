import { UniqueEntityId } from "../value-objects";

import Entity from "./entity";

class StubEntity extends Entity<{
  prop1: string;
  prop2: number;
  id?: UniqueEntityId;
  created_at?: Date;
  updated_at?: Date;
}> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);
  });

  it("should accept a valid uuid", () => {
    const arrange = {
      prop1: "prop1 value",
      prop2: 10,
      id: new UniqueEntityId(),
    };
    const entity = new StubEntity(arrange);
    expect(entity.props.id).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(arrange.id.value);
  });

  it("should convert an entity to a JavaScript Object", () => {
    const arrange = {
      prop1: "prop1 value",
      prop2: 10,
      id: new UniqueEntityId(),
    };
    const entity = new StubEntity(arrange);
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      prop1: arrange.prop1,
      prop2: arrange.prop2,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  });
});
