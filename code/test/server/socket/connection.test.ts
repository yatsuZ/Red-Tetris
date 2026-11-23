import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FastifyInstance } from 'fastify';
import type { AddressInfo } from 'node:net';
import { io as ioClient, type Socket } from 'socket.io-client';
import { buildFastify } from '../../../src/server/config/fastify.js';

describe('socket.io', () => {
	let app: FastifyInstance;
	let client: Socket | undefined;
	let url: string;

	beforeEach(async () => {
		app = await buildFastify();
		await app.listen({ port: 0, host: '127.0.0.1' }); // port 0 = port libre au hasard
		const { port } = app.server.address() as AddressInfo;
		url = `http://127.0.0.1:${port}`;
	});

	afterEach(async () => {
		client?.disconnect(); // d'abord le client…
		await app.close();    // …puis le serveur
		vi.restoreAllMocks();
	});

	it('accepte une connexion client', async () => {
		const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

		client = ioClient(url, { transports: ['websocket'], forceNew: true });

		await new Promise<void>((resolve, reject) => {
			client!.on('connect', () => resolve());
			client!.on('connect_error', reject);
		});

		expect(client.connected).toBe(true);
		expect(logSpy).toHaveBeenCalledWith('client connecté :', client.id);
	});
});
