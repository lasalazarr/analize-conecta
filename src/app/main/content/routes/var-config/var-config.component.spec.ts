import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarConfigComponent } from './var-config.component';

describe('VarConfigComponent', () => {
  let component: VarConfigComponent;
  let fixture: ComponentFixture<VarConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
