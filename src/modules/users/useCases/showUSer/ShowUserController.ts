import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowUserUseCase from './ShowUserUseCase';

export default class ShowUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showUser = container.resolve(ShowUserUseCase);
		const user = await showUser.execute(id as string);

		return res.status(201).json(user);
	}
}
