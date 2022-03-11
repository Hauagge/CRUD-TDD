import { Equipment } from '@modules/equipments/entities/Equipment';
import { v4 as uuid } from 'uuid';
import IEquipmentRepository from '../IEquipmentRepository';

export default class EquipmentRepositoryInMemory implements IEquipmentRepository {
	equipments: Equipment[] = [];

	async listAllEquipment(): Promise<Equipment[]> {
		return this.equipments;
	}
	async findById(id: string): Promise<Equipment> {
		const equipment = this.equipments.find((findEquipment) => findEquipment.id === id);
		return equipment;
	}
	async create(equipament: Equipment): Promise<Equipment> {
		Object.assign(equipament, {
			id: uuid()
		});
		this.equipments.push(equipament);
		return equipament;
	}
	async update(equipment: Equipment): Promise<Equipment> {
		const findIndex = this.equipments.findIndex((findUser) => findUser.id === equipment.id);

		this.equipments[findIndex] = equipment;

		return equipment;
	}
	async delete(equipment: Equipment): Promise<Equipment> {
		const findIndex = this.equipments.findIndex((findEquipment) => findEquipment.id === equipment.id);

		this.equipments[findIndex].deleted_at = new Date();

		return equipment;
	}
	async findByCode(code: string): Promise<Equipment> {
		const equipment = this.equipments.find((equipment) => equipment.code === code);

		return equipment;
	}
}
