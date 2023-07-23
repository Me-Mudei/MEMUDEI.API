import {
  ChargeFakeBuilder,
  CondominiumDetailFakeBuilder,
  FloorPlanFakeBuilder,
  PropertyDetailFakeBuilder,
  PropertyFakeBuilder,
  PropertyStatus,
  RuleFakeBuilder
} from "#property/domain";
import { UniqueEntityId } from "#shared/domain";

import PropertyInMemoryRepository from "./property-in-memory.repository";

describe("PropertyInMemoryRepository", () => {
  let repository: PropertyInMemoryRepository;

  beforeEach(() => {
    repository = new PropertyInMemoryRepository();
  });

  it("filter is null", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = null;
    const items = [faker.build()];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = await repository["applyFilter"](items, filter);
    expect(itemsFiltered).toStrictEqual(items);
    expect(spyFilterMethod).not.toHaveBeenCalledTimes(1);
  });

  it("query filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = "test";
    const items = [
      faker.withTitle("test").withDescription("test").build(),
      faker.withTitle("fake").withDescription("test").build(),
      faker.withTitle("TEST").withDescription("fake").build(),
      faker.withTitle("fake").withDescription("fake").build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["query_filter"](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0], items[1], items[2]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("id filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const finderId = new UniqueEntityId();
    const filter = finderId.value;
    const items = [
      faker.withId(finderId).build(),
      faker.withId(new UniqueEntityId()).build(),
      faker.withId(new UniqueEntityId()).build(),
      faker.withId(new UniqueEntityId()).build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["id_filter"](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("status filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = PropertyStatus.PENDING;
    const items = [
      faker.withStatus(PropertyStatus.PENDING).build(),
      faker.withStatus(PropertyStatus.PUBLISHED).build(),
      faker.withStatus(PropertyStatus.PUBLISHED).build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["status_filter"](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("property_type filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const key = "test";
    const items = [
      faker.withPropertyTypeKey(key).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["property_type_filter"](items, key);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("privacy_type filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const key = "test";
    const items = [
      faker.withPrivacyTypeKey(key).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["privacy_type_filter"](items, key);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("property_details filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const key = "test";
    const propertyDetails = PropertyDetailFakeBuilder.thePropertyDetails(3)
      .withKey(key)
      .withAvailable(true)
      .build();
    const items = [
      faker.withPropertyDetails(propertyDetails).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["property_details_filter"](items, [key]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("condominium_details filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const key = "test";
    const condominiumDetails =
      CondominiumDetailFakeBuilder.theCondominiumDetails(3)
        .withKey(key)
        .withAvailable(true)
        .build();
    const items = [
      faker.withCondominiumDetails(condominiumDetails).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["condominium_details_filter"](items, [
      key
    ]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("rules filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const key = "test";
    const rules = RuleFakeBuilder.theRules(3)
      .withKey(key)
      .withAllowed(true)
      .build();
    const items = [
      faker.withRules(rules).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["rules_filter"](items, [key]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("value filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const min = 1000;
    const max = 1500;
    const charges = [
      ChargeFakeBuilder.aCharge().withKey("test").withAmount(1000).build(),
      ChargeFakeBuilder.aCharge().withKey("test").withAmount(300).build(),
      ChargeFakeBuilder.aCharge().withKey("test").withAmount(100).build()
    ];

    const items = [
      faker.withCharges(charges).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["value_filter"](items, min, max);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("footage filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const min = 30;
    const max = 50;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("footage")
      .withValue(40)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["footage_filter"](items, min, max);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("qtd_bedrooms filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const qtd = 2;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("bedrooms")
      .withValue(qtd)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["qtd_bedrooms_filter"](items, qtd);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("qtd_bathrooms filter", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const qtd = 2;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("bathrooms")
      .withValue(qtd)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = repository["qtd_bathrooms_filter"](items, qtd);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("all filters", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const propertyDetails = PropertyDetailFakeBuilder.aPropertyDetail()
      .withKey("cupboards")
      .withAvailable(true)
      .build();
    const condominiumDetails =
      CondominiumDetailFakeBuilder.theCondominiumDetails(3)
        .withKey("pool")
        .withAvailable(true)
        .build();
    const rules = RuleFakeBuilder.theRules(3)
      .withKey("smoking")
      .withAllowed(true)
      .build();
    const rent = ChargeFakeBuilder.aCharge()
      .withKey("rent")
      .withAmount(1000)
      .build();
    const taxes = ChargeFakeBuilder.aCharge()
      .withKey("condominium")
      .withAmount(300)
      .build();
    const iptu = ChargeFakeBuilder.aCharge()
      .withKey("iptu")
      .withAmount(100)
      .build();
    const footage = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("footage")
      .withValue(40)
      .build();
    const bathrooms = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("bathrooms")
      .withValue(2)
      .build();
    const bedrooms = FloorPlanFakeBuilder.aFloorPlan()
      .withKey("bedrooms")
      .withValue(2)
      .build();
    const privacyTypeKey = "entire_property";
    const propertyTypeKey = "apartment";
    const propertyRelationshipKey = "owner";
    const items = [
      faker
        .withCondominiumDetails(condominiumDetails)
        .withRules(rules)
        .withCharges([rent, taxes, iptu])
        .withFloorPlans([footage, bathrooms, bedrooms])
        .withPropertyDetails([propertyDetails])
        .withPrivacyTypeKey(privacyTypeKey)
        .withPropertyTypeKey(propertyTypeKey)
        .withPropertyRelationshipKey(propertyRelationshipKey)
        .withStatus(PropertyStatus.PUBLISHED)
        .withTitle("title")
        .build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build()
    ];

    const query = "title";
    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = await repository["applyFilter"](items, {
      query,
      value_type: "rent",
      min_value: 1000,
      max_value: 1200,
      min_footage: 30,
      max_footage: 50,
      qtd_bedrooms: 2,
      qtd_bathrooms: 2,
      status: PropertyStatus.PUBLISHED,
      privacy_type: privacyTypeKey,
      condominium_details: ["pool"],
      rules: ["smoking"],
      property_details: ["cupboards"],
      property_type: propertyTypeKey
    });
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(itemsFiltered).toHaveLength(1);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it("sort items by created_at when sort is null", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const created_at = new Date();
    const items = [
      faker.withCreatedAt(created_at).build(),
      faker.withCreatedAt(new Date(created_at.getTime() + 100)).build(),
      faker.withCreatedAt(new Date(created_at.getTime() + 200)).build()
    ];

    const itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("sort items by title", async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const items = [
      faker.withTitle("a").build(),
      faker.withTitle("b").build(),
      faker.withTitle("c").build()
    ];

    let itemsSorted = await repository["applySort"](items, "title", "asc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);

    itemsSorted = await repository["applySort"](items, "title", "desc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });
});
