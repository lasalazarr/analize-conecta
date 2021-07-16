import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsDialogComponent } from './sectors-dialog.component';

describe('SectorsDialogComponent', () => {
  let component: SectorsDialogComponent;
  let fixture: ComponentFixture<SectorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
