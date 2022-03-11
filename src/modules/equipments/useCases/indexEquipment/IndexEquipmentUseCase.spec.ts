import { Equipment } from '@modules/equipments/entities/Equipment';
import EquipmentRepositoryInMemory from '@modules/equipments/infra/repositories/in-memory/EquipmentRepositoryInMemory';
import IndexEquipmentUseCase from './IndexEquipmentUseCase';

let listEquipamentUseCase: IndexEquipmentUseCase;
let equipamentRepositoryInMemory: EquipmentRepositoryInMemory;

let equipmentData: Equipment;
let equipmentData1: Equipment;
let equipmentData2: Equipment;

describe('List all equipments ', () => {
	beforeEach(() => {
		equipamentRepositoryInMemory = new EquipmentRepositoryInMemory();
		listEquipamentUseCase = new IndexEquipmentUseCase(equipamentRepositoryInMemory);
		equipmentData = {
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		};
		equipmentData1 = {
			code: '12347',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		};
		equipmentData2 = {
			code: '1238',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		};
	});

	it('Should be able to list a  all equipments user', async () => {
		const equipament = await equipamentRepositoryInMemory.create(equipmentData);
		const equipament1 = await equipamentRepositoryInMemory.create(equipmentData1);
		const equipament2 = await equipamentRepositoryInMemory.create(equipmentData2);

		const response = await listEquipamentUseCase.execute();
		expect(response).toEqual(
			expect.arrayContaining([
				{
					id: equipament.id,
					code: '1234',
					firmware_version: '1.0',
					hardware_version: '1.0',
					unusable: false
				},
				{
					id: equipament1.id,
					code: '12347',
					firmware_version: '1.0',
					hardware_version: '1.0',
					unusable: false
				},
				{
					id: equipament2.id,
					code: '1238',
					firmware_version: '1.0',
					hardware_version: '1.0',
					unusable: false
				}
			])
		);
	});
});
