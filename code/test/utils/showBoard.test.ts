import { afterEach, describe, expect, it, vi } from "vitest";
import { show_board } from "../../src/server/utils/showBoard.js";
import { CelluleType } from "../../src/server/constant/Board.js";

const mini = [
    [CelluleType.WALL, CelluleType.PIECE],
    [CelluleType.EMPTY, CelluleType.SPAWN],
];

describe("show_board", () => {
    afterEach(() => { vi.restoreAllMocks(); });

    it("ASCII", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        show_board(mini, "ASCII");

        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenNthCalledWith(1, "Ligne 0:\t | O ");
        expect(spy).toHaveBeenNthCalledWith(2, "Ligne 1:\t   X ");
        expect(spy).toHaveBeenNthCalledWith(3, "");
    });

    it("EMOJI par défaut", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        show_board(mini);

        expect(spy).toHaveBeenNthCalledWith(1, "Ligne 0:\t 🧱 ⬛ ");
        expect(spy).toHaveBeenNthCalledWith(2, "Ligne 1:\t ⬜ ❌ ");
    });
});