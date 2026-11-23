import { expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';

export function testError404(getApp: () => FastifyInstance) {
	it('une route PATH inconnue renvoie 404', async () => {
		const res = await getApp().inject({ method: 'GET', url: '/trucmachinbidule' });
		expect(res.statusCode).toBe(404);

		const body = res.json();

		expect(body.error).toBe('Path not found');
	});
	it('une route API inconnue renvoie 404', async () => {
		const res = await getApp().inject({ method: 'GET', url: '/api/faisQuelqueChose' });
		expect(res.statusCode).toBe(404);

		const body = res.json();

		expect(body.error).toBe('API endpoint not found');
	});
}
