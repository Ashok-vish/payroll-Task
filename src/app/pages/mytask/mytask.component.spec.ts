import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytaskComponent } from './mytask.component';

describe('MytaskComponent', () => {
  let component: MytaskComponent;
  let fixture: ComponentFixture<MytaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytaskComponent]
    });
    fixture = TestBed.createComponent(MytaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
