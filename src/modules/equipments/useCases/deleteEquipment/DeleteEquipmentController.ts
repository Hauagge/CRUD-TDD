import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteEquipmentUseCase from './DeleteEquipmentUseCase';

export default class DeleteserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deleteEquipament = container.resolve(DeleteEquipmentUseCase);
		const equipament = await deleteEquipament.execute(id as string);

		return res.status(201).json(equipament);
	}
}
