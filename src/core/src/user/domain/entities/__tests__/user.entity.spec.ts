import UniqueEntityId from "../../../../shared/domain/value-objects/unique-entity-id.vo";
import User from "../user.entity";

describe("User Unit Tests", () => {
  test("constructor of user", () => {
    let user = new User({
      name: "Jhon Doe",
      email: "jhon.doe@test.com",
      role_name: "TEST",
    });
    expect(user.props).toStrictEqual({
      name: "Jhon Doe",
      email: "jhon.doe@test.com",
      role_name: "TEST",
    });
    expect(user.id).toBeDefined();
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);

    let id = new UniqueEntityId();
    let created_at = new Date();
    let updated_at = new Date();
    user = new User({
      name: "Jhon Doe",
      email: "jhon.doe@test.com",
      role_name: "TEST",
      id,
      created_at,
      updated_at,
    });
    expect(user.props).toStrictEqual({
      name: "Jhon Doe",
      email: "jhon.doe@test.com",
      role_name: "TEST",
      id,
      created_at,
      updated_at,
    });

    expect(user.id).toBe(id.value);
    expect(user.created_at).toBe(created_at);
    expect(user.updated_at).toBe(updated_at);
  });
});
