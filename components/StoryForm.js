function StoryForm({ onSubmit, isLoading }) {
    try {
        const [formData, setFormData] = React.useState({
            tipo: 'corta',
            genero: '',
            protagonista: '',
            tono: '',
            final: '',
            detalles: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const handleRandomProtagonist = () => {
            setFormData({
                ...formData,
                protagonista: getRandomProtagonist()
            });
        };

        const getRandomElement = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };

        const handleRandomFill = () => {
            const generos = ['fantasia', 'ciencia-ficcion', 'misterio', 'romance', 'aventura'];
            const tonos = ['dramatico', 'humoristico', 'melancolico', 'inspirador', 'misterioso'];
            const finales = ['feliz', 'triste', 'abierto', 'inesperado'];
            const detalles = [
                'Ambientado en una ciudad futurista con rascacielos de cristal y vehículos voladores.',
                'En un bosque mágico donde los árboles brillan con luz propia y las criaturas místicas abundan.',
                'Durante el atardecer en una playa desierta, con el sonido de las olas como música de fondo.',
                'En las profundidades de una antigua biblioteca llena de secretos y manuscritos olvidados.',
                'En un mundo post-apocalíptico donde la naturaleza ha reclamado las ciudades abandonadas.'
            ];

            setFormData({
                tipo: Math.random() > 0.5 ? 'corta' : 'serie',
                genero: getRandomElement(generos),
                protagonista: getRandomProtagonist(),
                tono: getRandomElement(tonos),
                final: getRandomElement(finales),
                detalles: getRandomElement(detalles)
            });
        };

        return (
            <div className="container" data-name="story-form-container">
                <div className="card p-8" data-name="story-form">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-magic"></i>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Generador de Historias</h2>
                                <p className="text-gray-400 text-sm">Crea historias únicas para tu audiencia</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRandomFill}
                            className="btn-primary bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
                            disabled={isLoading}
                            data-name="random-fill-button"
                        >
                            <i className="fas fa-random"></i>
                            <span>Aleatorio</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div data-name="form-field-tipo">
                            <label className="block text-sm font-medium mb-2">Tipo de Historia</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="form-input form-select bg-[#2d2d2d]"
                                disabled={isLoading}
                            >
                                <option value="corta">Historia Autoconclusiva</option>
                                <option value="serie">Serie por Capítulos</option>
                            </select>
                        </div>

                        <div data-name="form-field-genero">
                            <label className="block text-sm font-medium mb-2">Género</label>
                            <select
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                className="form-input form-select bg-[#2d2d2d]"
                                required
                                disabled={isLoading}
                            >
                                <option value="">Selecciona un género</option>
                                <option value="fantasia">Fantasía</option>
                                <option value="ciencia-ficcion">Ciencia Ficción</option>
                                <option value="misterio">Misterio</option>
                                <option value="romance">Romance</option>
                                <option value="aventura">Aventura</option>
                            </select>
                        </div>

                        <div data-name="form-field-protagonista">
                            <label className="block text-sm font-medium mb-2">
                                Protagonista
                                <span className="text-gray-400 ml-1">(Requerido)</span>
                            </label>
                            <p className="text-sm text-gray-400 mb-2">
                                Describe las características principales de tu protagonista
                            </p>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        name="protagonista"
                                        value={formData.protagonista}
                                        onChange={handleChange}
                                        className="form-input pl-3 pr-8"
                                        placeholder="Ej: Una arqueóloga intrépida de 35 años..."
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <i className="fas fa-user text-gray-400"></i>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRandomProtagonist}
                                    className="px-3 py-2 bg-[#7c4dff] hover:bg-[#6c3fff] rounded-lg transition-all"
                                    title="Generar protagonista aleatorio"
                                    disabled={isLoading}
                                >
                                    <i className="fas fa-random"></i>
                                </button>
                            </div>
                        </div>

                        <div data-name="form-field-tono">
                            <label className="block text-sm font-medium mb-2">Tono Emocional</label>
                            <select
                                name="tono"
                                value={formData.tono}
                                onChange={handleChange}
                                className="form-input form-select bg-[#2d2d2d]"
                                required
                                disabled={isLoading}
                            >
                                <option value="">Selecciona un tono</option>
                                <option value="dramatico">Dramático</option>
                                <option value="humoristico">Humorístico</option>
                                <option value="melancolico">Melancólico</option>
                                <option value="inspirador">Inspirador</option>
                                <option value="misterioso">Misterioso</option>
                            </select>
                        </div>

                        <div data-name="form-field-final">
                            <label className="block text-sm font-medium mb-2">Tipo de Final</label>
                            <select
                                name="final"
                                value={formData.final}
                                onChange={handleChange}
                                className="form-input form-select bg-[#2d2d2d]"
                                required
                                disabled={isLoading}
                            >
                                <option value="">Selecciona un final</option>
                                <option value="feliz">Feliz</option>
                                <option value="triste">Triste</option>
                                <option value="abierto">Abierto</option>
                                <option value="inesperado">Inesperado</option>
                            </select>
                        </div>

                        <div data-name="form-field-detalles">
                            <label className="block text-sm font-medium mb-2">Detalles Adicionales (Opcional)</label>
                            <textarea
                                name="detalles"
                                value={formData.detalles}
                                onChange={handleChange}
                                className="form-input h-32"
                                placeholder="Escenario, elementos especiales, etc."
                                disabled={isLoading}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full flex items-center justify-center gap-2"
                            disabled={isLoading}
                            data-name="submit-button"
                        >
                            {isLoading ? (
                                <React.Fragment>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>Generando historia...</span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <i className="fas fa-wand-magic-sparkles"></i>
                                    <span>Generar Historia</span>
                                </React.Fragment>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StoryForm component error:', error);
        reportError(error);
        return null;
    }
}
