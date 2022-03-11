class Equipment {
	id?: string;
	code: string;
	firmware_version: string;
	hardware_version: string;
	unusable: boolean;
	activated_date?: Date;
	fk_id_plan?: string;
	deleted_at?: Date;

	private constructor({ code, firmware_version, hardware_version, unusable }: Equipment) {
		return Object.assign(this, {
			code,
			firmware_version,
			hardware_version,
			unusable
		});
	}

	static create({ code, firmware_version, hardware_version, unusable }: Equipment) {
		const equipment = new Equipment({
			code,
			firmware_version,
			hardware_version,
			unusable
		});
		return equipment;
	}
}

export { Equipment };
