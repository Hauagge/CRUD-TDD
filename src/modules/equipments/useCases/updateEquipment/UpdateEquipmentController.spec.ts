/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request, { Response } from 'supertest';

import { app } from '@shared/infra/http/app';

let equipment: Response;
describe('Update Equipment Controller', () => {
	beforeAll(async () => {
		equipment = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});
	});

	it('should be able to update an  equipament', async () => {
		const response = await request(app).put('/equipments').send({
			id: equipment.body.id,
			code: '1234',
			unusable: true
		});
		expect(response.status).toBe(201);
		expect(response.body.unusable).toEqual(true);
	});

	it("should not be able to update a  equipament's code to an existing one", async () => {
		const equipament2 = await request(app).post('/equipments').send({
			code: '12345',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});
		const response = await request(app).put('/equipments').send({
			id: equipament2.body.id,
			code: '1234'
		});
		expect(response.status).toBe(400);
	});

	it('should not be able to updade a non-existing equipament', async () => {
		const response = await request(app).put('/equipments').send({
			id: 'non-existing',
			code: '1234',
			unusable: true
		});

		expect(response.status).toBe(400);
	});
});
