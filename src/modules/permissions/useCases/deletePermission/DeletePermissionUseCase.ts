import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';
import AppError from '@shared/errors/AppErrors';
import { Permission } from '@modules/permissions/entities/Permissions';

@injectable()
export default class DeletePermissionUseCase {
	constructor(@inject('PermissionRepository') private permissionRepository: IPermissionRepository) {}

	async execute(id: string): Promise<Permission> {
		const permissionExist = await this.permissionRepository.findById(id);

		if (!permissionExist) {
			throw new AppError('This permission does not exist');
		}

		await this.permissionRepository.delete(permissionExist);

		return permissionExist;
	}
}
