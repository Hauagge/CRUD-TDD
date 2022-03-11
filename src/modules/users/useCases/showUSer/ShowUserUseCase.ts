import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import AppError from '@shared/errors/AppErrors';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ShowUserUseCase {
	constructor(@inject('UserRepository') private usersRepository: IUserRepository) {}
	async execute(id: string) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new AppError('User does not exists');
		}

		return user;
	}
}
