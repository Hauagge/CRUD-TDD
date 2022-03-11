import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/entities/User';
import AppError from '@shared/errors/AppErrors';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';

@injectable()
export default class CreateUserUseCase {
	constructor(
		@inject('UserRepository') private usersRepository: IUserRepository,
		@inject('HashProvider') private hashProvider: IHashProvider
	) {}
	async execute({
		email,
		name,
		password,
		avatar,
		code_post,
		country,
		state,
		city,
		district,
		street,
		number,
		complement,
		document_type,
		document_number,
		deleted_at,
		userType
	}: ICreateUserDTO) {
		const userExist = await this.usersRepository.findByEmail(email);

		if (userExist) {
			throw new AppError('User already exists');
		}
		const passwordHash = await this.hashProvider.generateHash(password);

		const newUser = User.create({
			email,
			name,
			password: passwordHash,
			avatar,
			code_post,
			country,
			state,
			city,
			district,
			street,
			number,
			complement,
			document_type,
			document_number,
			deleted_at,
			userType
		});
		const user = await this.usersRepository.create(newUser);

		return user;
	}
}
