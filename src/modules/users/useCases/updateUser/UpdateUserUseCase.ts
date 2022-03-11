import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import IUserRepository from '../../infra/repositories/IUserRepository';
import AppError from '../../../../shared/errors/AppErrors';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import IHashProvider from '../../providers/hashProviders/models/IHashProvider';

@injectable()
export default class UpdateUserUseCase {
	constructor(
		@inject('UserRepository') private usersRepository: IUserRepository,
		@inject('HashProvider') private hashProvider: IHashProvider
	) {}
	async execute({
		user_id,
		email,
		name,
		password,
		old_password,
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
		userType
	}: IUpdateUserDTO) {
		const userExist = await this.usersRepository.findById(user_id);

		if (!userExist) {
			throw new AppError('User do not exists');
		}

		const findEmail = await this.usersRepository.findByEmail(email);

		if (findEmail && findEmail.id !== user_id) {
			throw new AppError('the e-mail it is already registered');
		}

		userExist.name = name ? name : userExist.name;
		userExist.email = email;
		userExist.code_post = code_post ? code_post : userExist.code_post;
		userExist.country = country ? country : userExist.country;
		userExist.state = state ? state : userExist.state;
		userExist.city = city ? city : userExist.city;
		userExist.district = district ? district : userExist.district;
		userExist.street = street ? street : userExist.street;
		userExist.number = number ? number : userExist.number;
		userExist.complement = complement ? complement : userExist.complement;
		userExist.document_type = document_type ? document_type : userExist.document_type;
		userExist.document_number = document_number ? document_number : userExist.document_number;
		userExist.userType = userType ? userType : userExist.userType;

		if (password && !old_password) {
			throw new AppError('The old password must to be typed');
		}

		if (password && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(old_password, userExist.password);
			if (!checkOldPassword) {
				throw new AppError('the old password is incorrect');
			}
			userExist.password = await this.hashProvider.generateHash(password);
		}

		const user = await this.usersRepository.update(userExist);

		return user;
	}
}
