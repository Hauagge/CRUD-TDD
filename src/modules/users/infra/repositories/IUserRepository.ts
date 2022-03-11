import { User } from '../../entities/User';

export default interface IUserRepository {
	listAllUsers(): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User>;
	create(user: User): Promise<User>;
	update(user: User): Promise<User>;
	delete(user: User): Promise<User>;
};
