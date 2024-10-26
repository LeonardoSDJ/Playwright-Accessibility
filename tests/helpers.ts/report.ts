import fs from 'fs';
import path from 'path';

interface Violation {
  id: string;
  description: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  helpUrl: string;
  help: string;
  nodes: {
    html: string;
    failureSummary: string;
    target: string[];
  }[];
}

function generateAccessibilityReport(violations: Violation[], url: string, date: string): string {
  const totalViolations = violations.length;
  const criticalViolations = violations.filter(v => v.impact === 'critical').length;
  const seriousViolations = violations.filter(v => v.impact === 'serious').length;
  const moderateViolations = violations.filter(v => v.impact === 'moderate').length;
  const minorViolations = violations.filter(v => v.impact === 'minor').length;

  const reportHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Detalhado de Acessibilidade</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 1000px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #2c3e50; }
        .violation { background-color: #f8f9fa; border-left: 5px solid #e74c3c; margin-bottom: 20px; padding: 15px; }
        .impact { font-weight: bold; }
        .impact.critical { color: #c0392b; }
        .impact.serious { color: #e67e22; }
        .impact.moderate { color: #f39c12; }
        .impact.minor { color: #16a085; }
        code { background-color: #ecf0f1; padding: 2px 4px; border-radius: 4px; }
        .summary { background-color: #eee; padding: 10px; margin-bottom: 20px; }
        .node { border: 1px solid #bdc3c7; padding: 10px; margin-bottom: 10px; }
        .recommendations { background-color: #e8f8f5; padding: 10px; margin-top: 10px; }
    </style>
</head>
<body>
    <h1>Relatório Detalhado de Acessibilidade</h1>
    <div class="summary">
        <p><strong>URL testada:</strong> ${url}</p>
        <p><strong>Data do teste:</strong> ${date}</p>
        <p><strong>Total de violações:</strong> ${totalViolations}</p>
    </div>
    
    <h2>Resumo das Violações por Impacto</h2>
    <ul>
        <li>Crítico: ${criticalViolations}</li>
        <li>Grave: ${seriousViolations}</li>
        <li>Moderado: ${moderateViolations}</li>
        <li>Leve: ${minorViolations}</li>
    </ul>
    
    <h2>Detalhes das Violações</h2>
    ${violations.map(violation => `
        <div class="violation">
            <h3>${violation.id}: ${violation.description}</h3>
            <p><span class="impact ${violation.impact}">Impacto: ${violation.impact}</span></p>
            <p><strong>Ajuda:</strong> <a href="${violation.helpUrl}" target="_blank">${violation.help}</a></p>
            <h4>Elementos afetados:</h4>
            ${violation.nodes.map(node => `
                <div class="node">
                    <p><strong>HTML:</strong> <code>${node.html}</code></p>
                    <p><strong>Seletor:</strong> <code>${node.target.join(', ')}</code></p>
                    <p><strong>Ação sugerida:</strong> ${node.failureSummary}</p>
                </div>
            `).join('')}
            <div class="recommendations">
                <h4>Recomendações para correção:</h4>
                <ul>
                    ${getRecommendations(violation.id)}
                </ul>
            </div>
        </div>
    `).join('')}
    
    <h2>Próximos Passos</h2>
    <ol>
        <li>Priorize a correção das violações críticas e graves.</li>
        <li>Revise o código-fonte nos locais indicados pelos seletores.</li>
        <li>Implemente as correções sugeridas nas recomendações.</li>
        <li>Realize testes manuais para garantir que as correções não introduziram novos problemas.</li>
        <li>Execute novamente os testes automatizados após as correções.</li>
    </ol>
</body>
</html>
  `;

  const reportPath = path.join(__dirname, 'accessibility-report-detailed.html');
  fs.writeFileSync(reportPath, reportHTML);
  console.log(`Relatório detalhado de acessibilidade gerado: ${reportPath}`);
  return reportPath;
}

function getRecommendations(violationId: string): string {
  const recommendations: { [key: string]: string[] } = {
    'image-alt': [
      'Adicione um atributo alt descritivo a todas as imagens.',
      'Use alt="" para imagens decorativas.',
      'Certifique-se de que o texto alternativo transmita o mesmo significado e função da imagem.'
    ],
    'color-contrast': [
      'Aumente o contraste entre o texto e o fundo.',
      'Use uma ferramenta de verificação de contraste para garantir uma relação de contraste mínima de 4.5:1 para texto normal e 3:1 para texto grande.',
      'Considere oferecer um modo de alto contraste.'
    ],
    // Adicione mais recomendações para outros tipos de violações conforme necessário
  };

  return recommendations[violationId]?.map(rec => `<li>${rec}</li>`).join('') || 
         '<li>Consulte a documentação específica para obter orientações sobre como corrigir esta violação.</li>';
}

export { generateAccessibilityReport };