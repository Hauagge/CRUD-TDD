import { User } from '@modules/users/entities/User';
import { UserRepositoryInMemory } from '@modules/users/infra/repositories/in-memory/UserRepositoryInMemory';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/fakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import AuthneticateUserUseCase from './AuthneticateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthneticateUserUseCase;
let user: User;
describe('Authenticate User', () => {
	beforeEach(async () => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		fakeHashProvider = new FakeHashProvider();
		authenticateUser = new AuthneticateUserUseCase(userRepositoryInMemory, fakeHashProvider);

		user = await userRepositoryInMemory.create({
			name: 'Jhon Doe',
			email: 'johndoe@example.com',
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
		});
	});

	it('should be able to authenticate', async () => {
		const response = await authenticateUser.execute({
			email: user.email,
			password: '123456'
		});

		expect(response).toHaveProperty('token');
	});

	it('should not be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUser.execute({
				email: 'johndoe1@example.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		await expect(
			authenticateUser.execute({
				email: 'johndoe@example.com',
				password: 'wrong-password'
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
