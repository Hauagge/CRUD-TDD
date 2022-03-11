import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { ICreateEquipmentDTO } from '@modules/equipments/dtos/ICreateEquipment';
import { Equipment } from '@modules/equipments/entities/Equipment';
import AppError from '@shared/errors/AppErrors';
import IEquipmentRepository from '@modules/equipments/infra/repositories/IEquipmentRepository';

@injectable()
export default class CreateEquipamentUseCase {
	constructor(@inject('EquipmentRepository') private equipamentRepository: IEquipmentRepository) {}
	async execute({ code, firmware_version, hardware_version, unusable }: ICreateEquipmentDTO) {
		const equipamentExist = await this.equipamentRepository.findByCode(code);

		if (equipamentExist) {
			throw new AppError('This equipament is already  registered');
		}

		const newEquipament = Equipment.create({
			code,
			firmware_version,
			hardware_version,
			unusable
		});
		const equipement = await this.equipamentRepository.create(newEquipament);

		return equipement;
	}
}
