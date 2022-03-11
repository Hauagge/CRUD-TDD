import { UserEquipment } from '@modules/userEquipments/entities/userEquipments';
import { v4 as uuid } from 'uuid';
import IUserEquipment from '../IUserEquipment';

export default class UserEquipmentRepositoryInMemory implements IUserEquipment {
	userEquipments: UserEquipment[] = [];

	async findById(id: string): Promise<UserEquipment | undefined> {
		const userEquipment = this.userEquipments.find((relationUserEquipament) => relationUserEquipament.id === id);
		return userEquipment;
	}

	async create(userEquipment: UserEquipment): Promise<UserEquipment> {
		Object.assign(userEquipment, {
			id: uuid()
		});
		this.userEquipments.push(userEquipment);
		return userEquipment;
	}

	async update(userEquipment: UserEquipment): Promise<UserEquipment> {
		const findIndex = this.userEquipments.findIndex(
			(findUserEquipment) => findUserEquipment.id === userEquipment.id
		);

		this.userEquipments[findIndex] = userEquipment;

		return userEquipment;
	}
	async delete(userEquipment: UserEquipment): Promise<UserEquipment> {
		const findIndex = this.userEquipments.findIndex(
			(findUserEquipment) => findUserEquipment.id === userEquipment.id
		);

		this.userEquipments[findIndex].deleted_at = new Date();

		return userEquipment;
	}

	async findByUserId(fk_id_user: string): Promise<UserEquipment[] | undefined> {
		const userEquipment = this.userEquipments.filter(
			(relationUserEquipament) => relationUserEquipament.fk_id_user === fk_id_user
		);
		return userEquipment;
	}
	async findByEquipmentId(fk_id_equipment: string): Promise<UserEquipment> {
		const userEquipment = this.userEquipments.find(
			(relationUserEquipament) => relationUserEquipament.fk_id_equipment === fk_id_equipment
		);
		return userEquipment;
	}

	async listAllUserEquipments(): Promise<UserEquipment[]> {
		const all = this.userEquipments;
		return all;
	}
}

export { UserEquipmentRepositoryInMemory };
