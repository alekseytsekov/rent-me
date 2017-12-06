import { City } from './city.model';

export class Address {
    public id : string;
    public address : string;
    public cityId : string;
    public city : City;
}