import { Injectable } from '@angular/core';
import { EveHttpService, Dto } from './http.service';

import { Tile } from '../models/tile';
import { Board } from '../models/board';

@Injectable()
export class BoardService {

    constructor(private httpService: EveHttpService) { }

    getBoard(boardId: string): Promise<Board> {
        return this.httpService.get<Board>("");
    }
}
