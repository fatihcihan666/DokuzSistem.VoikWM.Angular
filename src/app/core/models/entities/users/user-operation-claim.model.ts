import { BaseEntity } from "../../shared/base-entitiy.model";
import { OperationClaim } from "./operation-claim.model";
import { User } from "./user.model";

export class UserOperationClaim extends BaseEntity {
    id!: number;
    userId!: number;
    operationClaimId!: number;
    user!: User;
    operationClaim!: OperationClaim;
}