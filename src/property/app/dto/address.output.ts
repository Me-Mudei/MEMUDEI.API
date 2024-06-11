import { Address } from "../../domain";

export interface AddressLocationOutput {
  lat: number;
  lng: number;
}

export interface AddressOutput {
  id: string;
  zip_code: string;
  city: string;
  state: string;
  street: string;
  country: string;
  location: AddressLocationOutput;
  district?: string;
  complement?: string;
}

export class AddressOutputMapper {
  static toOutput(address: Address): AddressOutput {
    return {
      id: address.id,
      zip_code: address.zip_code,
      city: address.city,
      state: address.state,
      street: address.street,
      country: address.country,
      location: {
        lat: address.location.lat,
        lng: address.location.lng,
      },
      district: address.district,
      complement: address.complement,
    };
  }
}
