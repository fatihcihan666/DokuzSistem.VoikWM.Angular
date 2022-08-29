import { BaseEntity } from "../shared/base-entitiy.model";
import { Unit } from "./unit.model";

/**Görev tanımlarının tutulduğu tablodur */
export class JobDefinition extends BaseEntity {
    id!: number;
    code!: string;
    name!: string;
    perfection!: number;

    unitId!: number;
    unit!: Unit;

}