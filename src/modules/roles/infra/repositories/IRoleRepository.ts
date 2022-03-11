import { Role } from '../../entities/Role';

export default interface IRoleRepository {
	listAllRoles(): Promise<Role[]>;
	findById(id: string): Promise<Role | undefined>;
	create(role: Role): Promise<Role>;
	update(role: Role): Promise<Role>;
	delete(role: Role): Promise<Role>;
};
