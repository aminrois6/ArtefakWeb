import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShareComponent } from './share.component';
import { ShareModule } from './share.module';

describe('TablesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ShareModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ShareComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
