import { prisma } from '@config/prisma/prismaClient';
import IEquipmentRepository from '../IEquipmentRepository';
import { Equipment } from '@modules/equipments/entities/Equipment';

export class EquipmentRepository implements IEquipmentRepository {
	async listAllEquipment(): Promise<Equipment[]> {
		const equipments = await prisma.equipment.findMany();
		return equipments;
	}
	async findById(id: string): Promise<Equipment | undefined> {
		const equipment = await prisma.equipment.findUnique({
			where: {
				id
			}
		});
		return equipment;
	}
	async create({ code, firmware_version, hardware_version, unusable }: Equipment): Promise<Equipment> {
		const equipment = await prisma.equipment.create({
			data: {
				code,
				firmware_version,
				hardware_version,
				unusable
			}
		});
		return equipment;
	}
	async update(equipment: Equipment): Promise<Equipment> {
		const equipmentUpdated = await prisma.equipment.update({
			where: {
				id: equipment.id
			},
			data: {
				code: equipment.code,
				firmware_version: equipment.firmware_version,
				hardware_version: equipment.hardware_version,
				unusable: equipment.unusable,
				activated_date: equipment.activated_date,
				fk_id_plan: equipment.fk_id_plan
			}
		});

		return equipmentUpdated;
	}
	async delete(equipament: Equipment): Promise<Equipment> {
		const equipmentUpdated = await prisma.equipment.update({
			where: {
				id: equipament.id
			},
			data: {
				deleted_at: new Date()
			}
		});

		return equipmentUpdated;
	}
	async findByCode(code: string): Promise<Equipment | undefined> {
		const result = await prisma.equipment.findFirst({
			where: { code }
		});
		return result;
	}
}
