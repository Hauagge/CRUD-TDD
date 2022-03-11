import PermissionRepositoryInMemory from '@modules/permissions/infra/repositories/in-memory/PermissionRepositoryInMemory';
import CreatePermissionUseCase from './CreatePermissionUseCase';

let createPermimssionUseCase: CreatePermissionUseCase;
let permissionRepositoryInMemory: PermissionRepositoryInMemory;

describe('Create Permission', () => {
	beforeEach(() => {
		permissionRepositoryInMemory = new PermissionRepositoryInMemory();

		createPermimssionUseCase = new CreatePermissionUseCase(permissionRepositoryInMemory);
	});

	it('Should be able to create a  new  permission', async () => {
		const user = await createPermimssionUseCase.execute('creater');

		expect(user).toHaveProperty('id');
		expect(user.description).toBe('creater');
	});
});
