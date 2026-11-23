import { showLog } from '../utils/logger.js';
import Fastify, { type FastifyInstance } from 'fastify';
import { setupRoutes } from '../routes/index.js';
import { Server } from 'socket.io';

export async function buildFastify(log: boolean = showLog()): Promise<FastifyInstance> {
	const prettyLogger = {
		transport: {
			target: 'pino-pretty',
			options: { translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
		},
	};

	const fastify = Fastify({
		logger: log ? prettyLogger : false,
	});

	const corsOrigin: string = process.env.CORS_ORIGIN + ':' + process.env.CORS_PORT;

	const io = new Server(fastify.server, {
		cors: { origin: corsOrigin },
	});

	io.on('connection', (socket) => {
		console.log('client connecté :', socket.id);
	});

	// Mise en place des routes
	await setupRoutes(fastify);

	return fastify;
}
