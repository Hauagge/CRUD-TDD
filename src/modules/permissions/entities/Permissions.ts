class Permission {
	id?: string;
	description: string;
	deleted_at?: Date;

	private constructor({ description }: Permission) {
		return Object.assign(this, {
			description
		});
	}

	static create({ description }: Permission) {
		const permissions = new Permission({
			description
		});
		return permissions;
	}
}

export { Permission };
