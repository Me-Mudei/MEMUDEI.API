import { UniqueEntityId } from "#shared/domain";
import Chance from "chance";
import { omit } from "lodash";

import { Address } from "../address.entity";

describe("Address Unit Tests", () => {
  const chance = new Chance();
  beforeEach(() => {
    Address.validate = jest.fn();
  });
  test("constructor of address", () => {
    const requiredProps = {
      city: chance.city(),
      state: chance.state(),
      zip_code: chance.postcode(),
      street: chance.street(),
      district: chance.province()
    };
    const address = new Address(requiredProps);
    const props = omit(address.props, "created_at", "updated_at");
    expect(Address.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      ...requiredProps,
      id: expect.any(UniqueEntityId)
    });
    expect(address.props.created_at).toBeInstanceOf(Date);

    /* let created_at = new Date(); //string
    address = new Address({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(address.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    address = new Address({
      name: 'Movie',
      description: 'other description',
    });
    expect(address.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    });

    address = new Address({
      name: 'Movie',
      is_active: true,
    });
    expect(address.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    created_at = new Date();
    address = new Address({
      name: 'Movie',
      created_at,
    });
    expect(address.props).toMatchObject({
      name: 'Movie',
      created_at,
    }); */

    // expect(address.name).toBe("Movie");
    // expect(address.description).toBe("some description");
    // expect(address.is_active).toBeTruthy();
    // expect(address.created_at).toBe(created_at);
  });

  /* describe('id field', () => {
    type AddressData = { props: AddressProperties; id?: UniqueEntityId };
    const arrange: AddressData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ];

    test.each(arrange)('when props is %j', (item) => {
      const address = new Address(item.props, item.id as any);
      expect(address.id).not.toBeNull();
      expect(address.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  }); */
});
