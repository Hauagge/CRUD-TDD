/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Delete User Controller', () => {
	it('should be able to delete a new user', async () => {
		const user = await request(app).post('/users').send({
			name: 'Jhon Doe',
			email: 'jhondoe3@example.com',
			password: '123456',
			code_post: '88888888',
			country: 'pais-teste',
			state: 'estado-teste',
			city: 'cidade-teste',
			street: 'Rua de teste',
			district: 'bairro-teste',
			number: 'numero-teste',
			document_type: 'teste',
			document_number: '123456',
			userType: 'Blabla',
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		});

		const response = await request(app).delete(`/users/${user.body.id}`).send();

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});

	it('should not be able to delete a non-existing user', async () => {
		const response = await request(app).delete('/users/non-existing-id').send();
		expect(response.status).toBe(400);
	});
});
