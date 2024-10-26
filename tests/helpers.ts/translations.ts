import { Result } from 'axe-core';

type TranslationCategory = 'descriptions' | 'help' | 'failureSummary';
type ImpactType = 'minor' | 'moderate' | 'serious' | 'critical';

interface Translations {
    descriptions: { [key: string]: string };
    help: { [key: string]: string };
    failureSummary: { [key: string]: string };
    impact: { [K in ImpactType]: string };
}

export const translations: Translations = {
    descriptions: {
        "Ensure every HTML document has a lang attribute": "Certifique-se de que todo documento HTML tenha um atributo lang",
        "Ensure <img> elements have alternate text or a role of none or presentation": "Certifique-se de que os elementos <img> tenham texto alternativo ou um papel de 'none' ou 'presentation'",
        "Ensure the document has a main landmark": "Certifique-se de que o documento tenha um landmark(marcação) principal",
        "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming": "Certifique-se de que <meta name=\"viewport\"> não desabilite o dimensionamento e zoom do texto",
        "Ensure that the page, or at least one of its frames contains a level-one heading": "Certifique-se de que a página, ou pelo menos um de seus frames, contenha um cabeçalho de nível principal(nivel 1)",
        "Ensure all page content is contained by landmarks": "Certifique-se de que todo o conteúdo da página esteja contido em landmarks(marcações)",
    },
    help: {
        "<html> element must have a lang attribute": "O elemento <html> deve ter um atributo lang",
        "Images must have alternate text": "As imagens devem ter um texto alternativo",
        "Document should have one main landmark": "O documento deve ter um landmark(marcação) principal",
        "Zooming and scaling must not be disabled": "O zoom e o dimensionacmento de tela não devem ser desabilitados",
        "Page should contain a level-one heading": "A página deve conter um cabeçalho de nível um",
        "All page content should be contained by landmarks": "Todo o conteúdo da página deve estar contido em landmarks(marcações)",
    },
    failureSummary: {
        "Fix any of the following:": "Corrija qualquer um dos seguintes:",
        "Fix all of the following:": "Corrija todos os seguintes:",
        "The <html> element does not have a lang attribute": "O elemento <html> não possui um atributo lang",
        "Element does not have an alt attribute": "O elemento não possui um atributo alt",
        "aria-label attribute does not exist or is empty": "O atributo aria-label não existe ou está vazio",
        "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty": "O atributo aria-labelledby não existe, referencia elementos que não existem ou referencia elementos que estão vazios",
        "Element has no title attribute": "O elemento não possui um atributo title",
        "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"": "A semântica padrão do elemento não foi sobrescrita com role=\"none\" ou role=\"presentation\"",
        "Document does not have a main landmark": "O documento não possui um landmark(marcação) principal",
        "maximum-scale on <meta> tag disables zooming on mobile devices": "O atributo maximum-scale na tag <meta> desabilita o zoom em dispositivos móveis",
        "Page must have a level-one heading": "A página deve ter um cabeçalho de nível um",
        "Some page content is not contained by landmarks": "Algum conteúdo da página não está contido em landmarks(marcações)",
    },
    impact: {
        minor: 'leve',
        moderate: 'moderado',
        serious: 'grave',
        critical: 'crítico'
    }
};

export function translate(key: string, category: TranslationCategory): string {
    return translations[category][key] || key;
}

export function translateImpact(impact: Result['impact']): string {
    if (impact && Object.keys(translations.impact).includes(impact)) {
        return translations.impact[impact as ImpactType];
    }
    return impact || 'desconhecido';
}