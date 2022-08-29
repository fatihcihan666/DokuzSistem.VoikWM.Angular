import { Unit } from "./unit.model";
import { Personnel } from "./personnel.model";
import { Title } from "./title.model";
import { BaseEntity } from "../shared/base-entitiy.model";
import { JobDefinition } from "./job-definition.model";

export class PersonnelUnit extends BaseEntity {
    id!: number;

    personnelId!: number;
    unitId!: number;
    jobDefinitionId!: number;
    titleId!: number;
    competencyPoints!: number;

    personnel!: Personnel;
    jobDefinition!: JobDefinition;
    title!: Title;
    unit!: Unit;
}