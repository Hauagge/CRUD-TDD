/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Show User Controller', () => {
	it('should be able to show profile user', async () => {
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

		const response = await request(app).get(`/users/${user.body.id}`).send();

		expect(response.status).toBe(201);
		expect(response.body.name).toEqual('Jhon Doe');
		expect(response.body.email).toEqual('jhondoe3@example.com');
	});

	it("should not be able to show a non-existing profile's user", async () => {
		const response = await request(app).get('/users/non-existing-id').send();
		expect(response.status).toBe(400);
	});
});
