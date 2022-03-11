/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Show Equipament Controller', () => {
	it('should be able to show profile user', async () => {
		const permission = await request(app).post('/permissions').send({
			description: 'creater'
		});

		const response = await request(app).get(`/permissions/${permission.body.id}`).send();

		expect(response.status).toBe(200);
		expect(response.body.description).toEqual('creater');
	});

	it('should not be able to show a non-existing equipment', async () => {
		const response = await request(app).get('/permissions/non-existing-id').send();
		expect(response.status).toBe(400);
	});
});
