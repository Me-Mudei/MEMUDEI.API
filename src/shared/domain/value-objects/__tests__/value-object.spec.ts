import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {}

//mock/spy - instancia fake
//stub
describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    const arrange = [
      { received: "", expected: "" },
      { received: null, expected: "null" },
      { received: undefined, expected: "test,test2" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: ["test", "test2"], expected: "test,test2" },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" })
      },
      { received: () => "function", expected: "()=>'function'" },
      {
        received: function () {
          return "function";
        },
        expected:
          "function() {\n                    return 'function';\n                }"
      }
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo.toString()).toBe(value.expected);
    });
  });
});
