import { UserEquipment } from '../../entities/userEquipments';

export default interface IUserRepository {
	listAllUserEquipments(): Promise<UserEquipment[]>;
	findById(id: string): Promise<UserEquipment | undefined>;
	findByUserId(fk_id_user: string): Promise<UserEquipment[] | undefined>;
	findByEquipmentId(fk_id_equipment: string): Promise<UserEquipment | undefined>;
	create(user: UserEquipment): Promise<UserEquipment>;
	update(user: UserEquipment): Promise<UserEquipment>;
	delete(user: UserEquipment): Promise<UserEquipment>;
};
