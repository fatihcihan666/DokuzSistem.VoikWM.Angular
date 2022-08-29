
import { BaseEntity } from "../shared/base-entitiy.model";
import { User } from "./users/user.model";

/**Sicil bilgilerinin tutulduğu tablodur */
export class Register extends BaseEntity {
    id!: number;
    fullName!: string;
    identificationNumber!: number;
    dateOfBirth!: string | number | Date | any;

    userId!: number;
    user!: User;
}