import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionUseCase from './CreatePermissionUseCase';

export default class CreatePermissionController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { description } = req.body;

		const createPermissionUseCase = container.resolve(CreatePermissionUseCase);

		const permission = await createPermissionUseCase.execute(description);

		return res.status(200).json(permission);
	}
}
