import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const {
			name,
			email,
			password,
			avatar,
			code_post,
			country,
			state,
			city,
			district,
			street,
			number,
			complement,
			document_type,
			document_number,
			userType,
			deleted_at
		} = req.body;
		const createUserUserCase = container.resolve(CreateUserUseCase);

		const user = await createUserUserCase.execute({
			email,
			name,
			password,
			avatar,
			code_post,
			country,
			state,
			city,
			district,
			street,
			number,
			complement,
			document_type,
			document_number,
			userType,
			deleted_at
		});

		return res.status(201).json(user);
	}
}
