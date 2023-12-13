import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletetaskComponent } from './completetask.component';

describe('CompletetaskComponent', () => {
  let component: CompletetaskComponent;
  let fixture: ComponentFixture<CompletetaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletetaskComponent]
    });
    fixture = TestBed.createComponent(CompletetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
