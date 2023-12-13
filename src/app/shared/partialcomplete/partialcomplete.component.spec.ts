import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialcompleteComponent } from './partialcomplete.component';

describe('PartialcompleteComponent', () => {
  let component: PartialcompleteComponent;
  let fixture: ComponentFixture<PartialcompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartialcompleteComponent]
    });
    fixture = TestBed.createComponent(PartialcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
