import {
  ChargeFakeBuilder,
  CondominiumDetailFakeBuilder,
  FloorPlanFakeBuilder,
  PropertyDetailFakeBuilder,
  PropertyFakeBuilder,
  RuleFakeBuilder,
  PropertyStatus,
  PropertySearchParams,
} from '#auth/domain';
import { UniqueEntityId } from '#shared/domain';
import { PrismaClient, Connection } from '#shared/infra';
import { PropertyPrismaRepository } from './property-prisma.repository';

describe('PropertyPrismaRepository', () => {
  let repository: PropertyPrismaRepository;
  let prisma: PrismaClient;
  const faker = PropertyFakeBuilder.aProperty();
  const propertyDetails = PropertyDetailFakeBuilder.aPropertyDetail()
    .withKey('cupboards')
    .withAvailable(true);

  const condominiumDetails = CondominiumDetailFakeBuilder.aCondominiumDetail()
    .withKey('elevator')
    .withAvailable(true);

  const rules = RuleFakeBuilder.aRule().withKey('smoking').withAllowed(true);

  const rent = ChargeFakeBuilder.aCharge().withKey('rent').withAmount(1000);

  const taxes = ChargeFakeBuilder.aCharge()
    .withKey('condominium')
    .withAmount(300);

  const iptu = ChargeFakeBuilder.aCharge().withKey('iptu').withAmount(100);

  const footage = FloorPlanFakeBuilder.aFloorPlan()
    .withKey('footage')
    .withValue(40);

  const bathrooms = FloorPlanFakeBuilder.aFloorPlan()
    .withKey('bathrooms')
    .withValue(2);

  const bedrooms = FloorPlanFakeBuilder.aFloorPlan()
    .withKey('bedrooms')
    .withValue(2);

  const privacyTypeKey = 'entire_property';
  const propertyTypeKey = 'apartment';
  const propertyRelationshipKey = 'owner';
  const properties = [
    faker
      .withCondominiumDetails([condominiumDetails.build()])
      .withRules([rules.build()])
      .withCharges([rent.build(), taxes.build(), iptu.build()])
      .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
      .withPropertyDetails([propertyDetails.build()])
      .withPrivacyTypeKey(privacyTypeKey)
      .withPropertyTypeKey(propertyTypeKey)
      .withPropertyRelationshipKey(propertyRelationshipKey)
      .withStatus(PropertyStatus.COMPLETE)
      .withTitle('title')
      .withUserId(new UniqueEntityId('MgxO159FtDCCYQYULEhBy'))
      .build(),
  ];

  beforeEach(() => {
    prisma = Connection.getInstance();
    repository = PropertyPrismaRepository.getInstance(prisma);
  });

  afterEach(async () => {
    const deleteCharges = prisma.properties_charges.deleteMany();
    const deleteCondominiumDetails =
      prisma.properties_condominium_details.deleteMany();
    const deleteFloorPlans = prisma.properties_floor_plans.deleteMany();
    const deletePropertyDetails =
      prisma.properties_property_details.deleteMany();
    const deleteRules = prisma.properties_rules.deleteMany();
    const deleteAddreses = prisma.address.deleteMany();
    const deletePhotos = prisma.photo.deleteMany();
    const deleteProperties = prisma.property.deleteMany();
    await prisma.$transaction([
      deleteCharges,
      deleteCondominiumDetails,
      deleteFloorPlans,
      deletePropertyDetails,
      deleteRules,
      deleteAddreses,
      deletePhotos,
      deleteProperties,
    ]);
  });

  it('insert a property', async () => {
    await repository.insert(properties[0]);
    const property = await prisma.property.findFirst();
    const propertiesRules = await prisma.properties_rules.findMany();
    const propertiesCharges = await prisma.properties_charges.findMany();
    const propertiesCondominiumDetails =
      await prisma.properties_condominium_details.findMany();
    const propertiesFloorPlans = await prisma.properties_floor_plans.findMany();
    const propertiesPropertyDetails =
      await prisma.properties_property_details.findMany();
    const address = await prisma.address.findFirst();
    const photos = await prisma.photo.findMany();

    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);
    expect(property?.user_id).toBe(properties[0].user_id.value);
    expect(property?.property_type_id).toBeDefined();
    expect(property?.privacy_type_id).toBeDefined();
    expect(property?.property_relationship_id).toBeDefined();
    expect(propertiesRules).toHaveLength(1);
    expect(propertiesRules.map((rule) => rule.rule_key)).toEqual(
      properties[0].rules.map((rule) => rule.key),
    );
    expect(propertiesCharges).toHaveLength(3);
    expect(propertiesCharges.map((charge) => charge.charge_key)).toEqual(
      properties[0].charges.map((charge) => charge.key),
    );
    expect(propertiesCondominiumDetails).toHaveLength(1);
    expect(
      propertiesCondominiumDetails.map(
        (condominiumDetail) => condominiumDetail.condominium_detail_key,
      ),
    ).toEqual(
      properties[0].condominium_details.map(
        (condominiumDetail) => condominiumDetail.key,
      ),
    );
    expect(propertiesFloorPlans).toHaveLength(3);
    expect(
      propertiesFloorPlans.map((floorPlan) => floorPlan.floor_plan_key),
    ).toEqual(properties[0].floor_plans.map((floorPlan) => floorPlan.key));
    expect(propertiesPropertyDetails).toHaveLength(1);
    expect(
      propertiesPropertyDetails.map(
        (propertyDetail) => propertyDetail.property_detail_key,
      ),
    ).toEqual(
      properties[0].property_details.map(
        (propertyDetail) => propertyDetail.key,
      ),
    );
    expect({
      id: address?.id,
      street: address?.street,
      complement: address?.complement,
      district: address?.district,
      city: address?.city,
      state: address?.state,
      zip_code: address?.zip_code,
    }).toEqual({
      id: properties[0].address.id,
      street: properties[0].address.street,
      complement: properties[0].address.complement,
      district: properties[0].address.district,
      city: properties[0].address.city,
      state: properties[0].address.state,
      zip_code: properties[0].address.zip_code,
    });
    expect(photos).toHaveLength(3);
    expect(
      photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        file: photo.file,
        type: photo.type,
        subtype: photo.subtype,
        name: photo.name,
      })),
    ).toEqual(
      properties[0].photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        file: photo.file,
        type: photo.type,
        subtype: photo.subtype,
        name: photo.name,
      })),
    );
  });

  it('find by id a property', async () => {
    await repository.insert(properties[0]);
    const property = await repository.findById(properties[0].id);
    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);
    expect(property?.user_id.value).toBe(properties[0].user_id.value);
    expect(property?.address.toJSON()).toEqual(properties[0].address.toJSON());
    expect(property?.photos.map((photo) => photo.toJSON())).toEqual(
      properties[0].photos.map((photo) => photo.toJSON()),
    );
    expect(property?.created_at).toEqual(properties[0].created_at);
    expect(property?.updated_at).toEqual(properties[0].updated_at);
    expect(property?.property_type).toEqual(properties[0].property_type);
    expect(property?.privacy_type).toEqual(properties[0].privacy_type);
    expect(property?.property_relationship).toEqual(
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

  it('find all a property', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.findAll();
    expect(items).toHaveLength(1);
  });

  it('update a property', async () => {
    await repository.insert(properties[0]);
    const property = await repository.findById(properties[0].id);
    expect(property).toBeTruthy();
    expect(property?.id).toBe(properties[0].id);
    expect(property?.title).toBe(properties[0].title);
    expect(property?.description).toBe(properties[0].description);
    expect(property?.status).toBe(properties[0].status);

    const newProperty = faker
      .withId(new UniqueEntityId(property?.id))
      .withTitle('new title')
      .withDescription('new desc')
      .withStatus(PropertyStatus.PENDING)
      .build();
    await repository.update(newProperty);
    const updatedProperty = await repository.findById(newProperty.id);
    expect(updatedProperty).toBeTruthy();
    expect(updatedProperty?.id).toBe(newProperty.id);
    expect(updatedProperty?.title).toBe(newProperty.title);
    expect(updatedProperty?.description).toBe(newProperty.description);
    expect(updatedProperty?.status).toBe(newProperty.status);
  });

  it('filter is null', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(new PropertySearchParams({}));
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: null,
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('query filter', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({ filter: { query: 'title' } }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { query: 'title' },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('id filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { id: properties[0].id },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('status filter', async () => {
    await repository.insert(properties[0]);
    const items = await repository.search(
      new PropertySearchParams({
        filter: { status: PropertyStatus.COMPLETE },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { status: PropertyStatus.COMPLETE },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('property_type filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { property_type: properties[0].property_type },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('privacy_type filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { privacy_type: properties[0].privacy_type },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('property_details filter', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { property_details: [propertyDetails.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { property_details: [propertyDetails.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('condominium_details filter', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { condominium_details: [condominiumDetails.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { condominium_details: [condominiumDetails.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('rules filter', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { rules: [rules.key] },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { rules: [rules.key] },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('value filter', async () => {
    await Promise.all(
      properties.map((property) => repository.insert(property)),
    );
    const items = await repository.search(
      new PropertySearchParams({
        filter: { min_value: 1000, max_value: 1500, value_type: 'all' },
      }),
    );
    expect(items).toMatchObject({
      total: 1,
      current_page: 1,
      per_page: 15,
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { min_value: 1000, max_value: 1500, value_type: 'all' },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('footage filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { min_footage: 30, max_footage: 50 },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('qtd_bedrooms filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: { qtd_bedrooms: 2 },
    });
    expect(items.items).toHaveLength(1);
    expect(items.items[0].id).toBe(properties[0].id);
  });

  it('qtd_bathrooms filter', async () => {
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
      sort: 'created_at',
      sort_dir: 'asc',
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
      status: PropertyStatus.COMPLETE,
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
  it('sort items by created_at when sort is null', async () => {
    const items = [
      properties[0],
      PropertyFakeBuilder.aProperty()
        .withCondominiumDetails([condominiumDetails.build()])
        .withRules([rules.build()])
        .withCharges([rent.build(), taxes.build(), iptu.build()])
        .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
        .withPropertyDetails([propertyDetails.build()])
        .withPrivacyTypeKey(privacyTypeKey)
        .withPropertyTypeKey(propertyTypeKey)
        .withPropertyRelationshipKey(propertyRelationshipKey)
        .withStatus(PropertyStatus.COMPLETE)
        .withTitle('title')
        .withCreatedAt(new Date('2020-01-01'))
        .withUserId(new UniqueEntityId('MgxO159FtDCCYQYULEhBy'))
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
      sort: 'created_at',
      sort_dir: 'asc',
      filter: {},
    });
    expect(data.items).toHaveLength(2);
    expect(data.items[0].id).toBe(items[1].id);
    expect(data.items[1].id).toBe(items[0].id);
  });
  it('sort items by title', async () => {
    const items = [
      PropertyFakeBuilder.aProperty()
        .withCondominiumDetails([condominiumDetails.build()])
        .withRules([rules.build()])
        .withCharges([rent.build(), taxes.build(), iptu.build()])
        .withFloorPlans([footage.build(), bathrooms.build(), bedrooms.build()])
        .withPropertyDetails([propertyDetails.build()])
        .withPrivacyTypeKey(privacyTypeKey)
        .withPropertyTypeKey(propertyTypeKey)
        .withPropertyRelationshipKey(propertyRelationshipKey)
        .withStatus(PropertyStatus.COMPLETE)
        .withTitle('a')
        .withUserId(new UniqueEntityId('MgxO159FtDCCYQYULEhBy'))
        .build(),
      properties[0],
    ];
    await Promise.all(items.map((property) => repository.insert(property)));
    const data = await repository.search(
      new PropertySearchParams({
        sort: 'title',
      }),
    );
    expect(data).toMatchObject({
      total: 2,
      current_page: 1,
      per_page: 15,
      sort: 'title',
      sort_dir: 'asc',
      filter: {},
    });
    expect(data.items).toHaveLength(2);
    expect(data.items[0].id).toBe(items[1].id);
    expect(data.items[1].id).toBe(items[0].id);
  });

  it('clean all', async () => {
    expect(1).toBe(1);
  });
});
