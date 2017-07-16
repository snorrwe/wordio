import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Tile } from '../models/tile';
import { Board } from '../models/board';

@Injectable()
export class BoardService {

    constructor(private httpService: HttpService) { }

    getBoard(boardId: string): Promise<Board> {
        return this.httpService.get<Board>("");
    }
}
