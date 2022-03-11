import { prisma } from '@config/prisma/prismaClient';
import IUserRepository from '../IUserRepository';
import { User } from '@modules/users/entities/User';

export class UserRepository implements IUserRepository {
	async listAllUsers(): Promise<User[]> {
		const all = await prisma.user.findMany();
		return all;
	}
	async findById(id: string): Promise<User> {
		const result = await prisma.user.findUnique({
			where: { id }
		});
		return result;
	}
	async findByEmail(email: string): Promise<User> {
		const result = await prisma.user.findUnique({
			where: { email: email }
		});
		return result;
	}
	async create({
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
		userType
	}: User): Promise<User> {
		const user = await prisma.user.create({
			data: {
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
				userType
			}
		});

		return user;
	}
	async update(user: Omit<User, 'avatar'>): Promise<User> {
		const userUpdated = await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
				code_post: user.code_post,
				country: user.country,
				state: user.state,
				city: user.city,
				district: user.district,
				street: user.street,
				number: user.number,
				complement: user.complement,
				document_type: user.document_type,
				document_number: user.document_number,
				userType: user.userType
			}
		});

		return userUpdated;
	}
	async delete(user: User): Promise<User> {
		const userUpdated = await prisma.user.update({
			where: {
				email: user.email
			},
			data: {
				deleted_at: new Date()
			}
		});

		return userUpdated;
	}
}
