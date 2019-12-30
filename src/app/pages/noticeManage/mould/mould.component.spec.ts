import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouldComponent } from './mould.component';

describe('MouldComponent', () => {
  let component: MouldComponent;
  let fixture: ComponentFixture<MouldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
