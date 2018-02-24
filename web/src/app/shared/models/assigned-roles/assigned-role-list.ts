import { AssignedRoles } from './assigned-roles.model';

export class AssignedRoleListDto {
    public newRoles: AssignedRoles[];
    public deletedRoles: AssignedRoles[];
}