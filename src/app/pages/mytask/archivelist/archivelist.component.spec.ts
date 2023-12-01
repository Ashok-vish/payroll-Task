import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivelistComponent } from './archivelist.component';

describe('ArchivelistComponent', () => {
  let component: ArchivelistComponent;
  let fixture: ComponentFixture<ArchivelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivelistComponent]
    });
    fixture = TestBed.createComponent(ArchivelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
