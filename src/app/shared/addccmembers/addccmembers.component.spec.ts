import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddccmembersComponent } from './addccmembers.component';

describe('AddccmembersComponent', () => {
  let component: AddccmembersComponent;
  let fixture: ComponentFixture<AddccmembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddccmembersComponent]
    });
    fixture = TestBed.createComponent(AddccmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
