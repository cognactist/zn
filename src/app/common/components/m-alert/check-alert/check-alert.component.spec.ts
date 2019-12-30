import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAlertComponent } from './check-alert.component';

describe('CheckAlertComponent', () => {
  let component: CheckAlertComponent;
  let fixture: ComponentFixture<CheckAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
