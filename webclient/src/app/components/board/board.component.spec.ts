import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Pipe, PipeTransform, Component, Input, Output } from "@angular/core";

import { BoardComponent } from "./board.component";

@Pipe({
    name: "reverse"
})
class ReversePipeMock implements PipeTransform {
    transform() { }
}

@Component({ selector: "wordio-tile", template: "" })
class TileMockComponent {
    @Input() isSelected;
    @Input() value;
    @Input() fontSize;
    @Output() onSelectedChange;
}

describe("BoardComponent", () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    BoardComponent
                    , ReversePipeMock
                    , TileMockComponent
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
