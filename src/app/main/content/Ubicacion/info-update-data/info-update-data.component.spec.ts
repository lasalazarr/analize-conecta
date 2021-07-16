import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUpdateDataComponent } from './info-update-data.component';

describe('InfoUpdateDataComponent', () => {
  let component: InfoUpdateDataComponent;
  let fixture: ComponentFixture<InfoUpdateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUpdateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUpdateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
