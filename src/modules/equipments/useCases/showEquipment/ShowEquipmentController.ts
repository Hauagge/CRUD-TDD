import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowEquipamentUseCase from './ShowEquipmentUseCase';

export default class ShowUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showUser = container.resolve(ShowEquipamentUseCase);
		const equipament = await showUser.execute(id as string);

		return res.status(201).json(equipament);
	}
}
