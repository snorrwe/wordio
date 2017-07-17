import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private dummyboard: any[][];

    constructor() {
        this.dummyboard = [];
        for (let i = 5; i >= 0; i--) {
            const next = [];
            for (let j = 5; j >= 0; j--) {
                next.push({ value: 10 * i + 1 + j });
            }
            this.dummyboard.push(next);
        }
    }
}
