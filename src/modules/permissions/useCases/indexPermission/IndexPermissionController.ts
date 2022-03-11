import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IndexPermissionUseCase from './IndexPermissionUseCase';

export default class IndexPermissionController {
	async handle(req: Request, res: Response): Promise<Response> {
		const indexPermissionUseCase = container.resolve(IndexPermissionUseCase);

		const permission = await indexPermissionUseCase.execute();

		return res.status(200).json(permission);
	}
}
