import { Equipment } from '@modules/equipments/entities/Equipment';
import EquipamentRepositoryInMemory from '@modules/equipments/infra/repositories/in-memory/EquipmentRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import ShowEquipamentUseCase from './ShowEquipmentUseCase';

let showEquipmentUseCase: ShowEquipamentUseCase;
let equipmentRepositoryInMemory: EquipamentRepositoryInMemory;

let equipamentData: Equipment;
describe('Show Equipment', () => {
	beforeEach(() => {
		equipmentRepositoryInMemory = new EquipamentRepositoryInMemory();
		showEquipmentUseCase = new ShowEquipamentUseCase(equipmentRepositoryInMemory);
		equipamentData = {
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false,
			activated_date: new Date()
		};
	});

	it('Should be able to list a  new equipment', async () => {
		const equipmentCreated = await equipmentRepositoryInMemory.create(equipamentData);

		const equipment = await showEquipmentUseCase.execute(equipmentCreated.id);
		expect(equipment.code).toBe('1234');
		expect(equipment.firmware_version).toBe('1.0');
	});
	it('Should not be able to list a non existing equipment', async () => {
		await expect(showEquipmentUseCase.execute('equipament_id')).rejects.toBeInstanceOf(AppError);
	});
});
