import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositTurnoverComponent } from './deposit-turnover.component';

describe('DepositTurnoverComponent', () => {
  let component: DepositTurnoverComponent;
  let fixture: ComponentFixture<DepositTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
