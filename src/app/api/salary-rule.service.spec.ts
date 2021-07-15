import { TestBed } from '@angular/core/testing';

import { SalaryRuleService } from './salary-rule.service';

describe('SalaryRuleService', () => {
  let service: SalaryRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
