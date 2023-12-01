import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedbymeComponent } from './assignedbyme.component';

describe('AssignedbymeComponent', () => {
  let component: AssignedbymeComponent;
  let fixture: ComponentFixture<AssignedbymeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedbymeComponent]
    });
    fixture = TestBed.createComponent(AssignedbymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
