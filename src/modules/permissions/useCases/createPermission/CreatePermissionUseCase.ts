import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import { Permission } from '@modules/permissions/entities/Permissions';
import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';

@injectable()
export default class CreatePermissionUseCase {
	constructor(@inject('PermissionRepository') private permissionRepository: IPermissionRepository) {}

	async execute(description: string): Promise<Permission> {
		const newPermission = Permission.create({ description });
		console.log(newPermission);

		const permission = await this.permissionRepository.create(newPermission);

		return permission;
	}
}
