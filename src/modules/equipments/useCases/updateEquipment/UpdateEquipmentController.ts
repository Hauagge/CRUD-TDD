import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateEquipmentUseCase from './UpdateEquipmentUseCase';

export default class UpdateEquipmentController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id, code, firmware_version, hardware_version, unusable, activated_date, fk_id_plan } = req.body;
		const updateEquipmentCase = container.resolve(UpdateEquipmentUseCase);
		const equipment = await updateEquipmentCase.execute({
			id,
			code,
			firmware_version,
			hardware_version,
			unusable,
			activated_date,
			fk_id_plan
		});
		console.log(id);
		return res.status(201).json(equipment);
	}
}
