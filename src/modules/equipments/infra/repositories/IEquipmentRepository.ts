import { Equipment } from '../../entities/Equipment';

export default interface IUserRepository {
	listAllEquipment(): Promise<Equipment[]>;
	findById(id: string): Promise<Equipment | undefined>;
	findByCode(code: string): Promise<Equipment | undefined>;
	create(equipment: Equipment): Promise<Equipment>;
	update(equipment: Equipment): Promise<Equipment>;
	delete(equipment: Equipment): Promise<Equipment>;
};
