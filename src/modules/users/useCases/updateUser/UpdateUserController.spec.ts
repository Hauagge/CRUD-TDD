/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request, { Response } from 'supertest';

import { app } from '@shared/infra/http/app';
let user: Response;
describe('UpdateUser Controller', () => {
	it('should be able to update a new user', async () => {
		user = await request(app).post('/users').send({
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

		const response = await request(app).put('/users').send({
			user_id: user.body.id,
			email: 'jhontre@example.com',
			name: 'Jhon Tre',
			code_post: '45678912',
			country: 'teste1',
			state: 'teste1',
			city: 'teste1',
			street: 'Rua do trampo',
			district: 'teste1',
			number: 'teste1',
			document_type: user.body.document_type,
			document_number: user.body.document_number,
			userType: user.body.userType
		});
		expect(response.status).toBe(201);
		expect(response.body.email).toEqual('jhontre@example.com');
		expect(response.body.name).toEqual('Jhon Tre');
		expect(response.body.code_post).toEqual('45678912');
		expect(response.body.country).toEqual('teste1');
	});

	it('should not be able to update a user email with an existing email', async () => {
		const user1 = await request(app).post('/users').send({
			name: 'Jhon Doe2',
			email: 'jhondoe@example.com',
			password: '1234564',
			code_post: '32188821',
			country: 'pais-teste1',
			state: 'estado-teste1',
			city: 'cidade-teste1',
			street: 'Rua de teste1',
			district: 'bairro-teste1',
			number: 'numero-teste1',
			document_type: 'teste1',
			document_number: '1234561',
			userType: 'Blabla1',
			privice_police: false,
			terms_user: false,
			email_confirmed: false,
			isAdmin: false
		});

		const response = await request(app).put('/users').send({
			user_id: user1.body.id,
			email: 'jhontre@example.com'
		});
		expect(response.status).toBe(400);
	});

	it('should not be able to update a non-existing user', async () => {
		const response = await request(app).put('/users').send({
			user_id: 'non-existing-id',
			email: 'jhondoe3@example.com'
		});
		expect(response.status).toBe(400);
	});

	it('should be able to update the password', async () => {
		const response = await request(app).put('/users').send({
			user_id: user.body.id,
			email: 'jhondoe2@example.com',
			old_password: '123456',
			password: '123123'
		});
		expect(response.status).toBe(201);
	});

	it('should not be able to update the password without old password', async () => {
		const response = await request(app).put('/users').send({
			user_id: user.body.id,
			email: 'jhondoe1@example.com',
			password: '123123'
		});
		expect(response.status).toBe(400);
	});

	it('should not be able to update the password with wrong old password', async () => {
		const response = await request(app).put('/users').send({
			user_id: user.body.id,
			email: 'jhondoe1@example.com',
			old_password: '123456',
			password: '123123'
		});
		expect(response.status).toBe(400);
	});
});
