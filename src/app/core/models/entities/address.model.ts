import { BaseEntity } from "../shared/base-entitiy.model";
import { City } from "./city.model";
import { District } from "./district.model";

/**Adres bilgilerinin tutuldugu tablodur. */
export class Address extends BaseEntity {
    id!: number;
    name!: string;
    cityId!: number;
    districtId!: number;  
    street!: string;
    neighborhood!: string;
    doorNumber!: string;
    openAddress!: string;
    /**Sehir bilgisini dondurur. */
    city!: City;
    /**İlce bilgisini dondurur. */
    district!: District;
}

