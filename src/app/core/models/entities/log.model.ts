import { BaseEntity } from "../shared/base-entitiy.model";
import { User } from "./users/user.model";

export class Log extends BaseEntity {
    id!: number;
    methodName!: string;
    detail!: string;
    userId!: number | null;
    loggedAt!: Date;
    ip!: string;
    logType!: LogType | undefined;
    user!: User;
}

export enum DataStatus {
    Active,
    Passive,
    Cancel
}

export enum LogType {
    Request,
    Info,
    Exception
}

export const DataStatusDataSource = [
    { id: 'Passive', name: 'Pasif', class: 'badge-soft-warning', icon: 'fa fa-ban' },
    { id: 'Active', name: 'Aktif', class: 'badge-soft-success', icon: 'fa fa-check-square' },
    { id: 'Cancel', name: 'Silinmiş', class: 'badge-soft-danger', icon: 'fa fa-trash' }
]

export const LogTypeDataSource = [
    { id: 'Request', name: 'Apiye gelen isteklerin loglanması.', class: 'badge-soft-warning', icon: 'fa fa-ban' },
    { id: 'Info', name: 'Bilgi amaçlı verilerin loglanması.', class: 'badge-soft-success', icon: 'fa fa-check-square' },
    { id: 'Cancel', name: 'Hata alındığı zaman hatanın loglanması.', class: 'badge-soft-danger', icon: 'fa fa-trash' }
]
