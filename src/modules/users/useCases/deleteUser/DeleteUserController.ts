import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteUserUseCase from './DeleteUserUseCase';

export default class DeleteserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deleteUser = container.resolve(DeleteUserUseCase);
		const user = await deleteUser.execute(id as string);

		return res.status(201).json(user);
	}
}
