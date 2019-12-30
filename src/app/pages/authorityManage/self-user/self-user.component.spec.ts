import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfUserComponent } from './self-user.component';

describe('SelfUserComponent', () => {
  let component: SelfUserComponent;
  let fixture: ComponentFixture<SelfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
