import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktomeComponent } from './tasktome.component';

describe('TasktomeComponent', () => {
  let component: TasktomeComponent;
  let fixture: ComponentFixture<TasktomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasktomeComponent]
    });
    fixture = TestBed.createComponent(TasktomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
