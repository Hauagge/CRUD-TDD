import { Equipment } from '@modules/equipments/entities/Equipment';
import EquipmentRepositoryInMemory from '@modules/equipments/infra/repositories/in-memory/EquipmentRepositoryInMemory';
import AppError from '@shared/errors/AppErrors';
import UpdateEquipmentUseCase from './UpdateEquipmentUseCase';

let updateEquipmentUseCase: UpdateEquipmentUseCase;
let equipmentRepositoryInMemory: EquipmentRepositoryInMemory;

let equipament: Equipment;

describe('Update Equipment', () => {
	beforeEach(async () => {
		equipmentRepositoryInMemory = new EquipmentRepositoryInMemory();
		updateEquipmentUseCase = new UpdateEquipmentUseCase(equipmentRepositoryInMemory);

		const equipmentData = {
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false,
			activated_date: new Date(),
			fk_id_plan: 'free'
		};
		equipament = await equipmentRepositoryInMemory.create(equipmentData);
	});

	it('Should be able to update  a  equipment', async () => {
		const equipmentUpdated: Equipment = await updateEquipmentUseCase.execute({
			id: equipament.id,
			code: '1234567',
			firmware_version: '2.0',
			hardware_version: '3.0',
			unusable: false,
			activated_date: new Date(),
			fk_id_plan: 'premium'
		});

		expect(equipmentUpdated.code).toBe('1234567');
		expect(equipmentUpdated.firmware_version).toBe('2.0');
		expect(equipmentUpdated.hardware_version).toBe('3.0');
		expect(equipmentUpdated.fk_id_plan).toBe('premium');
	});

	it('should not be able to update a non-existing equipment', async () => {
		await expect(
			updateEquipmentUseCase.execute({
				id: 'non-existing-id',
				code: '1234567',
				firmware_version: '2.0',
				hardware_version: '3.0',
				unusable: false,
				activated_date: new Date()
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update equipment's code to an  existing one", async () => {
		const equipment2 = await equipmentRepositoryInMemory.create({
			code: '12347',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false,
			fk_id_plan: 'free'
		});
		await expect(
			updateEquipmentUseCase.execute({
				id: equipment2.id,
				code: '1234',
				firmware_version: '2.0',
				hardware_version: '3.0',
				unusable: false,
				activated_date: new Date()
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it("should  be able to update equipment's unuable field", async () => {
		const response = await updateEquipmentUseCase.execute({
			id: equipament.id,
			code: '1234',
			unusable: true
		});

		expect(response.unusable).toBe(true);
	});

	it("should  be able to update equipment's activated_date field", async () => {
		const newDate = new Date(2022, 3, 7, 0, 0, 0, 0);
		jest.spyOn<any, any>(global, 'Date').mockImplementationOnce(() => {
			return new Date(newDate);
		});
		const response = await updateEquipmentUseCase.execute({
			id: equipament.id,
			code: '1234',
			activated_date: new Date()
		});

		expect(response.activated_date).toEqual(new Date());
	});
});
