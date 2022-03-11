import { prisma } from '@config/prisma/prismaClient';

import { Role } from '@modules/roles/entities/Role';
import IRoleRepository from '../IRoleRepository';

export class RoleRepository implements IRoleRepository {
	async findById(id: string): Promise<Role | undefined> {
		const role = await prisma.permissions.findUnique({
			where: {
				id
			}
		});
		return role;
	}
	async create(permission: Role): Promise<Role> {
		const permissionCreated = await prisma.permissions.create({
			data: {
				description: permission.description
			}
		});
		return permissionCreated;
	}
	async update(permission: Permission): Promise<Role> {
		const permissionUpdated = await prisma.permissions.update({
			where: {
				id: permission.id
			},
			data: {
				description: permission.description
			}
		});

		return permissionUpdated;
	}
	async delete(permission: Permission): Promise<Role> {
		const permissionDeleted = await prisma.permissions.update({
			where: {
				id: permission.id
			},
			data: {
				deleted_at: new Date()
			}
		});

		return permissionDeleted;
	}
	async listAllRoles(): Promise<Role[]> {
		const roles = await prisma.permissions.findMany();

		return roles;
	}
}
