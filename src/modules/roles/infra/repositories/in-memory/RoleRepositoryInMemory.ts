import { Role } from '@modules/roles/entities/Role';
import { v4 as uuid } from 'uuid';
import IRoleRepository from '../IRoleRepository';

export default class RoleRepositoryInMemory implements IRoleRepository {
	roles: Role[] = [];

	async listAllRoles(): Promise<Role[]> {
		const all = await this.roles;
		return all;
	}

	async findById(id: string): Promise<Role | undefined> {
		const roleExists = await this.roles.find((role) => role.id === id);
		return roleExists;
	}

	async create(role: Role): Promise<Role> {
		Object.assign(role, {
			id: uuid()
		});
		this.roles.push(role);
		return role;
	}

	async update(role: Role): Promise<Role> {
		const findIndex = this.roles.findIndex((findRole) => findRole.id === role.id);

		this.roles[findIndex] = role;

		return role;
	}
	async delete(role: Role): Promise<Role> {
		const findIndex = this.roles.findIndex((findRole) => findRole.id === role.id);

		this.roles[findIndex].deleted_at = new Date();

		return role;
	}
}

export { RoleRepositoryInMemory };
