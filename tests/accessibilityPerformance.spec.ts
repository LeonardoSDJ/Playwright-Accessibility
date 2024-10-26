import { test, expect, Page } from '@playwright/test';
import { BASE_URL } from './config/testConfig';

test.describe('Testes de desempenho relacionados à acessibilidade', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Deve carregar a página em um tempo razoável', async () => {
    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 segundos pode ser um tempo razoável para carregamento
  });

  test('Não deve haver atrasos significativos ao focar elementos', async () => {
    await page.goto(BASE_URL);
    const focusableElements = await page.$$('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    for (const element of focusableElements) {
      const startTime = Date.now();
      await element.focus();
      const focusTime = Date.now() - startTime;
      expect(focusTime).toBeLessThan(100); // 100ms é um tempo razoável para foco
    }
  });

  test('Não deve haver atrasos significativos ao acionar elementos interativos', async () => {
    await page.goto(BASE_URL);
    const interactiveElements = await page.$$('button, a, input[type="submit"]');
    
    for (const element of interactiveElements) {
      const startTime = Date.now();
      await element.click({ force: true }); // force: true foi usado para evitar problemas de visibilidade
      const clickTime = Date.now() - startTime;
      expect(clickTime).toBeLessThan(300); // 300ms pode ser um tempo razoável para resposta após clique
    }
  });

  test('Deve ter um tempo de primeira pintura significativa (FCP) razoável', async () => {
    const fcpEntry = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          resolve(entries[0]);
        }).observe({ type: 'paint', buffered: true });
      });
    });
    
    // @ts-ignore
    expect(fcpEntry.startTime).toBeLessThan(2000); // 2 segundos pode ser um tempo razoável para FCP
  });
});