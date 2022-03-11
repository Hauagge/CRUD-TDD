import { Equipment } from '@modules/equipments/entities/Equipment';
import EquipmentRepositoryInMemory from '@modules/equipments/infra/repositories/in-memory/EquipmentRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import DeleteEquipamentUseCase from './DeleteEquipmentUseCase';

let deleteEquipmentCase: DeleteEquipamentUseCase;
let equipmentRepositoryInMemory: EquipmentRepositoryInMemory;

let equipmentData: Equipment;
describe('Create an equipament', () => {
	beforeEach(() => {
		equipmentRepositoryInMemory = new EquipmentRepositoryInMemory();

		deleteEquipmentCase = new DeleteEquipamentUseCase(equipmentRepositoryInMemory);

		equipmentData = {
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false,
			activated_date: new Date(),
			fk_id_plan: 'free'
		};
	});

	it('Should be able to delete an user', async () => {
		const newDate = new Date(2022, 3, 7, 0, 0, 0, 0);
		const user = await equipmentRepositoryInMemory.create(equipmentData);
		jest.spyOn<any, any>(global, 'Date').mockImplementationOnce(() => {
			return new Date(newDate);
		});
		const userDeleted = await deleteEquipmentCase.execute(user.id);

		expect(userDeleted.deleted_at).toEqual(new Date());
	});

	it('should not be able to delete a non-existing user ', async () => {
		await expect(deleteEquipmentCase.execute('id-not-exist')).rejects.toEqual(
			new AppError('Equipment does not exists')
		);
	});
});
