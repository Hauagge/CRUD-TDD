import { Permission } from '@modules/permissions/entities/Permissions';
import PermissionRepositoryInMemory from '@modules/permissions/infra/repositories/in-memory/PermissionRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import DeletePermissionUseCase from './DeletePermissionUseCase';

let deletePermimssionUseCase: DeletePermissionUseCase;
let permissionRepositoryInMemory: PermissionRepositoryInMemory;

let permission: Permission;
describe('Delete Permission', () => {
	beforeEach(async () => {
		permissionRepositoryInMemory = new PermissionRepositoryInMemory();

		deletePermimssionUseCase = new DeletePermissionUseCase(permissionRepositoryInMemory);

		permission = await permissionRepositoryInMemory.create({ description: 'create' });
	});

	it('Should be able to delete a permission', async () => {
		const newDate = new Date(2022, 3, 7, 0, 0, 0, 0);

		jest.spyOn<any, any>(global, 'Date').mockImplementationOnce(() => {
			return new Date(newDate);
		});

		const permissionDeleted = await deletePermimssionUseCase.execute(permission.id);

		expect(permissionDeleted.deleted_at).toEqual(new Date());
	});

	it('should not be able to delete a non-existing permission', async () => {
		await expect(deletePermimssionUseCase.execute('non-existing-permission')).rejects.toBeInstanceOf(AppError);
	});
});
