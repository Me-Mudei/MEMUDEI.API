import { SearchPropertyUseCase } from '../../search-property.use-case';
import { InMemoryRepositoryFactory } from '#property/infra';
import { Broker } from '#shared/infra';
import {
  PropertyFakeBuilder,
  PropertyFilter,
  RepositoryFactory,
} from '#property/domain';
import { PropertyOutputMapper } from '#property/app/dto';
import { SearchInputDto } from '#shared/app';

describe('SearchPropertyUseCase Unit Tests', () => {
  let useCase: SearchPropertyUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    useCase = new SearchPropertyUseCase(repositoryFactory, broker);
  });

  it('should search properties without params', async () => {
    const items = PropertyFakeBuilder.theProperties(10).build();
    useCase['propertyRepository']['items'] = items;
    const response = await useCase.execute({});
    expect(response.total).toBe(items.length);
    expect(response.items).toStrictEqual(
      items.map((property) => PropertyOutputMapper.toOutput(property)),
    );
    expect(response.current_page).toBe(1);
    expect(response.last_page).toBe(1);
    expect(response.per_page).toBe(15);
  });

  it('should search properties with filter params', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const items = [
      faker.withTitle('test').withDescription('test').build(),
      faker.withTitle('fake').withDescription('test').build(),
      faker.withTitle('TEST').withDescription('fake').build(),
      faker.withTitle('fake').withDescription('fake').build(),
    ];
    useCase['propertyRepository']['items'] = items;
    const input = {
      filter: {
        query: 'test',
      },
    };
    const response = await useCase.execute(input);
    expect(response.total).toBe(3);
    expect(response.items).toStrictEqual(
      items
        .filter(
          (property) =>
            property.title.includes('test') ||
            property.title.includes('TEST') ||
            property.description.includes('test') ||
            property.description.includes('TEST'),
        )
        .map((property) => PropertyOutputMapper.toOutput(property)),
    );
    expect(response.current_page).toBe(1);
    expect(response.last_page).toBe(1);
    expect(response.per_page).toBe(15);
  });

  it('should search properties with sort params', async () => {
    const faker = PropertyFakeBuilder.aProperty();
    const items = [
      faker.withTitle('a').build(),
      faker.withTitle('c').build(),
      faker.withTitle('b').build(),
      faker.withTitle('d').build(),
    ];
    useCase['propertyRepository']['items'] = items;
    let input: SearchInputDto<PropertyFilter> = {
      sort: 'title',
      sort_dir: 'asc',
    };
    let response = await useCase.execute(input);
    expect(response.total).toBe(items.length);
    expect(response.items).toStrictEqual(
      items
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((property) => PropertyOutputMapper.toOutput(property)),
    );
    expect(response.current_page).toBe(1);
    expect(response.last_page).toBe(1);
    expect(response.per_page).toBe(15);

    input = {
      sort: 'title',
      sort_dir: 'desc',
    };
    response = await useCase.execute(input);
    expect(response.items).toStrictEqual(
      items
        .sort((a, b) => b.title.localeCompare(a.title))
        .map((property) => PropertyOutputMapper.toOutput(property)),
    );
  });
});
