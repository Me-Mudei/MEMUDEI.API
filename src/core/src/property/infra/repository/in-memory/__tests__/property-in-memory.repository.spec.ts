import {
  ChargeFakeBuilder,
  CondominiumDetailFakeBuilder,
  FloorPlanFakeBuilder,
  PrivacyTypeFakeBuilder,
  PropertyDetailFakeBuilder,
  PropertyFakeBuilder,
  PropertyRelationshipFakeBuilder,
  PropertyStatus,
  PropertyTypeFakeBuilder,
  RuleFakeBuilder,
} from '#property/domain';
import { UniqueEntityId } from '#shared/domain';
import PropertyInMemoryRepository from '../property-in-memory.repository';

describe('PropertyInMemoryRepository', () => {
  let repository: PropertyInMemoryRepository;

  beforeEach(() => {
    repository = new PropertyInMemoryRepository();
  });

  it('should no filter items when filter param is null', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = null;
    const items = [faker.build()];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = await repository['applyFilter'](items, filter);
    expect(itemsFiltered).toStrictEqual(items);
    expect(spyFilterMethod).not.toHaveBeenCalledTimes(1);
  });

  it('should filter items using query filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'test';
    const items = [
      faker.withTitle('test').withDescription('test').build(),
      faker.withTitle('fake').withDescription('test').build(),
      faker.withTitle('TEST').withDescription('fake').build(),
      faker.withTitle('fake').withDescription('fake').build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['query_filter'](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0], items[1], items[2]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using id filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const finderId = new UniqueEntityId();
    const filter = finderId.value;
    const items = [
      faker.withId(finderId).build(),
      faker.withId(new UniqueEntityId()).build(),
      faker.withId(new UniqueEntityId()).build(),
      faker.withId(new UniqueEntityId()).build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['id_filter'](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using status filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = PropertyStatus.PENDING;
    const items = [
      faker.withStatus(PropertyStatus.PENDING).build(),
      faker.withStatus(PropertyStatus.COMPLETE).build(),
      faker.withStatus(PropertyStatus.COMPLETE).build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['status_filter'](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using property_type filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'apartamento';
    const propertyTypeFake = PropertyTypeFakeBuilder.aPropertyType()
      .withName(filter)
      .build();
    const items = [
      faker.withPropertyType(propertyTypeFake).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['property_type_filter'](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using privacy_type filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'individual';
    const privacyTypeFake = PrivacyTypeFakeBuilder.aPrivacyType()
      .withName(filter)
      .build();
    const items = [
      faker.withPrivacyType(privacyTypeFake).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['privacy_type_filter'](items, filter);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using property_details filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'test';
    const propertyDetails = PropertyDetailFakeBuilder.thePropertyDetails(3)
      .withName(filter)
      .withAvailable(true)
      .build();
    const items = [
      faker.withPropertyDetails(propertyDetails).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['property_details_filter'](items, [
      filter,
    ]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using condominium_details filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'test';
    const condominiumDetails =
      CondominiumDetailFakeBuilder.theCondominiumDetails(3)
        .withName(filter)
        .withAvailable(true)
        .build();
    const items = [
      faker.withCondominiumDetails(condominiumDetails).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['condominium_details_filter'](items, [
      filter,
    ]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using rules filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'test';
    const rules = RuleFakeBuilder.theRules(3)
      .withName('test')
      .withAllowed(true)
      .build();
    const items = [
      faker.withRules(rules).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['rules_filter'](items, [filter]);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using value filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const min = 1000;
    const max = 1500;
    const charges = [
      ChargeFakeBuilder.aCharge().withName('rent').withAmount(1000).build(),
      ChargeFakeBuilder.aCharge().withName('taxes').withAmount(300).build(),
      ChargeFakeBuilder.aCharge().withName('iptu').withAmount(100).build(),
    ];

    const items = [
      faker.withCharges(charges).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['value_filter'](items, min, max);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using area filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const min = 30;
    const max = 50;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withName('area')
      .withQuantity(40)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['area_filter'](items, min, max);
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using qtd_bedrooms filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const qtd = 2;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withName('bedroom')
      .withQuantity(qtd)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['qtd_bedrooms_filter'](items, qtd);
    expect(itemsFiltered).toStrictEqual([]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using qtd_bathrooms filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const qtd = 2;
    const floorPlan = FloorPlanFakeBuilder.aFloorPlan()
      .withName('bathroom')
      .withQuantity(qtd)
      .build();
    const items = [
      faker.withFloorPlans([floorPlan]).build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = repository['qtd_bathrooms_filter'](items, qtd);
    expect(itemsFiltered).toStrictEqual([]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should filter items using all filter param', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const filter = 'test';
    const privacyType = PrivacyTypeFakeBuilder.aPrivacyType()
      .withName(filter)
      .build();
    const propertyType = PropertyTypeFakeBuilder.aPropertyType()
      .withName(filter)
      .build();
    const propertyDetails = PropertyDetailFakeBuilder.aPropertyDetail()
      .withName(filter)
      .withAvailable(true)
      .build();
    const propertyRelationships =
      PropertyRelationshipFakeBuilder.aPropertyRelationship()
        .withName(filter)
        .build();
    const condominiumDetails =
      CondominiumDetailFakeBuilder.theCondominiumDetails(3)
        .withName(filter)
        .withAvailable(true)
        .build();
    const rules = RuleFakeBuilder.theRules(3)
      .withName(filter)
      .withAllowed(true)
      .build();
    const rent = ChargeFakeBuilder.aCharge()
      .withName('rent')
      .withAmount(1000)
      .build();
    const taxes = ChargeFakeBuilder.aCharge()
      .withName('taxes')
      .withAmount(300)
      .build();
    const iptu = ChargeFakeBuilder.aCharge()
      .withName('iptu')
      .withAmount(100)
      .build();
    const area = FloorPlanFakeBuilder.aFloorPlan()
      .withName('area')
      .withQuantity(40)
      .build();
    const bathrooms = FloorPlanFakeBuilder.aFloorPlan()
      .withName('bathrooms')
      .withQuantity(2)
      .build();
    const bedrooms = FloorPlanFakeBuilder.aFloorPlan()
      .withName('bedrooms')
      .withQuantity(2)
      .build();
    const items = [
      faker
        .withCondominiumDetails(condominiumDetails)
        .withRules(rules)
        .withCharges([rent, taxes, iptu])
        .withFloorPlans([area, bathrooms, bedrooms])
        .withPropertyDetails([propertyDetails])
        .withPrivacyType(privacyType)
        .withPropertyType(propertyType)
        .withPropertyRelationship(propertyRelationships)
        .withStatus(PropertyStatus.COMPLETE)
        .withTitle(filter)
        .build(),
      PropertyFakeBuilder.aProperty().build(),
      PropertyFakeBuilder.aProperty().build(),
    ];

    const spyFilterMethod = jest.spyOn(items, 'filter');
    const itemsFiltered = await repository['applyFilter'](items, {
      query: filter,
      value_type: 'rent',
      min_value: 1000,
      max_value: 1200,
      min_area: 30,
      max_area: 50,
      qtd_bedrooms: 2,
      qtd_bathrooms: 2,
      status: PropertyStatus.COMPLETE,
      privacy_type: filter,
      condominium_details: [filter],
      rules: [filter],
      property_details: [filter],
      property_type: filter,
    });
    expect(itemsFiltered).toStrictEqual([items[0]]);
    expect(spyFilterMethod).toHaveBeenCalledTimes(1);
  });

  it('should sort items by created_at when sort param is null', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const created_at = new Date();
    const items = [
      faker.withCreatedAt(created_at).build(),
      faker.withCreatedAt(new Date(created_at.getTime() + 100)).build(),
      faker.withCreatedAt(new Date(created_at.getTime() + 200)).build(),
    ];

    const itemsSorted = await repository['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort items by title', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const items = [
      faker.withTitle('a').build(),
      faker.withTitle('b').build(),
      faker.withTitle('c').build(),
    ];

    let itemsSorted = await repository['applySort'](items, 'title', 'asc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);

    itemsSorted = await repository['applySort'](items, 'title', 'desc');
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });
});
