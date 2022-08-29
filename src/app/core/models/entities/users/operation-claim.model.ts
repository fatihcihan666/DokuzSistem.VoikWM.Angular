import { BaseEntity } from "../../shared/base-entitiy.model";
import { LogModel } from "../logger/log.model";
import { UserOperationClaim } from "./user-operation-claim.model";
import { User } from "./user.model";

export class OperationClaim extends BaseEntity {
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  identificationNumber!: string;
  passwordSalt!: string;
  passwordHash!: string;
  createUsers!: User[];
  updateUsers!: User[];
  logModels!: LogModel[];
  userOperationClaims!: UserOperationClaim[];
}

export enum RoleEnum {
  SystemAdmin,
  Admin,
  Personnel
}


export class UserRegisterDto {
  id!: number | null;
  name!: string;
  surname!: string;
  email!: string;
  password!: string;
  isTheAgreementAccepted: any;
}


export const RoleEnumDataSource = [
  { id: 'SystemAdmin', name: 'Sistem Yöneticisi', class: 'badge-soft-warning', icon: 'fa fa-user' },
  { id: 'Admin', name: 'Yönetici', class: 'badge-soft-success', icon: 'fa fa-user' },
  { id: 'Personnel', name: 'Personel', class: 'badge-soft-danger', icon: 'fa fa-user' }
]