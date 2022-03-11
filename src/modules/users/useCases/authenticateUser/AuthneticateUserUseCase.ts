import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import AppError from '@shared/errors/AppErrors';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		email: string;
	};
	token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
	constructor(
		@inject('UserRepository') private usersRepository: IUserRepository,
		@inject('HashProvider') private hashProvider: IHashProvider
	) {}
	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('email/password is wrong');
		}

		const passwordMatch = await this.hashProvider.compareHash(password, user.password);

		if (!passwordMatch) {
			throw new AppError('email/password is wrong');
		}

		const token = sign({}, process.env.APP_SECRET || 'default', {
			subject: user.id,
			expiresIn: '1d'
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				email: user.email
			}
		};

		return tokenReturn;
	}
}
