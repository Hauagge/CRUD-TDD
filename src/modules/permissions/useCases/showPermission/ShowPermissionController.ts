import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowPermissionUseCase from './ShowPermissionUseCase';

export default class ShowPermissionController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showPermissionUseCase = container.resolve(ShowPermissionUseCase);

		const permission = await showPermissionUseCase.execute(id);

		return res.status(200).json(permission);
	}
}
