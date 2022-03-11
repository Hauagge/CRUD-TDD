import { User } from '@modules/users/entities/User';
import UserRepositoryInMemory from '@modules/users/infra/repositories/in-memory/UserRepositoryInMemory';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/fakeHashProvider';
import AppError from '@shared/errors/AppErrors';
import UpdateUserUseCase from './UpdateUserUseCase';

let updateUserUseCase: UpdateUserUseCase;
let hashProvider: FakeHashProvider;
let userRepositoryInMemory: UserRepositoryInMemory;

let user: User;

describe('Update User', () => {
	beforeEach(async () => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		hashProvider = new FakeHashProvider();
		updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory, hashProvider);

		const userData = {
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
			document_number: '123453126',
			userType: 'Blabla',
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		};
		user = await userRepositoryInMemory.create(userData);
	});

	it('Should be able to update  a  profile', async () => {
		const profile: User = await updateUserUseCase.execute({
			user_id: user.id,
			email: 'jhontre@example.com',
			name: 'Jhon Tre',
			code_post: '45678912',
			country: 'teste1',
			state: 'teste1',
			city: 'teste1',
			street: 'Rua do trampo',
			district: 'teste1',
			number: 'teste1',
			document_type: user.document_type,
			document_number: user.document_number,
			userType: user.userType
		});

		expect(profile.name).toBe('Jhon Tre');
		expect(profile.email).toBe('jhontre@example.com');
		expect(profile.street).toBe('Rua do trampo');
		expect(profile.code_post).toBe('45678912');
		expect(profile.country).toBe('teste1');
		expect(profile.state).toBe('teste1');
		expect(profile.city).toBe('teste1');
		expect(profile.district).toBe('teste1');
		expect(profile.number).toBe('teste1');
	});

	it('Should be able to update afew fields from  a  profile', async () => {
		const profile: User = await updateUserUseCase.execute({
			user_id: user.id,
			email: 'jhontre@example.com'
		});

		expect(profile.email).toBe('jhontre@example.com');
	});

	it('should not be able to update a non existing profile', async () => {
		await expect(
			updateUserUseCase.execute({
				user_id: '123456',
				email: 'jhontre@example.com',
				name: 'Jhon Tre',
				code_post: '45678912',
				country: user.country,
				state: user.state,
				city: user.city,
				street: 'Rua do trampo',
				district: user.district,
				number: user.number,
				document_type: user.document_type,
				document_number: user.document_number,
				userType: user.userType
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update password', async () => {
		const updatedUser = await updateUserUseCase.execute({
			user_id: user.id,
			email: user.email,
			old_password: '123456',
			password: '123123'
		});

		expect(updatedUser.password).toBe('123123');
	});

	it('should not be able to update the profile from non-existing user', async () => {
		await expect(
			updateUserUseCase.execute({
				user_id: 'non-existin-id',
				name: 'non-user-exist',
				email: 'non@existing.email.com'
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update a user email to another  existing user email', async () => {
		const user1 = await userRepositoryInMemory.create({
			name: 'Jhon Tre',
			email: 'johntre@email.com',
			password: '123123123',
			code_post: '99999999',
			country: 'pais-teste1',
			state: 'estado-teste1',
			city: 'cidade-teste1',
			street: 'Rua de teste1',
			district: 'bairro-teste1',
			number: 'numero-test1',
			document_type: 'teste1',
			document_number: '123453126',
			userType: 'Blabla1',
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		});

		await expect(
			updateUserUseCase.execute({
				user_id: user1.id,
				name: 'John Doe',
				email: 'jhondoe@example.com'
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update password without old_password', async () => {
		await expect(
			updateUserUseCase.execute({
				user_id: user.id,
				email: user.email,
				password: '123123'
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update password with wrong old_password', async () => {
		expect(
			updateUserUseCase.execute({
				user_id: user.id,
				email: user.email,
				old_password: '1234',
				password: '123123'
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
