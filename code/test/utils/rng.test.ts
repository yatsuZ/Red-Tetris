import { expect, it, vi } from 'vitest';
import { getRandomInt } from '../../src/server/utils/rng.js';

it('getRandomInt', () => {
	for (let i = 0; i < 100; i++) {
		const n = getRandomInt(0, 10);
		expect(n).toBeGreaterThanOrEqual(0);
		expect(n).toBeLessThanOrEqual(10);
		expect(Number.isInteger(n)).toBe(true);
	}
	vi.spyOn(Math, 'random').mockReturnValue(0);
	const minRes = getRandomInt(0, 10);
	expect(minRes).toBe(0); // min

	vi.spyOn(Math, 'random').mockReturnValue(0.9999);
	const maxRes = getRandomInt(0, 10);
	expect(maxRes).toBe(10); // max

	vi.restoreAllMocks();
});
