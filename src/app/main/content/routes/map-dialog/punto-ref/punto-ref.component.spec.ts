import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoRefComponent } from './punto-ref.component';

describe('PuntoRefComponent', () => {
  let component: PuntoRefComponent;
  let fixture: ComponentFixture<PuntoRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
