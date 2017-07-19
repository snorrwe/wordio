import { Directive, Input, OnChanges, Renderer2, ElementRef, SimpleChanges } from "@angular/core";

@Directive({
    selector: "[loaded]"
})
export class LoadedDirective implements OnChanges {

    @Input("isLoading") protected isLoading: boolean;
    private loadUi: any;
    get parent() { return this.renderer.parentNode(this.element.nativeElement); }

    constructor(protected renderer: Renderer2, protected element: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isLoading.currentValue) {
            this.createLoadUi();
            this.hideNative();
        } else if (this.loadUi) {
            this.renderer.removeChild(this.parent, this.loadUi);
            delete this.loadUi;
            this.showNative();
        }
    }

    private createLoadUi() {
        if (this.loadUi) return this.loadUi;
        const element = this.renderer.createElement("div");
        this.renderer.addClass(element, "loader");
        this.renderer.insertBefore(this.parent, element, this.element.nativeElement);
        this.loadUi = element;
    }

    private hideNative() {
        this.renderer.setStyle(this.element.nativeElement, "visibility", "hidden");
        this.renderer.setStyle(this.element.nativeElement, "height", "0px");
    }

    private showNative() {
        this.renderer.setStyle(this.element.nativeElement, "visibility", "visible");
        this.renderer.setStyle(this.element.nativeElement, "height", "");
    }
}
