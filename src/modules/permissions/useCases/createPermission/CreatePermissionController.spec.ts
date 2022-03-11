/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Permission Controller', () => {
	it('should be able to create a new permission', async () => {
		const response = await request(app).post('/permissions').send({
			description: 'creater'
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('id');
	});
});
