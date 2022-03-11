import ShowUserUseCase from './ShowUserUseCase';
import { User } from 'modules/users/entities/User';
import { UserRepositoryInMemory } from '@modules/users/infra/repositories/in-memory/UserRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';

let showUserUseCase: ShowUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

let userData: User;
describe('Show User', () => {
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		showUserUseCase = new ShowUserUseCase(userRepositoryInMemory);

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

	it('Should be able to list a  new user', async () => {
		const user = await userRepositoryInMemory.create(userData);

		const profile = await showUserUseCase.execute(user.id);
		expect(profile.name).toBe('Jhon Doe');
		expect(profile.email).toBe('jhondoe@example.com');
	});
	it('Should not be able to list a non existing user', async () => {
		await expect(showUserUseCase.execute('user.id')).rejects.toBeInstanceOf(AppError);
	});
});
