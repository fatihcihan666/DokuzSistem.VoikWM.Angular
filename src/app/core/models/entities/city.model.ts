import { BaseEntity } from "../shared/base-entitiy.model";
import { Address } from "./address.model";
import { District } from "./district.model";

/**Sehir tanımlarının tutulduğu tablodur */
export class City extends BaseEntity {
    /**Tablo tekil bilgisidir */
    id!: number;
    /**Şehrin tanımlayıcı bilgisidir */
    name!: string;
    plateCode!: string;
    district!: District[];
    address!: Address[];
}