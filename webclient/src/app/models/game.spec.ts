import { Game, GameDto } from './game';
import { Tile } from './tile';

function validateBoard(board: Tile[][], columns: number, rows: number) {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            expect(board[x][y].x).toBe(x);
            expect(board[x][y].y).toBe(y);
        }
    }
}

describe('Game tests', () => {
    
    it('Can be created by sorted board', () => {
        let dto: GameDto = {
            board: [
                { x: 0, y: 0 }
                , { x: 0, y: 1 }
                , { x: 1, y: 0 }
                , { x: 1, y: 1 }
            ]
        } as any;
        let result = new Game(dto);
        expect(result).toBeTruthy();
        validateBoard(result.board, 2, 2);
    });

    it('Can be created by reversed board', () => {
        let dto: GameDto = {
            board: [
                { x: 1, y: 1 }
                , { x: 1, y: 0 }
                , { x: 0, y: 1 }
                , { x: 0, y: 0 }
            ]
        } as any;
        let result = new Game(dto);
        expect(result).toBeTruthy();
        validateBoard(result.board, 2, 2);
    });

    it('Can be created by random board', () => {
        let dto: GameDto = {
            board: [
                 { x: 0, y: 1 }
                , { x: 1, y: 0 }
                , { x: 1, y: 1 }
                , { x: 0, y: 0 }
            ]
        } as any;
        let result = new Game(dto);
        expect(result).toBeTruthy();
        validateBoard(result.board, 2, 2);
    });

    it('Can be created by random board 2×3', () => {
        let dto: GameDto = {
            board: [
                { x: 0, y: 1 }
                , { x: 1, y: 0 }
                , { x: 1, y: 1 }
                , { x: 0, y: 0 }
                , { x: 2, y: 0 }
                , { x: 2, y: 1 }
            ]
        } as any;
        let result = new Game(dto);
        expect(result).toBeTruthy();
        validateBoard(result.board, 2, 2);
    });
});
