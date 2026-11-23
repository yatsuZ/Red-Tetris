import { afterEach, describe, vi } from 'vitest';
import { expect, it } from 'vitest';
import { Logger, showLog } from '../../src/server/utils/logger.js';

function test_all_Log() {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	// [méthode, préfixe attendu]
	it.each([
		['debug', '[DEBUG]'],
		['error', '[ERROR]'],
		['info', '[INFO]'],
		['server', '[SERVER]'],
		['success', '[OK]'],
		['warn', '[WARN]'],
	] as const)('%s affiche %s', (method, prefix) => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

		Logger[method]('TEST');

		expect(spy).toHaveBeenCalledTimes(1); // 1 seul log
		const args = spy.mock.calls[0]!; // arguments du 1er appel
		expect(args[0]).toContain(prefix); // bon préfixe
		expect(args[1]).toBe('TEST'); // message transmis tel quel
	});

	it('route affiche méthode + path', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

		Logger.route('GET', '/api');
		Logger.route('TRUC', '/x'); // méthode inconnue → branche chalk.white

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[0]![0]).toContain('[ROUTE]');
		expect(spy.mock.calls[0]![1]).toContain('GET');
		expect(spy.mock.calls[0]![2]).toBe('/api');
		expect(spy.mock.calls[1]![1]).toContain('TRUC');
	});
}

describe('logger', () => {
	it('are we in prod ?  ', () => {
		if (process.env.NODE_ENV === 'dev') expect(showLog()).toBeTruthy();
		else expect(showLog()).toBeFalsy();
	});
	describe('test All Logger (dev)', test_all_Log);
});
