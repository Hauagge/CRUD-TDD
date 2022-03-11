/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request, { Response } from 'supertest';

import { app } from '@shared/infra/http/app';
let user: Response;
describe('Authenticate User Controller', () => {
	beforeAll(async () => {
		user = await request(app).post('/users').send({
			name: 'Jhon Doe',
			email: 'jhondoe@example.com',
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
	});
	it('should be able to authenticate an user', async () => {
		const response = await request(app).post('/sessions').send({
			email: user.body.email,
			password: '123456'
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
	});

	it('should  not be able to authenticate with wrong e-mail', async () => {
		const response = await request(app).post('/sessions').send({
			email: 'no-existing-email',
			password: '123456'
		});

		expect(response.status).toBe(400);
	});
	it('should  not be able to authenticate with wrong password', async () => {
		const response = await request(app).post('/sessions').send({
			email: user.body.email,
			password: '123123'
		});

		expect(response.status).toBe(400);
	});
});
