/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Show Equipament Controller', () => {
	it('should be able to show profile user', async () => {
		const equipament = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		const response = await request(app).get(`/equipments/${equipament.body.id}`).send();

		expect(response.status).toBe(201);
		expect(response.body.code).toEqual('1234');
		expect(response.body.firmware_version).toEqual('1.0');
		expect(response.body.hardware_version).toEqual('1.0');
		expect(response.body.unusable).toEqual(false);
	});

	it('should not be able to show a non-existing equipment', async () => {
		const response = await request(app).get('/equipments/non-existing-id').send();
		expect(response.status).toBe(404);
	});
});
