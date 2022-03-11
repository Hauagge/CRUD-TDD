import { Permission } from '@modules/permissions/entities/Permissions';
import PermissionRepositoryInMemory from '@modules/permissions/infra/repositories/in-memory/PermissionRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import ShowPermissionUseCase from './ShowPermissionUseCase';

let showPermimssionUseCase: ShowPermissionUseCase;
let permissionRepositoryInMemory: PermissionRepositoryInMemory;

let permisison1: Permission;
let permisison2: Permission;
let permisison3: Permission;

describe('List Permissions', () => {
	beforeEach(async () => {
		permissionRepositoryInMemory = new PermissionRepositoryInMemory();

		showPermimssionUseCase = new ShowPermissionUseCase(permissionRepositoryInMemory);
		permisison1 = await permissionRepositoryInMemory.create({ description: 'creater' });
	});

	it('Should be able to show a  permissions', async () => {
		const response = await showPermimssionUseCase.execute(permisison1.id);
		expect(response.description).toEqual('creater');
	});
	it('should not be able to show a non-existing permission', async () => {
		await expect(showPermimssionUseCase.execute('non-existing-permission')).rejects.toBeInstanceOf(AppError);
	});
});
