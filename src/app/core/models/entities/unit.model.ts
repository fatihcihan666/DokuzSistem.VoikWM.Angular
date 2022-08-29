import { BaseEntity } from "../shared/base-entitiy.model";

/**Departman tanımlarının tutulduğu tablodur */
export class Unit extends BaseEntity {
    /**Tablo tekil bilgisidir */
    id!: number;
    /**Departman tanımlayıcı bilgisidir */
    name!: string;
    /**Departman kod bilgisidir */
    code!: string;
    /**hangi birime bagli oldugu bilgisi */
    parentId!: number;
}