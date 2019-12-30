import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyVillageComponent } from './apply-village.component';

describe('ApplyVillageComponent', () => {
  let component: ApplyVillageComponent;
  let fixture: ComponentFixture<ApplyVillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyVillageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
