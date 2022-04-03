import ValidateCep from '../../infra/validate_cep/ValidateCep';
import Location from './Location';

export default class Address {
  city?: string;
  state?: string;
  location?: Location;

  constructor(
    readonly validateCep: ValidateCep,
    readonly street: string,
    readonly number: string,
    readonly country: string,
    readonly zipCode: string,
    readonly neighborhood?: string | null,
    readonly complement?: string | null
  ) {}

  async validateZipCode() {
    const res = await this.validateCep.validateByCep(this.zipCode);
    this.city = res.city;
    this.state = res.state;
    this.location = new Location(
      res.location.coordinates.longitude,
      res.location.coordinates.latitude
    );
  }
}
