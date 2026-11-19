import { expect, it, vi } from "vitest";
import { getRandomInt } from '../../src/server/utils/rng.js';


it('getRandomInt', () => {
    for (let i = 0; i < 100; i++) {
        const n = getRandomInt(0, 10);
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(10);
        expect(Number.isInteger(n)).toBe(true);
    }
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const min_res = getRandomInt(0, 10);
    expect(min_res).toBe(0);         // min

    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    const max_res = getRandomInt(0, 10);
    expect(max_res).toBe(10);        // max

    vi.restoreAllMocks();
});

