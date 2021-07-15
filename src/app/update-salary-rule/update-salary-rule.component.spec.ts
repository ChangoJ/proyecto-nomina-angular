import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalaryRuleComponent } from './update-salary-rule.component';

describe('UpdateSalaryRuleComponent', () => {
  let component: UpdateSalaryRuleComponent;
  let fixture: ComponentFixture<UpdateSalaryRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalaryRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalaryRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
