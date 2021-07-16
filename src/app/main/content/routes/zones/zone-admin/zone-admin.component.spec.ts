import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAdminComponent } from './zone-admin.component';

describe('ZoneAdminComponent', () => {
  let component: ZoneAdminComponent;
  let fixture: ComponentFixture<ZoneAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
