import { User } from "../users/user.model";

export enum LogTypeEnum {
    Request,
    Info,
    Exception
}


export const LogTypeDataSource = [
    { id: 'Request', name: 'İstek', class: 'badge-soft-success', icon: 'fa fa-check-square' },
    { id: 'Info', name: 'Bilgi', class: 'badge-soft-info', icon: 'fa fa-check-square' },
    { id: 'Exception', name: 'Hata', class: 'badge-soft-danger', icon: 'fa fa-ban' }
]

export class LogModel {
    Id!: number;
    MethodName!: string;
    Detail!: string;
    UserId!: number | null;
    LoggedAt!: string;
    Ip!: string;
    LogType!: LogTypeEnum;
    User!: User;
}