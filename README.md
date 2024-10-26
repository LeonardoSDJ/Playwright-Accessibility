# Accessibility Testing Project

Project Under Construction / Projeto em Construção 
This project is currently under active development. Features and documentation may change significantly.
Este projeto está em desenvolvimento ativo. Funcionalidades e documentação podem mudar significativamente.

[English](#english) | [Português](#português)

## English

### Overview
This project implements an automated web accessibility testing suite using Playwright and Axe-core libraries. The goal is to identify and report web page accessibility issues and verify accessibility-related performance metrics, facilitating the development of more inclusive and responsive websites.

### Main Features
- Automated accessibility testing execution
- Accessibility-related performance testing
- Detailed accessibility violation reporting
- Multi-language support (English and Portuguese)
- Flexible test rules and options configuration


### Tests Coverage

#### Accessibility Tests
- Document structure and semantics
  - Title and language attributes
  - Heading hierarchy
  - Semantic landmarks
  - Reading order
  - Skip links
- Visual elements
  - Image alternative text
  - Color contrast
  - Focus visibility
- Interactive elements
  - Keyboard navigation
  - Form accessibility
  - Link accessibility
  - Tab order
- ARIA implementation
  - WAI-ARIA roles
  - ARIA states and properties
- Responsive design
  - Multi-device accessibility
  - Screen size adaptability
- Media accessibility
  - Audio alternatives
  - Video captions and descriptions
- Screen reader compatibility
  - Document structure
  - Text readability

#### Performance Tests
| Metric | Target | Description |
|--------|---------|-------------|
| Page Load Time | < 3s | Total time to load the page |
| Focus Delay | < 100ms | Time to respond to focus events |
| Click Response | < 300ms | Time to respond to user interactions |
| First Contentful Paint (FCP) | < 2s | Time until first meaningful content appears |

### Getting Started

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/accessibility-testing-project.git
cd accessibility-testing-project
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
Create a `.env` file in the project root:
```env
TEST_URL=https://www.example.com
```

#### Running Tests

Run all tests with report generation:
```bash
npm run test:all
```

Run specific test suites:
```bash
npm run test accessibility.spec.ts
npm run test accessibilityPerformance.spec.ts
```

### Test Results

#### Console Output
The console displays:
- Test execution summary
- Accessibility violations
- Link to Playwright's HTML report

#### HTML Report
Located in the `reports` folder, includes:
- Violation severity breakdown
- Detailed issue descriptions
- Remediation suggestions
- Performance metrics

### Contributing

#### Bug Reports
Open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior

#### Feature Requests
Open an issue including:
- Feature description
- Use case
- Implementation suggestions

#### Code Contributions
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit changes
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to fork
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request

### License
MIT License - See [LICENSE.md](LICENSE.md) for details.

---


## Português

### Visão Geral
Este projeto implementa uma suite de testes automatizados de acessibilidade web utilizando as bibliotecas Playwright e Axe-core. O objetivo é identificar e reportar problemas de acessibilidade em páginas web e verificar métricas de desempenho relacionadas à acessibilidade, facilitando o desenvolvimento de sites mais inclusivos e responsivos.

### Funcionalidades Principais
- Execução de testes de acessibilidade automatizados
- Testes de desempenho relacionados à acessibilidade
- Relatórios detalhados de violações de acessibilidade
- Suporte a múltiplos idiomas (Inglês e Português)
- Configuração flexível de regras e opções de teste


### Cobertura de Testes

#### Testes de Acessibilidade
- Estrutura e semântica do documento
  - Atributos de título e idioma
  - Hierarquia de cabeçalhos
  - Landmarks semânticos
  - Ordem de leitura
  - Links de atalho
- Elementos visuais
  - Texto alternativo para imagens
  - Contraste de cores
  - Visibilidade do foco
- Elementos interativos
  - Navegação por teclado
  - Acessibilidade de formulários
  - Acessibilidade de links
  - Ordem de tabulação
- Implementação ARIA
  - Papéis WAI-ARIA
  - Estados e propriedades ARIA
- Design responsivo
  - Acessibilidade multi-dispositivo
  - Adaptabilidade a diferentes tamanhos de tela
- Acessibilidade de mídia
  - Alternativas para áudio
  - Legendas e descrições para vídeos
- Compatibilidade com leitores de tela
  - Estrutura do documento
  - Legibilidade de texto

#### Testes de Desempenho
| Métrica | Meta | Descrição |
|---------|------|-----------|
| Tempo de Carregamento | < 3s | Tempo total para carregar a página |
| Atraso de Foco | < 100ms | Tempo para responder a eventos de foco |
| Resposta ao Clique | < 300ms | Tempo para responder a interações do usuário |
| Primeira Pintura Significativa (FCP) | < 2s | Tempo até o primeiro conteúdo significativo aparecer |

### Começando

#### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

#### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/accessibility-testing-project.git
cd accessibility-testing-project
```

2. Instale as dependências
```bash
npm install
```

3. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
TEST_URL=https://www.exemplo.com
```

#### Executando os Testes

Execute todos os testes com geração de relatório:
```bash
npm run test:all
```

Execute suites específicas de teste:
```bash
npm run test accessibility.spec.ts
npm run test accessibilityPerformance.spec.ts
```

### Resultados dos Testes

#### Saída do Console
O console exibe:
- Resumo da execução dos testes
- Violações de acessibilidade
- Link para o relatório HTML do Playwright

#### Relatório HTML
Localizado na pasta `reports`, inclui:
- Análise de severidade das violações
- Descrições detalhadas dos problemas
- Sugestões de correção
- Métricas de desempenho

### Contribuindo

#### Relatórios de Bugs
Abra uma issue com:
- Descrição clara
- Passos para reproduzir
- Comportamento esperado vs real

#### Solicitações de Funcionalidades
Abra uma issue incluindo:
- Descrição da funcionalidade
- Caso de uso
- Sugestões de implementação

#### Contribuições de Código
1. Faça um fork do repositório
2. Crie uma branch para a funcionalidade
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça commit das alterações
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Faça push para o fork
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request

### Licença
Licença MIT - Veja [LICENSE.md](LICENSE.md) para detalhes.