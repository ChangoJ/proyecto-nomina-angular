import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalaryRuleComponent } from './create-salary-rule.component';

describe('CreateSalaryRuleComponent', () => {
  let component: CreateSalaryRuleComponent;
  let fixture: ComponentFixture<CreateSalaryRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSalaryRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalaryRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
