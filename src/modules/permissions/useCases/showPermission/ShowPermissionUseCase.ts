import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import { Permission } from '@modules/permissions/entities/Permissions';
import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';
import AppError from '@shared/errors/AppErrors';

@injectable()
export default class ShowPermissionUseCase {
	constructor(@inject('PermissionRepository') private permissionRepository: IPermissionRepository) {}

	async execute(id: string): Promise<Permission> {
		const permission = await this.permissionRepository.findById(id);

		if (!permission) {
			throw new AppError('This permission does not exist');
		}

		return permission;
	}
}
