import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import IEquipmentRepository from '../../infra/repositories/IEquipmentRepository';
import AppError from '../../../../shared/errors/AppErrors';
interface IUpdateEquipment {
	id: string;
	code: string;
	firmware_version?: string;
	hardware_version?: string;
	unusable?: boolean;
	activated_date?: Date;
	fk_id_plan?: string;
}
@injectable()
export default class UpdateUserUseCase {
	constructor(@inject('EquipmentRepository') private equipmentRepository: IEquipmentRepository) {}
	async execute({
		id,
		code,
		firmware_version,
		hardware_version,
		unusable,
		activated_date,
		fk_id_plan
	}: IUpdateEquipment) {
		console.log(id);
		const equipmentUpdated = await this.equipmentRepository.findById(id);

		if (!equipmentUpdated) {
			throw new AppError('Equipment does not exist');
		}

		const existCode = await this.equipmentRepository.findByCode(code);

		if (existCode && existCode.id !== id) {
			throw new AppError("This equipment's code is already registred");
		}
		equipmentUpdated.code = code ? code : equipmentUpdated.code;
		equipmentUpdated.firmware_version = firmware_version ? firmware_version : equipmentUpdated.firmware_version;
		equipmentUpdated.hardware_version = hardware_version ? hardware_version : equipmentUpdated.hardware_version;
		equipmentUpdated.unusable = unusable ? unusable : equipmentUpdated.unusable;
		equipmentUpdated.activated_date = activated_date ? activated_date : equipmentUpdated.activated_date;
		equipmentUpdated.fk_id_plan = fk_id_plan ? fk_id_plan : equipmentUpdated.fk_id_plan;

		const equipment = await this.equipmentRepository.update(equipmentUpdated);

		return equipment;
	}
}
