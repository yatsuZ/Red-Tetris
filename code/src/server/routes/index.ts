import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './api/health.js';
import { StatusCodes } from 'http-status-codes';

export async function setupRoutes(fastify: FastifyInstance) {
	// Routes API
	await fastify.register(healthRoutes, { prefix: '/api' });

	// Route principale
	// fastify.get('/', async (request, reply) => {
	// 	return reply.view('index.ejs');
	// });

	// 404 handler
	fastify.setNotFoundHandler(async (request, reply) => {
		if (request.url.startsWith('/api/')) {
			return reply.code(StatusCodes.NOT_FOUND).send({ error: 'API endpoint not found' });
		}
		return reply.code(StatusCodes.NOT_FOUND).send({ error: 'Path not found' });
	});
}
