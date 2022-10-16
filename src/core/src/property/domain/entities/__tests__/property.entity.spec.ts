import { UniqueEntityId } from '../../../../shared/domain';
import { Property } from '../property.entity';

describe('Property Unit Tests', () => {
  test('constructor of property', () => {
    let property = new Property({});
    expect(property.props).toStrictEqual({});
    expect(property.id).toBeDefined();
    expect(property.created_at).toBeInstanceOf(Date);
    expect(property.updated_at).toBeInstanceOf(Date);

    const id = new UniqueEntityId();
    const created_at = new Date();
    const updated_at = new Date();
    property = new Property({
      id,
      created_at,
      updated_at,
    });
    expect(property.props).toStrictEqual({
      id,
      created_at,
      updated_at,
    });

    expect(property.id).toBe(id.value);
    expect(property.created_at).toBe(created_at);
    expect(property.updated_at).toBe(updated_at);
  });
});
