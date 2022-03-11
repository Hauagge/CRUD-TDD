import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEquipamentUseCase from './IndexEquipmentUseCase';

export default class ShowUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listEquipments = container.resolve(IndexEquipamentUseCase);
		const equipament = await listEquipments.execute();

		return res.status(201).json(equipament);
	}
}
