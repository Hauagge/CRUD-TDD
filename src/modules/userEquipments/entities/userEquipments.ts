class UserEquipment {
	id?: string;
	fk_id_role: string;
	fk_id_equipment: string;
	fk_id_user: string;
	deleted_at?: Date;

	private constructor({ fk_id_role, fk_id_equipment, fk_id_user }: UserEquipment) {
		return Object.assign(this, {
			fk_id_role,
			fk_id_equipment,
			fk_id_user
		});
	}

	static create({ fk_id_role, fk_id_equipment, fk_id_user }: UserEquipment) {
		const userEquipment = new UserEquipment({
			fk_id_role,
			fk_id_equipment,
			fk_id_user
		});
		return userEquipment;
	}
}

export { UserEquipment };
