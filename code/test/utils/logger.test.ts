import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Logger, showLog } from '../../src/server/utils/logger.js';

function testAllLog(shouldLog: boolean) {
	it.each([
		// [méthode, préfixe, logue aussi en prod ?]
		['debug', '[DEBUG]', false],
		['error', '[ERROR]', true],
		['info', '[INFO]', false],
		['server', '[SERVER]', true],
		['success', '[OK]', false],
		['warn', '[WARN]', false],
	] as const)('%s affiche %s', (method, prefix, alwaysLog) => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		Logger[method]('TEST');

		if (!shouldLog && !alwaysLog) return expect(spy).not.toHaveBeenCalled();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0]![0]).toContain(prefix);
		expect(spy.mock.calls[0]![1]).toBe('TEST');
	});

	it('route affiche méthode + path', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		Logger.route('GET', '/api');
		Logger.route('TRUC', '/x');

		if (!shouldLog) return expect(spy).not.toHaveBeenCalled();

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy.mock.calls[0]![0]).toContain('[ROUTE]');
		expect(spy.mock.calls[0]![1]).toContain('GET');
		expect(spy.mock.calls[0]![2]).toBe('/api');
		expect(spy.mock.calls[1]![1]).toContain('TRUC');
	});
}

afterEach(() => {
	vi.unstubAllEnvs();
	vi.restoreAllMocks();
});

describe('logger en dev', () => {
	beforeEach(() => vi.stubEnv('NODE_ENV', 'dev'));
	it('showLog() renvoie true', () => expect(showLog()).toBe(true));
	testAllLog(true);
});

describe('logger en prod', () => {
	beforeEach(() => vi.stubEnv('NODE_ENV', 'prod'));
	it('showLog() renvoie false', () => expect(showLog()).toBe(false));
	testAllLog(false);
});
