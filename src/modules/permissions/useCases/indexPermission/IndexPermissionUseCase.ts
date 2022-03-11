import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import { Permission } from '@modules/permissions/entities/Permissions';
import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';

@injectable()
export default class IndexPermissionUseCase {
	constructor(@inject('PermissionRepository') private permissionRepository: IPermissionRepository) {}

	async execute(): Promise<Permission[]> {
		const permission = await this.permissionRepository.listAllPermissions();

		return permission;
	}
}
