import { Unit } from "./unit.model";
import { JobDefinition } from "./job-definition.model";
import { Personnel } from "./personnel.model";
import { Title } from "./title.model";
import { BaseEntity } from "../shared/base-entitiy.model";

export class JobAnalysis extends BaseEntity {
    id!: number;

    delegate!: EnumDelegate;
    difficulty!: EnumDifficulty;
    importance!: EnumImportance;
    risk!: EnumRisk;
    period!: EnumPeriod;
    condition!: EnumCondition;

    calculatedCompetence!: number;
    unitId!: number;
    titleId!: number;
    jobDefinitionId!: number;
    personnelId!: number;

    jobDefinition!: JobDefinition;
    title!: Title;
    unit!: Unit;
    personnel!: Personnel;
}

//#region Zorluk 
export enum EnumDifficulty {
    One = 1,
    Two,
    Three,
    Four,
    Five
}

export const DifficultyStatusDataSource = [
    { id: 'One', name: '1' },
    { id: 'Two', name: '2' },
    { id: 'Three', name: '3' },
    { id: 'Four', name: '4' },
    { id: 'Five', name: '5' }
]
//#endregion Zorluk

//#region Önem
export enum EnumImportance {
    One = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten
}

export const ImportanceStatusDataSource = [
    { id: 'One', name: '1', },
    { id: 'Two', name: '2' },
    { id: 'Three', name: '3' },
    { id: 'Four', name: '4' },
    { id: 'Five', name: '5' },
    { id: 'Six', name: '6' },
    { id: 'Seven', name: '7' },
    { id: 'Eight', name: '8' },
    { id: 'Nine', name: '9' },
    { id: 'Ten', name: '10' },
]
//#endregion Önem

//#region Risk
export enum EnumRisk {
    One = 1,
    Two,
    Three,
    Four,
    Five
}

export const RiskStatusDataSource = [
    { id: 'One', name: '1' },
    { id: 'Two', name: '2' },
    { id: 'Three', name: '3' },
    { id: 'Four', name: '4' },
    { id: 'Five', name: '5' }
]
//#endregion Risk

//#region Kondisyon 
export enum EnumCondition {
    Process = 1,
    Activity
}

export const ConditionStatusDataSource = [
    { id: 'Process', name: 'Süreç' },
    { id: 'Activity', name: 'Faaliyet' },
]
//#endregion Kondisyon

//#region Dönem
export enum EnumPeriod {
    Daily,
    Weekly,
    Monthly
}

export const PeriodStatusDataSource = [
    { id: 'Daily', name: 'Günlük' },
    { id: 'Weekly', name: 'Haftalık' },
    { id: 'Monthly', name: 'Aylık' },
]
//#endregion

//#region Delegate

export enum EnumDelegate {
    Royal,
    Proxy,
    Null
}

export const DelegateStatusDataSource = [
    { id: 'Asil', name: 'Asil' },
    { id: 'Vekalet', name: 'Vekalet' },
    { id: 'Null', name: 'Boş' },
]


//#endregion