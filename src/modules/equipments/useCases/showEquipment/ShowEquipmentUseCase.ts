import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IEquipmentRepository from '@modules/equipments/infra/repositories/IEquipmentRepository';
import AppError from '@shared/errors/AppErrors';

@injectable()
export default class ShowUserUseCase {
	constructor(@inject('EquipmentRepository') private equipmentsRepository: IEquipmentRepository) {}
	async execute(id: string) {
		const equipament = await this.equipmentsRepository.findById(id);

		if (!equipament) {
			throw new AppError('Equipment does not exists');
		}

		return equipament;
	}
}
