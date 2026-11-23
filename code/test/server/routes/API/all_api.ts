import { describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { testGethealth } from './health/GET_health.js';

export function testAllApi(getApp: () => FastifyInstance) {
	describe('Test de toute les API', () => {
		testGethealth(() => getApp());
	});
}
