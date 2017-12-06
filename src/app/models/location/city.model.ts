import { Country } from './country.model';
import { Address } from './address.model';

export class City {
    public id: string;
    public name : string;
    public countryId : string;
    public country : Country;
    public addressIds : string[];
    public adresses : Address[];
}