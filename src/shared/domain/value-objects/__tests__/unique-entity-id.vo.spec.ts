import { InvalidNanoidError } from "../../errors/invalid-nanoid.error";
import { UniqueEntityId } from "../unique-entity-id.vo";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }

describe("UniqueEntityId Unit Tests", () => {
  //   beforeEach(() => {
  //       jest.clearAllMocks();
  //   })

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  // beforeEach(() => validateSpy.mockClear());

  it("should throw error when nanoid is invalid", () => {
    //const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(
      new InvalidNanoidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a nanoid passed in constructor", () => {
    //const validateSpy = spyValidateMethod();
    const nanoid = "eftOYF0ie93F_yVhkOBcM";
    const vo = new UniqueEntityId(nanoid);
    expect(vo.value).toBe(nanoid);
    expect(validateSpy).toHaveBeenCalled();
  });
});
