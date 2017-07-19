import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input } from '@angular/core';
import { GameComponent } from './game.component';

@Directive({ selector: "[loaded]" })
class LoadedMockDirective {
    @Input() isLoading;
}

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameComponent, LoadedMockDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
