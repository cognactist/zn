import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainantComponent } from './complainant.component';

describe('ComplainantComponent', () => {
  let component: ComplainantComponent;
  let fixture: ComponentFixture<ComplainantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
