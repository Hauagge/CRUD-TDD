import { Equipment } from '@modules/equipments/entities/Equipment';
import EquipamentRepositoryInMemory from '@modules/equipments/infra/repositories/in-memory/EquipmentRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import CreateEquipmentUseCase from './CreateEquipmentUseCase';

let createEquipmentUseCase: CreateEquipmentUseCase;
let equipmentRepositoryInMemory: EquipamentRepositoryInMemory;

let equipmentData: Equipment;
describe('Create User', () => {
	beforeEach(() => {
		equipmentRepositoryInMemory = new EquipamentRepositoryInMemory();

		createEquipmentUseCase = new CreateEquipmentUseCase(equipmentRepositoryInMemory);

		equipmentData = {
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		};
	});

	it('Should notbe able to create a  new equipament', async () => {
		const equipament = await createEquipmentUseCase.execute(equipmentData);

		expect(equipament).toHaveProperty('id');
		expect(equipament.code).toBe('1234');
		expect(equipament.firmware_version).toBe('1.0');
	});

	it('should not be able to create a equipemnt with an existing code', async () => {
		await createEquipmentUseCase.execute(equipmentData);

		await expect(createEquipmentUseCase.execute(equipmentData)).rejects.toEqual(
			new AppError('This equipament is already  registered')
		);
	});
});
