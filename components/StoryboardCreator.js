function StoryboardCreator({ story, onBack }) {
    try {
        const [preferences, setPreferences] = React.useState({
            type: 'full',
            style: '',
            soundEffects: false,
            visualPreferences: ''
        });

        const [scenes, setScenes] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(false);
        const [copiedIndex, setCopiedIndex] = React.useState(null);

        const handlePreferencesSubmit = async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                const response = await generateStoryboard(story, preferences);
                const parsedScenes = parseScenes(response);
                setScenes(parsedScenes);
            } catch (error) {
                console.error('Error generating storyboard:', error);
                reportError(error);
            } finally {
                setIsLoading(false);
            }
        };

        const parseScenes = (response) => {
            const scenes = response.split(/🎞️\s*ESCENA\s*\d+/i).filter(scene => scene.trim());
            return scenes.map(scene => ({
                title: extractTitle(scene),
                plano: extractPlano(scene),
                descripcion: extractDescripcion(scene),
                elementos: extractElementos(scene),
                emocion: extractEmocion(scene),
                efectos: extractEfectos(scene),
                imagePrompt: extractImagePrompt(scene)
            }));
        };

        const extractTitle = (scene) => {
            const match = scene.match(/^[^🔹]+/);
            return match ? match[0].trim() : '';
        };

        const extractPlano = (scene) => {
            const match = scene.match(/Plano:(.*?)(?=\n🔹|$)/s);
            return match ? match[1].trim() : '';
        };

        const extractDescripcion = (scene) => {
            const match = scene.match(/Descripción visual:(.*?)(?=\n🔹|$)/s);
            return match ? match[1].trim() : '';
        };

        const extractElementos = (scene) => {
            const match = scene.match(/Elementos clave:(.*?)(?=\n🔹|$)/s);
            return match ? match[1].trim() : '';
        };

        const extractEmocion = (scene) => {
            const match = scene.match(/Emoción transmitida:(.*?)(?=\n🔹|$)/s);
            return match ? match[1].trim() : '';
        };

        const extractEfectos = (scene) => {
            const match = scene.match(/Efectos sugeridos:(.*?)(?=\n🎨|$)/s);
            return match ? match[1].trim() : '';
        };

        const extractImagePrompt = (scene) => {
            const match = scene.match(/Prompt para IA:?(.*?)(?=\n\n|$)/s);
            return match ? match[1].trim() : '';
        };

        const handleCopyPrompt = (prompt, index) => {
            navigator.clipboard.writeText(prompt);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        };

        if (isLoading) {
            return (
                <div className="container">
                    <LoadingSpinner />
                </div>
            );
        }

        return (
            <div className="container space-y-6" data-name="storyboard-creator">
                {!scenes.length ? (
                    <div className="card p-8" data-name="preferences-form">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-film"></i>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Creador de Guión Visual</h2>
                                <p className="text-gray-400 text-sm">Convierte tu historia en escenas visuales</p>
                            </div>
                        </div>

                        <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tipo de Guión Visual
                                </label>
                                <select
                                    value={preferences.type}
                                    onChange={(e) => setPreferences({...preferences, type: e.target.value})}
                                    className="form-input form-select bg-[#2d2d2d]"
                                    required
                                >
                                    <option value="full">Escena por escena</option>
                                    <option value="highlights">Momentos importantes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Estilo Visual
                                </label>
                                <select
                                    value={preferences.style}
                                    onChange={(e) => setPreferences({...preferences, style: e.target.value})}
                                    className="form-input form-select bg-[#2d2d2d]"
                                    required
                                >
                                    <option value="">Selecciona un estilo</option>
                                    <option value="realistic">Realista</option>
                                    <option value="cartoon">Caricaturesco</option>
                                    <option value="epic">Épico</option>
                                    <option value="dark">Oscuro</option>
                                    <option value="minimalist">Minimalista</option>
                                    <option value="colorful">Colorido</option>
                                    <option value="monochrome">Monocromático</option>
                                    <option value="vintage">Vintage</option>
                                    <option value="futuristic">Futurista</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="soundEffects"
                                    checked={preferences.soundEffects}
                                    onChange={(e) => setPreferences({...preferences, soundEffects: e.target.checked})}
                                    className="form-checkbox h-4 w-4 text-purple-600"
                                />
                                <label htmlFor="soundEffects" className="text-sm">
                                    Incluir efectos de sonido y música ambiental
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Preferencias Visuales Adicionales (Opcional)
                                </label>
                                <textarea
                                    value={preferences.visualPreferences}
                                    onChange={(e) => setPreferences({...preferences, visualPreferences: e.target.value})}
                                    className="form-input h-32"
                                    placeholder="Color dominante, clima, época del año, etc."
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="btn-primary bg-gray-600 hover:bg-gray-700"
                                    data-name="back-button"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Volver
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                                    disabled={isLoading}
                                    data-name="generate-button"
                                >
                                    {isLoading ? (
                                        <React.Fragment>
                                            <i className="fas fa-spinner fa-spin"></i>
                                            <span>Generando guión visual...</span>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-film"></i>
                                            <span>Generar Guión Visual</span>
                                        </React.Fragment>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="space-y-6" data-name="scenes-display">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Guión Visual</h2>
                            <button
                                onClick={() => setScenes([])}
                                className="btn-primary bg-gray-600 hover:bg-gray-700"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Editar Preferencias
                            </button>
                        </div>
                        
                        {scenes.map((scene, index) => (
                            <div key={index} className="card overflow-hidden scene-enter" data-name={`scene-${index}`}>
                                <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4">
                                    <h3 className="text-xl font-semibold">
                                        Escena {index + 1}: {scene.title}
                                    </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-purple-400 text-sm font-medium mb-2">
                                                <i className="fas fa-camera mr-2"></i>
                                                Plano
                                            </h4>
                                            <p className="bg-[#2d2d2d] p-3 rounded-lg">{scene.plano}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-purple-400 text-sm font-medium mb-2">
                                                <i className="fas fa-eye mr-2"></i>
                                                Descripción Visual
                                            </h4>
                                            <p className="bg-[#2d2d2d] p-3 rounded-lg">{scene.descripcion}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-purple-400 text-sm font-medium mb-2">
                                                <i className="fas fa-list mr-2"></i>
                                                Elementos Clave
                                            </h4>
                                            <p className="bg-[#2d2d2d] p-3 rounded-lg">{scene.elementos}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-purple-400 text-sm font-medium mb-2">
                                                <i className="fas fa-heart mr-2"></i>
                                                Emoción Transmitida
                                            </h4>
                                            <p className="bg-[#2d2d2d] p-3 rounded-lg">{scene.emocion}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-purple-400 text-sm font-medium mb-2">
                                                <i className="fas fa-magic mr-2"></i>
                                                Efectos Sugeridos
                                            </h4>
                                            <p className="bg-[#2d2d2d] p-3 rounded-lg">{scene.efectos}</p>
                                        </div>
                                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-purple-400 text-sm font-medium">
                                                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                                    Prompt para IA
                                                </h4>
                                                <button
                                                    onClick={() => handleCopyPrompt(scene.imagePrompt, index)}
                                                    className={`text-sm px-3 py-1 rounded-full transition-all flex items-center gap-2 ${
                                                        copiedIndex === index 
                                                        ? 'bg-green-600 hover:bg-green-700' 
                                                        : 'bg-purple-600 hover:bg-purple-700'
                                                    }`}
                                                    data-name={`copy-button-${index}`}
                                                >
                                                    {copiedIndex === index ? (
                                                        <React.Fragment>
                                                            <i className="fas fa-check"></i>
                                                            Copiado
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <i className="fas fa-copy"></i>
                                                            Copiar
                                                        </React.Fragment>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="bg-[#2d2d2d] p-3 rounded-lg">
                                                <p className="font-mono text-sm text-gray-300 break-words">
                                                    {scene.imagePrompt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('StoryboardCreator component error:', error);
        reportError(error);
        return null;
    }
}
