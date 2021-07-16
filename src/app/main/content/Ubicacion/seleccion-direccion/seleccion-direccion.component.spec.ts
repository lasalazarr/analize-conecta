import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDireccionComponent } from './seleccion-direccion.component';

describe('SeleccionDireccionComponent', () => {
  let component: SeleccionDireccionComponent;
  let fixture: ComponentFixture<SeleccionDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
