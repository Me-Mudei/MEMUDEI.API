import { UniqueEntityId } from '../../../../shared/domain';
import { Property } from '../property.entity';

describe('Property Unit Tests', () => {
  test('constructor of property', () => {
    const property = new Property({});
    expect(property.props).toStrictEqual({});
    expect(property.id).toBeDefined();
    expect(property.created_at).toBeInstanceOf(Date);
    expect(property.updated_at).toBeInstanceOf(Date);
  });
});
