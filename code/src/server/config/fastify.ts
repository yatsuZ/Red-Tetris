import { showLog } from '../utils/logger.js';
import Fastify, { type FastifyInstance } from 'fastify';
import { setupRoutes } from '../routes/index.js';
import { Server } from 'socket.io';

export async function buildFastify(): Promise<FastifyInstance> {
	const fastify = Fastify({
		logger: showLog(),
	});

  const chemin_client_requet_socket : string = process.env.CORS_ORIGIN + ":" + process.env.CORS_PORT;

  const io = new Server(fastify.server, {
    cors: { origin: chemin_client_requet_socket }
  });

  io.on('connection', (socket) => {
      console.log('client connecté :', socket.id);
  });

	// // Setup des routes
	await setupRoutes(fastify);

	return fastify;
}