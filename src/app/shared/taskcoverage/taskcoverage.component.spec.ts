import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcoverageComponent } from './taskcoverage.component';

describe('TaskcoverageComponent', () => {
  let component: TaskcoverageComponent;
  let fixture: ComponentFixture<TaskcoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskcoverageComponent]
    });
    fixture = TestBed.createComponent(TaskcoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
