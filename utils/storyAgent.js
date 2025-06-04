function generateStoryPrompt(params) {
    return `Primero, genera un título llamativo y optimizado para SEO que:
- Sea atractivo y genere curiosidad
- Incluya palabras clave relevantes al género (${params.genero})
- Tenga entre 5-10 palabras
- Refleje el tono (${params.tono}) de la historia
- Sea memorable y fácil de compartir
- No revele demasiado de la trama

Después, genera una historia ${params.tipo === 'corta' ? 'autoconclusiva' : 'por capítulos'} de aproximadamente 3000-4000 palabras.

Género: ${params.genero}
Protagonista: ${params.protagonista}
Tono emocional: ${params.tono}
Tipo de final: ${params.final}
${params.detalles ? `Detalles adicionales: ${params.detalles}` : ''}

Instrucciones específicas:
- Escribe la historia de forma fluida y continua
- No uses marcadores como "Introducción", "Escena 1", etc.
- Mantén una narrativa natural que fluya de una escena a otra
- Usa párrafos bien estructurados para separar las diferentes partes
- Incluye transiciones suaves entre escenas
- La historia debe tener un arco narrativo completo
- Evita cualquier tipo de encabezado o marcador de sección

La historia debe mantener:
- Un inicio que enganche al lector
- Desarrollo gradual del conflicto
- Puntos de tensión creciente
- Un clímax impactante
- ${params.tipo === 'corta' ? 'Una resolución satisfactoria' : 'Un final que invite a continuar'}

IMPORTANTE: Devuelve primero el título en una línea, seguido de dos saltos de línea, y luego la historia completa.`;
}

async function generateStory(params) {
    try {
        const systemPrompt = `Eres un experto narrador y escritor creativo especializado en crear historias cautivadoras para formato audio. 
IMPORTANTE: Genera un título SEO atractivo y después la historia completa sin marcadores de sección. La narración debe fluir naturalmente de principio a fin.`;
        const userPrompt = generateStoryPrompt(params);
        
        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return response;
    } catch (error) {
        console.error('Error generating story:', error);
        throw new Error('No se pudo generar la historia. Por favor, intenta nuevamente.');
    }
}

function generateStoryboardPrompt(story, preferences) {
    return `Como StoryVisual Cuentrix, crea un guión visual detallado para esta historia.

Tipo de visualización: ${preferences.type === 'full' ? 'escena por escena' : 'momentos clave'}
Estilo visual: ${preferences.style}
Efectos de sonido: ${preferences.soundEffects ? 'Sí' : 'No'}
Preferencias adicionales: ${preferences.visualPreferences}

Para cada escena, proporciona:
🎞️ ESCENA [número]: [nombre descriptivo]
🔹 Plano: (General/Medio/Primer plano/Detalle)
🔹 Descripción visual: (ambiente, composición)
🔹 Elementos clave: (personajes, objetos importantes)
🔹 Emoción transmitida: (sentimiento principal)
🔹 Efectos sugeridos: (efectos visuales, sonido)
🎨 Prompt para IA: (descripción técnica en inglés)

Historia:
${story}

IMPORTANTE: 
- Divide la historia en al menos 5 escenas distintas
- Cada escena debe tener todos los elementos solicitados
- Los prompts para IA deben ser detallados y en inglés
- Asegúrate que cada escena capture un momento significativo de la historia`;
}

async function generateStoryboard(story, preferences) {
    try {
        const systemPrompt = "Eres StoryVisual Cuentrix, un director creativo experto en crear guiones visuales detallados.";
        const userPrompt = generateStoryboardPrompt(story, preferences);
        
        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return response;
    } catch (error) {
        console.error('Error generating storyboard:', error);
        throw new Error('No se pudo generar el guión visual. Por favor, intenta nuevamente.');
    }
}
