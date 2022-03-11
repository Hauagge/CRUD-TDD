/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('List All Permissions Controller', () => {
	it('should be able to list all permissions', async () => {
		const permissions = await request(app).post('/permissions').send({
			description: 'creater'
		});

		const permissions1 = await request(app).post('/permissions').send({
			description: 'reader'
		});

		const permissions2 = await request(app).post('/permissions').send({
			description: 'updater'
		});

		const response = await request(app).get('/permissions').send();

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: permissions.body.id,
					description: permissions.body.description,
					created_at: permissions.body.created_at,
					updated_at: permissions.body.updated_at,
					deleted_at: null
				},
				{
					id: permissions1.body.id,
					description: permissions1.body.description,
					created_at: permissions1.body.created_at,
					updated_at: permissions1.body.updated_at,
					deleted_at: null
				},
				{
					id: permissions2.body.id,
					description: permissions2.body.description,
					created_at: permissions2.body.created_at,
					updated_at: permissions2.body.updated_at,
					deleted_at: null
				}
			])
		);
	});
});
