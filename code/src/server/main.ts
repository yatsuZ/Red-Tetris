import chalk from 'chalk';
import { buildFastify } from './config/fastify.js';
import { Logger } from './utils/logger.js';


const PORT = parseInt(process.env.VITE_SERVER_PORT || '3000', 10);
const HOST = '0.0.0.0';

const start = async () => {
	console.log(chalk.magenta('\n========================================'));
	console.log(chalk.magenta('         SERVER STARTING...'));
	console.log(chalk.magenta('========================================\n'));

	try {
		const fastify = await buildFastify();

		await fastify.listen({ port: PORT, host: HOST });

		console.log(chalk.green('\n========================================'));
		console.log(chalk.green('         SERVER READY'));
		console.log(chalk.green('========================================'));
		console.log(chalk.cyan(`\n  Local:   http://localhost:${PORT}`));
		console.log(chalk.cyan(`  API:     http://localhost:${PORT}/api/health\n`));

		Logger.success('Fastify server running');
	} catch (err) {
		Logger.error('Failed to start server:', err);
		process.exit(1);
	}
};

start();

// Rapelle 
/*
  main.ts — Incohérence

  Tu as Logger pour logger, mais le banner de démarrage utilise console.log(chalk.*) directement. Soit tu gardes le banner en chalk brut (acceptable pour le style visuel), soit tu passes tout par Logger. Mélanger les deux
  c'est inconsistant.

  ---
  fastify.ts — Risque env vars

  const chemin_client_requet_socket = process.env.CORS_ORIGIN + ":" + process.env.CORS_PORT;

  Si CORS_ORIGIN ou CORS_PORT ne sont pas définis, tu obtiens "undefined:undefined" sans aucune erreur. Même problème dans client/socket.ts. À surveiller quand tu intègreras le vrai environnement.
  */