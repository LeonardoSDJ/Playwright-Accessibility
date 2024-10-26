import { AxeResults, Result } from 'axe-core';
import { translate, translateImpact } from './translations';

export function formatViolations(results: AxeResults): string {
  return results.violations.map(violation => `
    Regra: ${violation.id}
    Impacto: ${translateImpact(violation.impact)}
    Descrição: ${translate(violation.description, 'descriptions')}
    Ajuda: ${translate(violation.help, 'help')}
    URL de ajuda: ${violation.helpUrl}
    Elementos afetados: ${violation.nodes.length}
    Primeiro elemento afetado: ${violation.nodes[0]?.html}
    Resumo da falha: ${translate(violation.nodes[0]?.failureSummary || '', 'failureSummary')}
  `).join('\n');
}