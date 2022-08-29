import { BaseEntity } from "../shared/base-entitiy.model";

/**Mevki, pozisyon bilgilerinin tutulduğu tablodur */
export class Title extends BaseEntity {
    id!: number;
    code!: string;
    name!: string;
}