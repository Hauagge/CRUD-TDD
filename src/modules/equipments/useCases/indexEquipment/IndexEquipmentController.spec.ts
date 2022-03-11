/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('List All Equipments Controller', () => {
	it('should be able to list all equipements', async () => {
		const equipament = await request(app).post('/equipments').send({
			code: '1234',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		const equipament1 = await request(app).post('/equipments').send({
			code: '12343',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		const equipament2 = await request(app).post('/equipments').send({
			code: '12347',
			firmware_version: '1.0',
			hardware_version: '1.0',
			unusable: false
		});

		const response = await request(app).get('/equipments').send();

		expect(response.status).toBe(201);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: equipament.body.id,
					code: equipament.body.code,
					firmware_version: equipament.body.firmware_version,
					hardware_version: equipament.body.hardware_version,
					unusable: false,
					activated_date: null,
					created_at: equipament.body.created_at,
					updated_at: equipament.body.updated_at,
					deleted_at: null,
					fk_id_plan: null
				},
				{
					id: equipament1.body.id,
					code: equipament1.body.code,
					firmware_version: equipament1.body.firmware_version,
					hardware_version: equipament1.body.hardware_version,
					unusable: false,
					activated_date: null,
					created_at: equipament1.body.created_at,
					updated_at: equipament1.body.updated_at,
					deleted_at: null,
					fk_id_plan: null
				},
				{
					id: equipament2.body.id,
					code: equipament2.body.code,
					firmware_version: equipament2.body.firmware_version,
					hardware_version: equipament2.body.hardware_version,
					unusable: false,
					activated_date: null,
					created_at: equipament2.body.created_at,
					updated_at: equipament2.body.updated_at,
					deleted_at: null,
					fk_id_plan: null
				}
			])
		);
	});
});
