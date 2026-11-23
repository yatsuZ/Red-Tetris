import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildFastify } from '../../../src/server/config/fastify.js';
import { testError404 } from './error/404.js';
import { testAllApi } from './api/api.js';

describe('buildFastify', () => {
	let app: FastifyInstance;

	it('test se construit avec le logger activé', async () => {
		const app2 = await buildFastify(true);
		await expect(app2.ready()).resolves.toBeDefined();
		await app2.close();
	});

	beforeEach(async () => {
		app = await buildFastify(false);
		await app.ready();
	});

	afterEach(async () => {
		await app.close();
	});

	it('crée une instance prête à l’emploi', () => {
		expect(app).toBeDefined();
	});

	testError404(() => app);

	testAllApi(() => app);
});
