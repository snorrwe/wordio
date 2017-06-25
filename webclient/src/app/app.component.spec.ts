import { Component, Input } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'wordio-board'
  , template: ''
})
class BoardMock {
  @Input('board') public board: any;
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
        , BoardMock
      ],
    }).compileComponents();
  }));

  afterEach(async() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.destroy();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
