import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdatePermissionUseCase from './UpdatePermissionUseCase';

export default class UpdatePermissionController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id, description } = req.body;

		const updatePermission = container.resolve(UpdatePermissionUseCase);

		const permission = await updatePermission.execute({
			id,
			description
		});

		return res.status(201).json(permission);
	}
}
