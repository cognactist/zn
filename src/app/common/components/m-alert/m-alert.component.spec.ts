import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAlertComponent } from './m-alert.component';

describe('MAlertComponent', () => {
  let component: MAlertComponent;
  let fixture: ComponentFixture<MAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
