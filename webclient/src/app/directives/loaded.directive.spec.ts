import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { LoadedDirective } from './loaded.directive';

@Component({ selector: '', template: "<div loaded [isLoading]='isLoading'></div>" })
class TestComponent {
    isLoading: boolean;
}

describe('LoadedDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, LoadedDirective],
            imports: [BrowserModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});
