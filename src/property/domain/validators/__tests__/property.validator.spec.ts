import PropertyValidatorFactory, {
  PropertyValidator
} from "../property.validator";
describe("PropertyValidator Tests", () => {
  let validator: PropertyValidator;

  beforeEach(() => (validator = PropertyValidatorFactory.create()));

  test("invalidation cases for title field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      title: [
        "title should not be empty",
        "title must be a string",
        "title must be shorter than or equal to 50 characters"
      ]
    });

    expect({ validator, data: { title: null } }).containsErrorMessages({
      title: [
        "title should not be empty",
        "title must be a string",
        "title must be shorter than or equal to 50 characters"
      ]
    });

    expect({ validator, data: { title: "" } }).containsErrorMessages({
      title: ["title should not be empty"]
    });

    expect({ validator, data: { title: 5 as any } }).containsErrorMessages({
      title: [
        "title must be a string",
        "title must be shorter than or equal to 50 characters"
      ]
    });

    expect({
      validator,
      data: { title: "t".repeat(51) }
    }).containsErrorMessages({
      title: ["title must be shorter than or equal to 50 characters"]
    });
  });

  test("invalidation cases for description field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      description: [
        "description should not be empty",
        "description must be a string",
        "description must be shorter than or equal to 500 characters"
      ]
    });

    expect({ validator, data: { description: null } }).containsErrorMessages({
      description: [
        "description should not be empty",
        "description must be a string",
        "description must be shorter than or equal to 500 characters"
      ]
    });

    expect({ validator, data: { description: "" } }).containsErrorMessages({
      description: ["description should not be empty"]
    });

    expect({
      validator,
      data: { description: 5 as any }
    }).containsErrorMessages({
      description: [
        "description must be a string",
        "description must be shorter than or equal to 500 characters"
      ]
    });

    expect({
      validator,
      data: { description: "t".repeat(501) }
    }).containsErrorMessages({
      description: [
        "description must be shorter than or equal to 500 characters"
      ]
    });
  });

  /* test('valid cases for fields', () => {
    const arrange = [
      {
        title: 'some value',
        description: 'same description',
        address: Address;
        property_type: PropertyType;
        property_relationship: PropertyRelationship;
        privacy_type: PrivacyType;
        floor_plans: FloorPlan[];
        property_details: PropertyDetail[];
        condominium_details: CondominiumDetail[];
        rules: Rule[];
        charges: Charge[];
      },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new PropertyRules(item));
    });
  }); */
});
