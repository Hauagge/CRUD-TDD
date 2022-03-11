/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Delete User Controller', () => {
	it('should be able to delete a new user', async () => {
		const permission = await request(app).post('/permissions').send({
			description: 'creater'
		});

		const response = await request(app).delete(`/permissions/${permission.body.id}`).send();

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id');
	});

	it('should not be able to delete a non-existing user', async () => {
		const response = await request(app).delete('/permissions/non-existing-id').send();
		expect(response.status).toBe(400);
	});
});
