import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTraceComponent } from './map-trace.component';

describe('MapTraceComponent', () => {
  let component: MapTraceComponent;
  let fixture: ComponentFixture<MapTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
