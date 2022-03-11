import { User } from '@modules/users/entities/User';
import { UserRepositoryInMemory } from '@modules/users/infra/repositories/in-memory/UserRepositoryInMemory';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/fakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import CreateUserUseCase from './DeleteUserUseCase';

let deleteUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProvider: FakeHashProvider;

let userData: User;
describe('Delete User', () => {
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		hashProvider = new FakeHashProvider();

		deleteUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

		userData = {
			name: 'Jhon Doe',
			email: 'jhondoe@example.com',
			password: '123456',
			code_post: '88888888',
			country: 'pais-teste',
			state: 'estado-teste',
			city: 'cidade-teste',
			street: 'Rua de teste',
			district: 'bairro-teste',
			number: 'numero-teste',
			document_type: 'teste',
			document_number: '123456',
			userType: 'Blabla',
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		};
	});

	it('Should be able to delete an user', async () => {
		const newDate = new Date(2022, 3, 7, 0, 0, 0, 0);
		const user = await userRepositoryInMemory.create(userData);
		jest.spyOn<any, any>(global, 'Date').mockImplementationOnce(() => {
			return new Date(newDate);
		});
		const userDeleted = await deleteUserUseCase.execute(user.id);

		expect(userDeleted.deleted_at).toEqual(new Date());
	});

	it('should not be able to delete a non-existing user ', async () => {
		await expect(deleteUserUseCase.execute('id-not-exist')).rejects.toEqual(new AppError('User does not exists'));
	});
});
