/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request, { Response } from 'supertest';

import { app } from '@shared/infra/http/app';

let equipment: Response;
describe('Update Permission Controller', () => {
	beforeAll(async () => {
		equipment = await request(app).post('/permissions').send({
			description: 'creater'
		});
	});

	it('should be able to update an  permission', async () => {
		const response = await request(app).put('/permissions').send({
			id: equipment.body.id,
			description: 'reader'
		});
		expect(response.status).toBe(201);
		expect(response.body.description).toEqual('reader');
	});

	it('should not be able to updade a non-existing permission', async () => {
		const response = await request(app).put('/permissions').send({
			id: 'non-existing',
			description: 'reader'
		});

		expect(response.status).toBe(400);
	});
});
