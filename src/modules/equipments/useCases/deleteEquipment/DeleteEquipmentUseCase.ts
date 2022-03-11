import IEquipamentRepository from '@modules/equipments/infra/repositories/IEquipmentRepository';
import AppError from '@shared/errors/AppErrors';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteEquipamentUseCase {
	constructor(@inject('EquipmentRepository') private equipmentsRepository: IEquipamentRepository) {}
	async execute(id: string) {
		const equipament = await this.equipmentsRepository.findById(id);

		if (!equipament) {
			throw new AppError('Equipment does not exists');
		}

		equipament.deleted_at = new Date();

		await this.equipmentsRepository.delete(equipament);

		return equipament;
	}
}
