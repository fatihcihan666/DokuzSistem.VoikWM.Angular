import { BaseEntity } from "../shared/base-entitiy.model";
import { City } from "./city.model";


/**İlçe bilgilerinin tutulduğu tablodur */
export class District extends BaseEntity {
    /**Tablo tekil bilgisidir */
    id!: number;
    /**ilçenin tanımlayıcı bilgisidir */
    name!: string;
    /**ilçenin bağlı olduğu ilin tekil bilgisidir */
    cityId!: number;
    /**il bilgisi döndürür */
    city!: City;

}