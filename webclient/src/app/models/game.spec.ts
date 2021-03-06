import { Game, GameDto } from "./game";
import { Tile } from "./tile";

export function assertBoardIsValid(board: Tile[][], columns: number, rows: number) {
    expect(board).toBeTruthy();
    expect(board.length).toBe(columns);
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            expect(board[x]).toBeTruthy();
            expect(board[x].length).toBe(rows);
            expect(board[x][y]).toBeTruthy();
            expect(board[x][y].x).toBe(x);
            expect(board[x][y].y).toBe(y);
        }
    }
}

describe("Game tests", () => {
    describe("constructor tests", () => {
        it("Can be created by sorted board", () => {
            const dto: GameDto = {
                board: [
                    { x: 0, y: 0 }
                    , { x: 0, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 1, y: 1 }
                ]
            } as any;
            const result = new Game(dto);
            expect(result).toBeTruthy();
            assertBoardIsValid(result.board, 2, 2);
        });

        it("Can be created by reversed board", () => {
            const dto: GameDto = {
                board: [
                    { x: 1, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 0, y: 1 }
                    , { x: 0, y: 0 }
                ]
            } as any;
            const result = new Game(dto);
            expect(result).toBeTruthy();
            assertBoardIsValid(result.board, 2, 2);
        });

        it("Can be created by random board", () => {
            const dto: GameDto = {
                board: [
                    { x: 0, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 1, y: 1 }
                    , { x: 0, y: 0 }
                ]
            } as any;
            const result = new Game(dto);
            expect(result).toBeTruthy();
            assertBoardIsValid(result.board, 2, 2);
        });

        it("Can be created by random board 2×3", () => {
            const dto: GameDto = {
                board: [
                    { x: 0, y: 1 }
                    , { x: 1, y: 0 }
                    , { x: 1, y: 1 }
                    , { x: 0, y: 0 }
                    , { x: 2, y: 0 }
                    , { x: 2, y: 1 }
                ]
            } as any;
            const result = new Game(dto);
            expect(result).toBeTruthy();
            assertBoardIsValid(result.board, 3, 2);
        });
    });

    describe("makeDto tests", () => {
        it("null returns null", () => {
            const result = Game.makeDto(null);
            expect(result).toBeNull();
        });

        it("converts correctly", () => {
            const dto: GameDto = {
                host: { displayName: "" }
                , board: [{ x: 0, y: 0 } as any, { x: 1, y: 0 } as any, { x: 0, y: 1 } as any, { x: 1, y: 1 } as any]
                , _id: "kanga"
                , _etag: "asd568dfns"
                , _updated: new Date(1)
                , _created: new Date(1)
                , name: "winnie's game"
            };
            const game = new Game(dto);
            const result = Game.makeDto(game);

            expect(result).not.toEqual(game);
            expect(result).toEqual(dto);
        });
    });
});
