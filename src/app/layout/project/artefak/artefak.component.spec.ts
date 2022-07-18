import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArtefakComponent } from './artefak.component';
import { ArtefakModule } from './artefak.module';

describe('ArtefakComponent', () => {
  let component: ArtefakComponent;
  let fixture: ComponentFixture<ArtefakComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ArtefakModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
