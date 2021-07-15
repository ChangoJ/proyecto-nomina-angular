import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRuleComponent } from './salary-rule.component';

describe('SalaryRuleComponent', () => {
  let component: SalaryRuleComponent;
  let fixture: ComponentFixture<SalaryRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
