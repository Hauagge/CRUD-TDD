import { User } from '@modules/users/entities/User';
import { UserRepositoryInMemory } from '@modules/users/infra/repositories/in-memory/UserRepositoryInMemory';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/fakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import CreateUserUseCase from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let hashProvider: FakeHashProvider;

let userData: User;
describe('Create User', () => {
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		hashProvider = new FakeHashProvider();

		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory, hashProvider);

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

	it('Should be able to create a  new user', async () => {
		const user = await createUserUseCase.execute(userData);

		expect(user).toHaveProperty('id');
		expect(user.name).toBe('Jhon Doe');
	});

	it('should not be able to create a user with an existing e-mail', async () => {
		await createUserUseCase.execute(userData);

		await expect(createUserUseCase.execute(userData)).rejects.toEqual(new AppError('User already exists'));
	});
});
