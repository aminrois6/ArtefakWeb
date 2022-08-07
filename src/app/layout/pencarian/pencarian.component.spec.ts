import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PencarianComponent } from './pencarian.component';

describe('PencarianComponent', () => {
    let component: PencarianComponent;
    let fixture: ComponentFixture<PencarianComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [PencarianComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PencarianComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
