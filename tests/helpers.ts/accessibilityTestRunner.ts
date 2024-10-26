import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { AXE_OPTIONS } from '../config/testConfig';
import { formatViolations } from './formatters';

export async function runAccessibilityTest(page: Page, context?: string, options: any = {}) {
  let axeBuilder = new AxeBuilder({ page }).options({
    ...AXE_OPTIONS,
    ...options
  });
  
  if (context) {
    axeBuilder = axeBuilder.include(context);
  }
  
  const results = await axeBuilder.analyze();
  
  if (results.violations.length > 0) {
    const violationDescriptions = formatViolations(results);
    expect(results.violations, `Violações de acessibilidade encontradas:\n${violationDescriptions}`).toHaveLength(0);
  }
}