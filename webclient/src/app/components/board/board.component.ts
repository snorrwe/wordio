import { Component, OnInit, Input } from '@angular/core';

import { Tile } from '../../models/tile';

@Component({
	selector: 'wordio-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	@Input('board') private board: Tile[][];

	constructor() { }

	ngOnInit() {
		console.log(this.board);
	} 
}
