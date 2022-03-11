class Role {
	id?: string;
	role_name: string;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date;
	private constructor({ role_name }: Role) {
		return Object.assign(this, {
			role_name
		});
	}

	static create({ role_name }: Role) {
		const role = new Role({
			role_name
		});
		return role;
	}
}

export { Role };
