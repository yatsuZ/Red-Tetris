import chalk from 'chalk';

export function showLog() {
	return process.env.NODE_ENV === 'dev';
}

export const Logger = {
	info: (...args: any[]) => {
		if (showLog()) console.log(chalk.blue('[INFO]'), ...args);
	},

	success: (...args: any[]) => {
		if (showLog()) console.log(chalk.green('[OK]'), ...args);
	},

	warn: (...args: any[]) => {
		if (showLog()) console.log(chalk.yellow('[WARN]'), ...args);
	},

	error: (...args: any[]) => {
		console.log(chalk.red('[ERROR]'), ...args);
	},

	debug: (...args: any[]) => {
		if (showLog()) console.log(chalk.gray('[DEBUG]'), ...args);
	},

	server: (message: string) => {
		console.log(chalk.magenta('[SERVER]'), message);
	},

	route: (method: string, path: string) => {
		const methodColor =
			{
				GET: chalk.green,
				POST: chalk.blue,
				PUT: chalk.yellow,
				DELETE: chalk.red,
				PATCH: chalk.cyan,
			}[method] || chalk.white;

		if (showLog()) console.log(chalk.gray('[ROUTE]'), methodColor(method.padEnd(6)), path);
	},
};
