import { prisma } from '@config/prisma/prismaClient';

import { Permission } from '@modules/permissions/entities/Permissions';
import IPermissionRepository from '../IPermissionRepository';

export class PermissionRepository implements IPermissionRepository {
	async findById(id: string): Promise<Permission> {
		const permission = await prisma.permissions.findUnique({
			where: {
				id
			}
		});
		return permission;
	}
	async create(permission: Permission): Promise<Permission> {
		const permissionCreated = await prisma.permissions.create({
			data: {
				description: permission.description
			}
		});
		return permissionCreated;
	}
	async update(permission: Permission): Promise<Permission> {
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
	async delete(permission: Permission): Promise<Permission> {
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
	async listAllPermissions(): Promise<Permission[]> {
		const permissions = await prisma.permissions.findMany();

		return permissions;
	}
}
