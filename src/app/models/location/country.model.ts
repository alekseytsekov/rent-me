import { City } from './city.model';

export class Country{
    public id : string;
    public name : string;
    public cityIds : string[];
    public cities : City;
}