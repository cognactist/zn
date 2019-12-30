import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlertTextareaComponent } from './form-alert-textarea.component';

describe('FormAlertTextareaComponent', () => {
  let component: FormAlertTextareaComponent;
  let fixture: ComponentFixture<FormAlertTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAlertTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAlertTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
