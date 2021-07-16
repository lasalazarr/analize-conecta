import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpuntosComponent } from './adminpuntos.component';

describe('AdminpuntosComponent', () => {
  let component: AdminpuntosComponent;
  let fixture: ComponentFixture<AdminpuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
