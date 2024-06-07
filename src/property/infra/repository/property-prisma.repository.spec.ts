import {
  ChargeFakeBuilder,
  CondominiumDetailFakeBuilder,
  FloorPlanFakeBuilder,
  PropertyDetailFakeBuilder,
  PropertyFakeBuilder,
  RuleFakeBuilder,
  PropertyStatus,
  PropertySearchParams,
  Charge,
  FloorPlan,
  CondominiumDetail,
  PropertyDetail,
  Rule,
} from "#property/domain";
import { UniqueEntityId } from "#shared/domain";
import { PrismaClient, Connection } from "#shared/infra";

import { PropertyPrismaRepository } from "./property-prisma.repository";

describe("PropertyPrismaRepository", () => {
  let repository: PropertyPrismaRepository;
  let prisma: PrismaClient;
  const faker = PropertyFakeBuilder.aProperty();
  const cupboards = PropertyDetailFakeBuilder.aPropertyDetail()
    .withKey("cupboards")
    .withAvailable(true);

  const balcony = PropertyDetailFakeBuilder.aPropertyDetail()
    .withKey("balcony")
    .withAvailable(false);

  const elevator = CondominiumDetailFakeBuilder.aCondominiumDetail()
    .withKey("elevator")
    .withAvailable(true);

  const pool = CondominiumDetailFakeBuilder.aCondominiumDetail()
    .withKey("pool")
    .withAvailable(false);

  const smoking = RuleFakeBuilder.aRule().withKey("smoking").withAllowed(true);
  const guest = RuleFakeBuilder.aRule().withKey("guest").withAllowed(false);

  const rent = ChargeFakeBuilder.aCharge().withKey("rent").withAmount(1000);

  const taxes = ChargeFakeBuilder.aCharge()
    .withKey("condominium")
    .withAmount(300);

  const iptu = ChargeFakeBuilder.aCharge().withKey("iptu").withAmount(100);

  const footage = FloorPlanFakeBuilder.aFloorPlan()
    .withKey("footage")
    .withValue(40);

  const bathrooms = FloorPlanFakeBuilder.aFloorPlan()
    .withKey("bathrooms")
    .withValue(2);

  const bedrooms = FloorPlanFakeBuilder.aFloorPlan()
    .withKey("bedrooms")
    .withValue(2);

  const privacyTypeKey = "entire_property";
  const propertyTypeKey = "apartment";
  const propertyRelationshipKey = "owner";
  const properties = [
    faker
      .withCondominiumDetails([elevator.build(), pool.build()])
      .withPropertyDetails([cupboards.build(), balcony.build()])
      .withRules([smoking.build(), guest.build()])
      .withCharges([rent.build(), taxes.build(), iptu.build()])
      .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
      .withPrivacyTypeKey(privacyTypeKey)
      .withPropertyTypeKey(propertyTypeKey)
      .withPropertyRelationshipKey(propertyRelationshipKey)
      .withStatus(PropertyStatus.PUBLISHED)
      .withTitle("title")
      .withUserId(new UniqueEntityId("Gi8ZH-IvC7YVQM-7PU_GO"))
      .build(),
  ];

  beforeEach(() => {
    prisma = Connection.getInstance();
    repository = PropertyPrismaRepository.getInstance(prisma);
  });

  it("insert a property", async () => {
    await repository.insert(properties[0]);
    const property = await prisma.property.findFirst({
      where: { id: properties[0].id },
    });

    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);
    expect(property?.user_id).toBe(properties[0].user_id.value);
    expect(property?.property_type_id).toBeDefined();
    expect(property?.privacy_type_id).toBeDefined();
    expect(property?.property_relationship_id).toBeDefined();
  });

  it("find by id a property", async () => {
    await repository.insert(properties[0]);
    const property = await repository.findById(properties[0].id);
    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);
    expect(property?.user_id.value).toBe(properties[0].user_id.value);
    expect(property?.address.id).toBe(properties[0].address.id);
    expect(property?.property_type).toBe(properties[0].property_type);
    expect(property?.privacy_type).toBe(properties[0].privacy_type);
    expect(property?.property_relationship).toBe(
      properties[0].property_relationship,
    );
    expect(
      property?.property_details.map((detail) => ({
        key: detail.key,
        name: detail.name,
      })),
    ).toMatchObject(
      properties[0].property_details.map((detail) => ({
        key: detail.key,
        name: expect.any(String),
      })),
    );
    expect(
      property?.condominium_details.map((detail) => ({
        key: detail.key,
        name: detail.name,
      })),
    ).toMatchObject(
      properties[0].condominium_details.map((detail) => ({
        key: detail.key,
        name: expect.any(String),
      })),
    );
    expect(
      property?.rules.map((rule) => ({
        key: rule.key,
        name: rule.name,
      })),
    ).toMatchObject(
      properties[0].rules.map((rule) => ({
        key: rule.key,
        name: expect.any(String),
      })),
    );
    expect(
      property?.charges.map((charge) => ({
        key: charge.key,
        name: charge.name,
      })),
    ).toMatchObject(
      properties[0].charges.map((charge) => ({
        key: charge.key,
        name: expect.any(String),
      })),
    );
    expect(
      property?.floor_plans.map((floorPlan) => ({
        key: floorPlan.key,
        name: floorPlan.name,
      })),
    ).toMatchObject(
      properties[0].floor_plans.map((floorPlan) => ({
        key: floorPlan.key,
        name: expect.any(String),
      })),
    );
  });

  it("find all a property", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.findAll();
    expect(items).not.toHaveLength(0);
  });

  it("update a property", async () => {
    await repository.insert(properties[0]);
    const property = await repository.findById(properties[0].id);
    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);

    const newProperty = {
      id: property.id,
      title: "new title",
      description: "new description",
      status: PropertyStatus.IN_PROGRESS,
      charge: {
        update: [{ key: property.charges[0].key, amount: 2000 }],
        insert: [new Charge({ key: "others", amount: 1000 })],
        remove: [property.charges[1].key],
      },
      floor_plan: {
        update: [{ key: property.floor_plans[0].key, value: 40 }],
        insert: [new FloorPlan({ key: "suites", value: 4 })],
        remove: [property.floor_plans[1].key],
      },
      condominium_detail: {
        update: [{ key: property.condominium_details[0].key, available: true }],
        insert: [new CondominiumDetail({ key: "ramps", available: true })],
        remove: [property.condominium_details[1].key],
      },
      property_detail: {
        update: [{ key: property.property_details[0].key, available: true }],
        insert: [new PropertyDetail({ key: "gas", available: true })],
        remove: [property.property_details[1].key],
      },
      rule: {
        update: [{ key: property.rules[0].key, allowed: true }],
        insert: [new Rule({ key: "pets", allowed: true })],
        remove: [property.rules[1].key],
      },
    };
    await repository.update(newProperty);
    const updatedProperty = await repository.findById(newProperty.id);
    expect(updatedProperty).toBeTruthy();
    expect(updatedProperty?.id).toBe(newProperty.id);
    expect(updatedProperty?.title).toBe(newProperty.title);
    expect(updatedProperty?.description).toBe(newProperty.description);
    expect(updatedProperty?.status).toBe(newProperty.status);
    expect(updatedProperty?.charges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.charge.update[0].key,
          amount: newProperty.charge.update[0].amount,
        }),
        expect.objectContaining({
          key: newProperty.charge.insert[0].key,
          amount: newProperty.charge.insert[0].amount,
        }),
      ]),
    );
    expect(updatedProperty?.charges).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.charge.remove[0],
        }),
      ]),
    );
    expect(updatedProperty?.floor_plans).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.floor_plan.update[0].key,
          value: newProperty.floor_plan.update[0].value,
        }),
        expect.objectContaining({
          key: newProperty.floor_plan.insert[0].key,
          value: newProperty.floor_plan.insert[0].value,
        }),
      ]),
    );
    expect(updatedProperty?.floor_plans).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.floor_plan.remove[0],
        }),
      ]),
    );
    expect(updatedProperty?.condominium_details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.condominium_detail.update[0].key,
          available: newProperty.condominium_detail.update[0].available,
        }),
        expect.objectContaining({
          key: newProperty.condominium_detail.insert[0].key,
          available: newProperty.condominium_detail.insert[0].available,
        }),
      ]),
    );
    expect(updatedProperty?.condominium_details).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.condominium_detail.remove[0],
        }),
      ]),
    );
    expect(updatedProperty?.property_details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.property_detail.update[0].key,
          available: newProperty.property_detail.update[0].available,
        }),
        expect.objectContaining({
          key: newProperty.property_detail.insert[0].key,
          available: newProperty.property_detail.insert[0].available,
        }),
      ]),
    );
    expect(updatedProperty?.property_details).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.property_detail.remove[0],
        }),
      ]),
    );
    expect(updatedProperty?.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.rule.update[0].key,
          allowed: newProperty.rule.update[0].allowed,
        }),
        expect.objectContaining({
          key: newProperty.rule.insert[0].key,
          allowed: newProperty.rule.insert[0].allowed,
        }),
      ]),
    );
    expect(updatedProperty?.rules).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: newProperty.rule.remove[0],
        }),
      ]),
    );
  });

  it("filter is null", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(new PropertySearchParams({}));
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: null,
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("query filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({ filter: { query: "title" } }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { query: "title" },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("id filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({ filter: { id: properties[0].id } }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { id: properties[0].id },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("status filter", async () => {
    await repository.insert(properties[0]);
    const items = await repository.search(
      new PropertySearchParams({
        filter: { status: PropertyStatus.PUBLISHED },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { status: PropertyStatus.PUBLISHED },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("property_type filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { property_type: properties[0].property_type },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { property_type: properties[0].property_type },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("privacy_type filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { privacy_type: properties[0].privacy_type },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { privacy_type: properties[0].privacy_type },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("property_details filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { property_details: [cupboards.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { property_details: [cupboards.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("condominium_details filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { condominium_details: [elevator.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { condominium_details: [elevator.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("rules filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { rules: [smoking.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { rules: [smoking.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("value filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { min_value: 1000, max_value: 1500, value_type: "all" },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { min_value: 1000, max_value: 1500, value_type: "all" },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("footage filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { min_footage: 30, max_footage: 50 },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { min_footage: 30, max_footage: 50 },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("qtd_bedrooms filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { qtd_bedrooms: 2 },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { qtd_bedrooms: 2 },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it("qtd_bathrooms filter", async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { qtd_bathrooms: 2 },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: { qtd_bathrooms: 2 },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  /*it('all filters', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const filters = {
      query: 'title',
      value_type: 'rent',
      min_value: 1000,
      max_value: 1200,
      min_footage: 30,
      max_footage: 50,
      qtd_bedrooms: 2,
      qtd_bathrooms: 2,
      status: PropertyStatus.PUBLISHED,
      privacy_type: privacyTypeKey,
      condominium_details: ['pool'],
      rules: ['smoking'],
      property_details: ['cupboards'],
      property_type: propertyTypeKey,
    };
    const items = await repository.search(
      new PropertySearchParams({
        filter: filters,
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: filters,
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });*/
  it("sort items by created_at when sort is null", async () => {
    const items = [
      properties[0],
      PropertyFakeBuilder.aProperty()
        .withCondominiumDetails([elevator.build()])
        .withRules([smoking.build()])
        .withCharges([rent.build(), taxes.build(), iptu.build()])
        .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
        .withPropertyDetails([cupboards.build()])
        .withPrivacyTypeKey(privacyTypeKey)
        .withPropertyTypeKey(propertyTypeKey)
        .withPropertyRelationshipKey(propertyRelationshipKey)
        .withStatus(PropertyStatus.PUBLISHED)
        .withTitle("title")
        .withCreatedAt(new Date("2020-01-01"))
        .withUserId(new UniqueEntityId("Gi8ZH-IvC7YVQM-7PU_GO"))
        .build(),
    ];
    await Promise.all(items.map((property) => repository.insert(property)));
    const data = await repository.search(
      new PropertySearchParams({
        sort: null,
      }),
    );
    expect(data).toMatchObject({
      total: 2,
      current_page: 1,
      per_page: 15,
      sort: "created_at",
      sort_dir: "asc",
      filter: {},
    });
    expect(data.items).toHaveLength(2);
    expect(data.items[0].id).toBe(items[1].id);
    expect(data.items[1].id).toBe(items[0].id);
  });
  it("sort items by title", async () => {
    const items = [
      PropertyFakeBuilder.aProperty()
        .withCondominiumDetails([elevator.build()])
        .withRules([smoking.build()])
        .withCharges([rent.build(), taxes.build(), iptu.build()])
        .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
        .withPropertyDetails([cupboards.build()])
        .withPrivacyTypeKey(privacyTypeKey)
        .withPropertyTypeKey(propertyTypeKey)
        .withPropertyRelationshipKey(propertyRelationshipKey)
        .withStatus(PropertyStatus.PUBLISHED)
        .withTitle("a")
        .withUserId(new UniqueEntityId("Gi8ZH-IvC7YVQM-7PU_GO"))
        .build(),
      properties[0],
    ];
    await Promise.all(items.map((property) => repository.insert(property)));
    const data = await repository.search(
      new PropertySearchParams({
        sort: "title",
      }),
    );
    expect(data).toMatchObject({
      total: 2,
      current_page: 1,
      per_page: 15,
      sort: "title",
      sort_dir: "asc",
      filter: {},
    });
    expect(data.items).toHaveLength(2);
    expect(data.items[0].id).toBe(items[1].id);
    expect(data.items[1].id).toBe(items[0].id);
  });

  it("clean all", async () => {
    expect(1).toBe(1);
  });
});
