import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEquipmentUseCase from './CreateEquipmentUseCase';

export default class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { code, firmware_version, hardware_version, unusable, activated_date, fk_id_plan } = req.body;
		const createUserUserCase = container.resolve(CreateEquipmentUseCase);

		const equipament = await createUserUserCase.execute({
			code,
			firmware_version,
			hardware_version,
			unusable
		});

		return res.status(201).json(equipament);
	}
}
