import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserUseCase from './UpdateUserUseCase';

export default class UpdateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const {
			user_id,
			name,
			email,
			password,
			old_password,
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
			userType
		} = req.body;
		const updateUserUserCase = container.resolve(UpdateUserUseCase);
		const user = await updateUserUserCase.execute({
			user_id,
			email,
			name,
			password,
			old_password,
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
			userType
		});

		return res.status(201).json(user);
	}
}
