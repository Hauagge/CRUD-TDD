/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Delete User Controller', () => {
	it('should be able to delete a new equipament', async () => {
		const equipament = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		const response = await request(app).delete(`/equipments/${equipament.body.id}`).send();

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});

	it('should not be able to delete a non-existing user', async () => {
		const response = await request(app).delete('/equipments/non-existing-id').send();
		expect(response.status).toBe(400);
	});
});
