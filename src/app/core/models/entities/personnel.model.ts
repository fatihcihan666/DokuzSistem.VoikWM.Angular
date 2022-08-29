import { Unit } from "./unit.model";
import { Title } from "./title.model";
import { Register } from "./register.model";
import { BaseEntity } from "../shared/base-entitiy.model";
import { PersonnelUnit } from "./personnel-unit.model";

export class Personnel extends BaseEntity {
    id!: number;
    startDateWork!: string | number | Date;
    endDateWork!: string | number | Date;
    code!: string;

    registerId!: number;
    register!: Register;
    personnelUnit!: PersonnelUnit[];
}