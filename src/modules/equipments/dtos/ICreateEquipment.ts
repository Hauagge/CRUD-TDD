export interface ICreateEquipmentDTO {
	code: string;
	firmware_version: string;
	hardware_version: string;
	unusable: boolean;
	activated_date?: Date;
	fk_id_plan?: string;
}
