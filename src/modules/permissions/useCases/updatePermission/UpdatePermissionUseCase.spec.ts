import { Permission } from '@modules/permissions/entities/Permissions';
import PermissionRepositoryInMemory from '@modules/permissions/infra/repositories/in-memory/PermissionRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import UpdatePermissionUseCase from './UpdatePermissionUseCase';

let updatePermissionUseCase: UpdatePermissionUseCase;
let permissionRepositoryInMemory: PermissionRepositoryInMemory;

let permission: Permission;
describe('Update Permission', () => {
	beforeEach(async () => {
		permissionRepositoryInMemory = new PermissionRepositoryInMemory();
		updatePermissionUseCase = new UpdatePermissionUseCase(permissionRepositoryInMemory);
		permission = {
			description: 'creater'
		};
		permission = await permissionRepositoryInMemory.create(permission);
	});

	it('Should be able to update a permission', async () => {
		const permissionUpdated = await updatePermissionUseCase.execute({
			id: permission.id,
			description: 'reader'
		});

		expect(permissionUpdated.description).toBe('reader');
	});
	it('Should not be able to update a permission non-existing', async () => {
		await expect(
			updatePermissionUseCase.execute({
				id: 'not-existing-permission',
				description: 'reader'
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
