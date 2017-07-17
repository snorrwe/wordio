import { Injectable } from '@angular/core';
import { EveHttpService, ItemsDto } from './http.service';

import { Tile } from '../models/tile';

@Injectable()
export class BoardService {

    constructor(private httpService: EveHttpService) { }
}
