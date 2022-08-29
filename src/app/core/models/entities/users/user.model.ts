import { BaseEntity } from "../../shared/base-entitiy.model";
import { LogModel } from "../logger/log.model";
import { UserOperationClaim } from "./user-operation-claim.model";

export class User extends BaseEntity {
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  isTheAgreementAccepted: any;

  identificationNumber!: string;
  companyId!: number | null;
  passwordSalt!: string;
  passwordHash!: string;
  createUsers!: User[];
  updateUsers!: User[];
  logModels!: LogModel[];
  userOperationClaims!: UserOperationClaim[];
}

export class UserRegisterDto {
  id: number | null | undefined;
  name!: string;
  surname!: string;
  email!: string;
  password!: string;
  companyId: number | null | undefined;
  claims:  any[] = [];
}