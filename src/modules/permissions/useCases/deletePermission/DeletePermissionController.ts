import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeletePermissionUseCase from './DeletePermissionUseCase';

export default class DeletePermissionController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deletePermission = container.resolve(DeletePermissionUseCase);

		const permission = await deletePermission.execute(id);

		return res.status(200).json(permission);
	}
}
