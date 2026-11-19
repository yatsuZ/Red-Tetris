import { afterEach, describe, expect, it, vi } from "vitest";
import { log_collision_matrix } from "../../src/server/utils/showStateColision.js";
import { StatePieceCollision } from "../../src/server/constant/Board.js";

const mini = [[StatePieceCollision.PIECE_COLLISION, StatePieceCollision.NO_COLLISION]];

describe("log_collision_matrix", () => {
    afterEach(() => { vi.restoreAllMocks(); });

    it("avec label", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        log_collision_matrix(mini, "TEST");

        expect(spy).toHaveBeenCalledTimes(4);
        expect(spy).toHaveBeenNthCalledWith(1, "TEST");
        expect(spy).toHaveBeenNthCalledWith(2, "+-----+-----+");
        expect(spy).toHaveBeenNthCalledWith(3, "| PIE |  .  |");
        expect(spy).toHaveBeenNthCalledWith(4, "+-----+-----+");
    });

    it("sans label", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        log_collision_matrix(mini);

        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenNthCalledWith(1, "+-----+-----+");
    });

    it("show_log = false n'affiche rien", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        log_collision_matrix(mini, "TEST", false);

        expect(spy).not.toHaveBeenCalled();
    });

    it("matrice vide", () => {
        const spy = vi.spyOn(console, "log").mockImplementation(() => {});
        log_collision_matrix([]);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenNthCalledWith(1, "++");
    });
});