import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected/role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { ValidRoles } from '../interfaces/Roles';

export function Auth(...roles: ValidRoles[]) {
  return (
    applyDecorators(RoleProtected(...roles)),
    UseGuards(AuthGuard('jwt'), UserRoleGuard)
  );
}
