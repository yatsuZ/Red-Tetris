import { showLog } from '../utils/logger.js';
import Fastify, { type FastifyInstance } from 'fastify';
import { setupRoutes } from '../routes/index.js';
import { Server } from 'socket.io';

export async function buildFastify(): Promise<FastifyInstance> {
	const fastify = Fastify({
		logger: showLog(),
	});

  const io = new Server(fastify.server);

  io.on('connection', (socket) => {
      console.log('client connecté :', socket.id);
  });

	// // Setup des routes
	await setupRoutes(fastify);

	return fastify;
}