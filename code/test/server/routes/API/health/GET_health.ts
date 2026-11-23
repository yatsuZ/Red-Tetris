import { expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';

export function testGethealth(getApp: () => FastifyInstance) {
	it('GET /api/health répond 200 avec status, timestamp et uptime', async () => {
		const res = await getApp().inject({ method: 'GET', url: '/api/health' });

		expect(res.statusCode).toBe(200);

		const body = res.json();
		expect(body.status).toBe('ok');
		expect(typeof body.uptime).toBe('number');
		expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp); // ISO valide
	});
}
