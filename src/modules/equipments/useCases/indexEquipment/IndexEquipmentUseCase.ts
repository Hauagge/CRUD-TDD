import 'reflect-metadata';
import IEquipamentRepository from '@modules/equipments/infra/repositories/IEquipmentRepository';
import AppError from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ShowUserUseCase {
	constructor(@inject('EquipmentRepository') private equipmentsRepository: IEquipamentRepository) {}
	async execute() {
		const equipment = await this.equipmentsRepository.listAllEquipment();

		if (!equipment) {
			throw new AppError("There's no equipament registred");
		}

		return equipment;
	}
}
