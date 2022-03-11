import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import { Permission } from '@modules/permissions/entities/Permissions';
import IPermissionRepository from '@modules/permissions/infra/repositories/IPermissionRepository';
import AppError from '@shared/errors/AppErrors';

interface IRequest {
	id: string;
	description: string;
}

@injectable()
export default class UpdatePermissionUseCase {
	constructor(@inject('PermissionRepository') private permissionRepository: IPermissionRepository) {}

	async execute({ id, description }: IRequest): Promise<Permission> {
		const permissionUpdated = await this.permissionRepository.findById(id);

		if (!permissionUpdated) {
			throw new AppError('This permission does not exist');
		}

		permissionUpdated.description = description;

		const permission = await this.permissionRepository.update(permissionUpdated);
		return permission;
	}
}
