import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRuleListComponent } from './salary-rule-list.component';

describe('SalaryRuleListComponent', () => {
  let component: SalaryRuleListComponent;
  let fixture: ComponentFixture<SalaryRuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryRuleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
