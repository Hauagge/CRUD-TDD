import { Permission } from '@modules/permissions/entities/Permissions';
import PermissionRepositoryInMemory from '@modules/permissions/infra/repositories/in-memory/PermissionRepositoryInMemory';
import IndexPermissionUseCase from './IndexPermissionUseCase';

let indexPermimssionUseCase: IndexPermissionUseCase;
let permissionRepositoryInMemory: PermissionRepositoryInMemory;

let permisison1: Permission;
let permisison2: Permission;
let permisison3: Permission;

describe('List Permissions', () => {
	beforeEach(async () => {
		permissionRepositoryInMemory = new PermissionRepositoryInMemory();

		indexPermimssionUseCase = new IndexPermissionUseCase(permissionRepositoryInMemory);
		permisison1 = await permissionRepositoryInMemory.create({ description: 'creater' });
		permisison2 = await permissionRepositoryInMemory.create({ description: 'reader' });
		permisison3 = await permissionRepositoryInMemory.create({ description: 'updater' });
	});

	it('Should be able to list all  permissions', async () => {
		const response = await indexPermimssionUseCase.execute();
		expect(response).toEqual(
			expect.arrayContaining([
				{
					id: permisison1.id,
					description: 'creater'
				},
				{
					id: permisison2.id,
					description: 'reader'
				},
				{
					id: permisison3.id,
					description: 'updater'
				}
			])
		);
	});
});
