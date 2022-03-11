import { User } from '@modules/users/entities/User';
import { v4 as uuid } from 'uuid';
import IUserRepository from '../IUserRepository';

export default class UserRepositoryInMemory implements IUserRepository {
	users: User[] = [];

	async listAllUsers(): Promise<User[]> {
		const all = await this.users;
		return all;
	}

	async findById(id: string): Promise<User | undefined> {
		const user = await this.users.find((user) => user.id === id);
		return user;
	}
	async findByEmail(email: string): Promise<User> {
		const user = await this.users.find((user) => user.email === email);
		return user;
	}
	async create(user: User): Promise<User> {
		Object.assign(user, {
			id: uuid()
		});
		this.users.push(user);
		return user;
	}

	async update(user: Omit<User, 'avatar'>): Promise<User> {
		const findIndex = this.users.findIndex((findUser) => findUser.id === user.id);

		this.users[findIndex] = user;

		return user;
	}
	async delete(user: User): Promise<User> {
		const findIndex = this.users.findIndex((findUser) => findUser.id === user.id);

		this.users[findIndex].deleted_at = new Date();

		return user;
	}
}

export { UserRepositoryInMemory };
