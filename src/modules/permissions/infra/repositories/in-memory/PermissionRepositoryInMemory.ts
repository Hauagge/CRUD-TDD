import { Permission } from '@modules/permissions/entities/Permissions';
import { v4 as uuid } from 'uuid';
import IPermissionRepository from '../IPermissionRepository';

export default class PermissionRepositoryInMemory implements IPermissionRepository {
	permissions: Permission[] = [];

	async findById(id: string): Promise<Permission> {
		const permission = this.permissions.find((findEquipment) => findEquipment.id === id);
		return permission;
	}
	async create(permission: Permission): Promise<Permission> {
		Object.assign(permission, {
			id: uuid()
		});
		this.permissions.push(permission);
		return permission;
	}
	async update(permission: Permission): Promise<Permission> {
		const findIndex = this.permissions.findIndex((findUser) => findUser.id === permission.id);

		this.permissions[findIndex] = permission;

		return permission;
	}
	async delete(permission: Permission): Promise<Permission> {
		const findIndex = this.permissions.findIndex((findEquipment) => findEquipment.id === permission.id);

		this.permissions[findIndex].deleted_at = new Date();

		return permission;
	}

	async listAllPermissions(): Promise<Permission[]> {
		return this.permissions;
	}
}
