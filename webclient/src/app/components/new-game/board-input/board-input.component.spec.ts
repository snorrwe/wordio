import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Pipe, PipeTransform } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BoardInputComponent } from "./board-input.component";

@Pipe({
    name: "translate"
})
class TranslatePipeMockComponent implements PipeTransform {
    transform(value) { return value; }
}

describe("BoardInputComponent", () => {
    let component: BoardInputComponent;
    let fixture: ComponentFixture<BoardInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoardInputComponent, TranslatePipeMockComponent],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
