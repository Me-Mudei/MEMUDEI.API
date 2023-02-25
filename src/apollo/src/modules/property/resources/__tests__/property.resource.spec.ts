import Context from '../../../../context';
import { ApolloTestContext } from '../../../shared/tests/apollo-test-helper';
import { Upload } from 'graphql-upload';
import { Readable } from 'stream';
describe('PropertyResource', () => {
  let client: any;
  let ctx: ApolloTestContext;
  let context: Context;

  beforeEach(async () => {
    context = new Context().getTestContext();
    ctx = new ApolloTestContext('int', context);
    client = await ctx.makeClient();
  });

  afterEach(async () => {
    await ctx.stopServer();
  });
  it('should search properties return empty items', async () => {
    const res = await client.executeOperation(
      {
        query: `query SearchProperties {
                  search_properties {
                    total
                    per_page
                    last_page
                    current_page
                    items {
                      id
                    }
                  }
                }`,
      },
      { contextValue: context },
    );
    expect(res).toMatchSnapshot();
  });

  it('should get property', async () => {
    const property = await context.propertyService.createProperty({
      ...makeInput(),
      photos: [],
      user_id: 'MgxO159FtDCCYQYULEhBy',
    });
    const res = await client.executeOperation(
      {
        query: `query GetProperty($input: get_property_input!) {
                  get_property(input: $input) {
                    title
                  }
                }`,
        variables: {
          input: {
            id: property.id,
          },
        },
      },
      { contextValue: context },
    );
    expect(res).toMatchSnapshot();
  });

  it('should create property', async () => {
    const upload = new Upload();
    const file = Readable.from(
      Buffer.from(`${__dirname}/int-apollo-upload-test.txt`, 'utf8'),
    ) as any;
    upload.promise = new Promise((resolve) =>
      resolve({
        filename: 'int-apollo-upload-test.txt',
        mimetype: 'text/plain',
        encoding: '7bit',
        createReadStream: () => file,
      }),
    );
    const res = await client.executeOperation(
      {
        query: `mutation CreateProperty($input: create_property_input!) {
                  create_property(input: $input) {
                    status
                  }
                }`,
        variables: {
          input: {
            ...makeInput(),
            photos: [upload],
          },
        },
      },
      { contextValue: context },
    );
    expect(res).toMatchSnapshot();
  });

  const makeInput = () => ({
    title: 'Apartamento completo com churraqueira',
    description:
      'Imóvel mobiliado, com churrasqueira e piscina, próximo ao metrô e comércio local, com 2 vagas de garagem e 2 quartos com ar condicionado. O condomínio possui academia, salão de festas e portaria 24 horas. Agende sua visita!',
    address: {
      zip_code: '04571000',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua dos Pinheiros',
      district: 'Pinheiros',
    },
    property_type: 'apartment',
    property_relationship: 'owner',
    privacy_type: 'entire_property',
    floor_plans: [
      {
        key: 'bedrooms',
        value: 2,
      },
      {
        key: 'bathrooms',
        value: 2,
      },
      {
        key: 'garage',
        value: 2,
      },
      {
        key: 'footage',
        value: 100,
      },
    ],
    property_details: [
      {
        key: 'cupboards',
        available: false,
      },
      {
        key: 'services_area',
        available: true,
      },
    ],
    condominium_details: [
      {
        key: 'elevator',
        available: false,
      },
      {
        key: 'reception',
        available: true,
      },
    ],
    rules: [
      {
        key: 'pets',
        allowed: false,
      },
      {
        key: 'smoking',
        allowed: true,
      },
    ],
    charges: [
      {
        key: 'rent',
        amount: 1200,
      },
      {
        key: 'condominium',
        amount: 400,
      },
      {
        key: 'iptu',
        amount: 100,
      },
      {
        key: 'other',
        amount: 100,
      },
    ],
  });
});
