import { prisma } from '@config/prisma/prismaClient';
import IUserEquipment from '../IUserEquipment';
import { UserEquipment } from '@modules/userEquipments/entities/userEquipments';

export class UserEquipmentRepository implements IUserEquipment {
	async findById(id: string): Promise<UserEquipment | undefined> {
		const userEquipment = await prisma.userEquipment.findUnique({
			where: {
				id
			}
		});
		return userEquipment;
	}
	async create({
		fk_id_role,
		fk_id_equipment,
		fk_id_user
	}: Omit<UserEquipment, 'deleted_at'>): Promise<UserEquipment> {
		const equipment = await prisma.userEquipment.create({
			data: {
				fk_id_role,
				fk_id_equipment,
				fk_id_user
			}
		});
		return equipment;
	}
	async update(userEquipment: UserEquipment): Promise<UserEquipment> {
		const equipmentUpdated = await prisma.userEquipment.update({
			where: {
				id: userEquipment.id
			},
			data: {
				fk_id_role: userEquipment.fk_id_role,
				fk_id_equipment: userEquipment.fk_id_equipment,
				fk_id_user: userEquipment.fk_id_user
			}
		});

		return equipmentUpdated;
	}
	async delete(equipament: UserEquipment): Promise<UserEquipment> {
		const equipmentUpdated = await prisma.userEquipment.update({
			where: {
				id: equipament.id
			},
			data: {
				deleted_at: new Date()
			}
		});

		return equipmentUpdated;
	}

	async findByUserId(fk_id_user: string): Promise<UserEquipment[] | undefined> {
		const userEquipment = await prisma.userEquipment.findMany({
			where: {
				fk_id_user
			}
		});
		return userEquipment;
	}
	async findByEquipmentId(fk_id_equipment: string): Promise<UserEquipment | undefined> {
		const userEquipment = await prisma.userEquipment.findUnique({
			where: {
				fk_id_equipment
			}
		});
		return userEquipment;
	}

	async listAllUserEquipments(): Promise<UserEquipment[]> {
		const equipments = await prisma.userEquipment.findMany();
		return equipments;
	}
}
