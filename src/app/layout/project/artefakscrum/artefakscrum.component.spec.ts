import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArtefakscrumComponent } from './artefakscrum.component';
import { ArtefakscrumModule } from './artefakscrum.module';

describe('ArtefakscrumComponent', () => {
  let component: ArtefakscrumComponent;
  let fixture: ComponentFixture<ArtefakscrumComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ArtefakscrumModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefakscrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
