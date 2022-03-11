/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Equipament Controller', () => {
	it('should be able to create a new equipament', async () => {
		const response = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		console.log(response.body);
		expect(response.status).toBe(201);
	});

	it('should not be able to create a equipament with an existing code', async () => {
		const response = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});
		expect(response.status).toBe(400);
	});
});
