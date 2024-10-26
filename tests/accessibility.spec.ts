import { test, expect, Page } from '@playwright/test';
import { runAccessibilityTest } from './helpers.ts/accessibilityTestRunner';
import { BASE_URL } from './config/testConfig';
import { generateAccessibilityReport } from './helpers.ts/report';

test.describe('Testes universais de acessibilidade', () => {
  let page: Page;
  let violations: any[] = [];

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    const date = new Date().toISOString();
    await generateAccessibilityReport(violations, BASE_URL, date);
  });

  async function runAccessibilityTestAndCollectViolations(page: Page, context?: string, options?: any) {
    try {
      const results = await runAccessibilityTest(page, context, options);
      if (results !== undefined && typeof results === 'object' && 'violations' in results) {
        const violationsResults = results as { violations: any[] };
        violations = violations.concat(violationsResults.violations || []);
        expect(violationsResults.violations || []).toHaveLength(0);
      } else {
        console.warn('runAccessibilityTest did not return an object with a violations property');
      }
    } catch (error) {
      console.error('Error running accessibility test:', error);
      throw error;
    }
  }

  test('Deve passar nos testes do axe-core na página inteira', async () => {
    await runAccessibilityTestAndCollectViolations(page);
  });

  test('Deve ter uma estrutura de documento adequada', async () => {
    const docTitle = await page.title();
    expect(docTitle, 'A página deve ter um título').not.toBe('');

    const langAttribute = await page.$eval('html', (el) => el.lang);
    expect(langAttribute, 'O atributo lang deve estar presente na tag html').not.toBe('');

    const h1Count = await page.$$eval('h1', (elements) => elements.length);
    expect(h1Count, 'A página deve ter exatamente um h1').toBe(1);
  });

  test('Deve ter uma hierarquia de cabeçalhos adequada', async () => {
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (elements) =>
      elements.map(e => ({
        level: parseInt(e.tagName.slice(1)),
        text: e.textContent?.trim()
      }))
    );

    let previousLevel = 0;
    headings.forEach(heading => {
      expect(heading.level, `O nível do cabeçalho não deve pular: ${heading.text}`).toBeLessThanOrEqual(previousLevel + 1);
      previousLevel = heading.level;
    });
  });

  test('Deve ter texto alternativo adequado para imagens', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['image-alt'] });
  });

  test('Deve ter contraste de cores adequado', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['color-contrast'] });
  });

  test('Deve ser navegável por teclado', async () => {
    await page.keyboard.press('Tab');
    const firstFocusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocusedElement, 'O primeiro elemento focável deve estar presente').toBeTruthy();

    // Simula navegação por teclado
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    const lastFocusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(lastFocusedElement, 'Deve ser possível navegar por vários elementos').not.toBe(firstFocusedElement);
  });

  test('Deve ter formulários acessíveis', async () => {
    await runAccessibilityTestAndCollectViolations(page, 'form', { runOnly: ['label', 'form-field-multiple-labels', 'select-name'] });
  });

  test('Deve ter links acessíveis', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['link-name'] });
  });

  test('Deve ser acessível em diferentes tamanhos de tela', async () => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await runAccessibilityTestAndCollectViolations(page, undefined, { name: `${viewport.name} viewport test` });
    }
  });

  test('Deve ter atributos ARIA usados corretamente', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['aria-allowed-attr', 'aria-hidden-body', 'aria-hidden-focus', 'aria-input-field-name', 'aria-toggle-field-name'] });
  });

  test('Deve ter uma ordem de leitura lógica', async () => {
    const elementsOrder = await page.$$eval('body *', (elements) =>
      elements.map(e => ({
        tag: e.tagName.toLowerCase(),
        text: e.textContent?.trim().substring(0, 20)
      }))
    );

    // Verifica a ordem dos elementos (essa é uma verificação básica e deve precisar de ajustes dependendo do contexto)
    let headerFound = false;
    let mainFound = false;
    let footerFound = false;

    for (const element of elementsOrder) {
      if (element.tag === 'header') headerFound = true;
      if (element.tag === 'main') mainFound = true;
      if (element.tag === 'footer') footerFound = true;

      if (mainFound) expect(headerFound, 'O cabeçalho deve vir antes do conteúdo principal').toBe(true);
      if (footerFound) expect(mainFound, 'O conteúdo principal deve vir antes do rodapé').toBe(true);
    }
  });

  test('Deve ter landmarks semânticos', async () => {
    const landmarks = await page.$$eval('header, nav, main, footer, aside, section[aria-label], section[aria-labelledby]',
      elements => elements.map(e => e.tagName.toLowerCase()));
    expect(landmarks).toContain('header');
    expect(landmarks).toContain('main');
    expect(landmarks).toContain('footer');
  });

  test('Deve ter skip links', async () => {
    const skipLink = await page.$('a[href^="#main"]');
    expect(skipLink, 'A página deve ter um skip link para o conteúdo principal').toBeTruthy();
  });

  test('Deve ter foco visível', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['focus-visible'] });
  });

  test('Deve ter uma estrutura de documento adequada para leitores de tela', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['document-structure'] });
  });

  test('Deve ter textos legíveis', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['content-readability'] });
  });

  test('Deve ter mídia alternativa para áudio e vídeo', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['audio-video-alternative'] });
  });

  test('Deve ter WAI-ARIA roles usados corretamente', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['aria-roles'] });
  });

  test('Deve ter estados e propriedades ARIA usados corretamente', async () => {
    await runAccessibilityTestAndCollectViolations(page, undefined, { runOnly: ['aria-props'] });
  });

  test('Deve ter uma ordem de tabulação lógica', async () => {
    const tabbableElements = await page.$$eval('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      elements => elements.map(e => ({
        tagName: e.tagName.toLowerCase(),
        textContent: e.textContent?.trim().substring(0, 20)
      })));

    // Verifica se a ordem dos elementos tabuláveis é lógica
    // Isso é uma verificação básica e pode precisar de ajustes dependendo do layout específico
    let lastElementWasHeader = false;
    for (const element of tabbableElements) {
      if (element.tagName === 'header') {
        lastElementWasHeader = true;
      } else if (lastElementWasHeader && element.tagName === 'footer') {
        expect(false, 'O footer não deve ser tabulável imediatamente após o header').toBe(true);
      }
    }
  })
});

