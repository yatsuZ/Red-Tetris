import type { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export async function healthRoutes(fastify: FastifyInstance) {
	fastify.get('/health', async (_request, reply) => {
		reply.code(StatusCodes.OK);
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
		};
	});
}
