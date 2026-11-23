import { describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { testGetHealth } from './health/getHealth.js';

export function testAllApi(getApp: () => FastifyInstance) {
	describe('Test de toutes les API', () => {
		testGetHealth(() => getApp());
	});
}
