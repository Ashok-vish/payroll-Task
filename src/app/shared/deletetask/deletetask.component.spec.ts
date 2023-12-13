import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetaskComponent } from './deletetask.component';

describe('DeletetaskComponent', () => {
  let component: DeletetaskComponent;
  let fixture: ComponentFixture<DeletetaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletetaskComponent]
    });
    fixture = TestBed.createComponent(DeletetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
