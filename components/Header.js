function Header() {
    try {
        return (
            <div data-name="header">
                <div className="header-bar">
                    <div className="header-title">StoryCreator Cuentrix</div>
                    <div className="header-actions">
                        <button className="btn-icon" title="Compartir">
                            <i className="fas fa-share-alt"></i>
                        </button>
                        <button className="btn-icon" title="Descargar">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="btn-icon" title="Más opciones">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <div className="container">
                    <h1 className="text-4xl font-bold mb-2" data-name="title">
                        StoryCreator Cuentrix
                    </h1>
                    <p className="text-gray-400" data-name="subtitle">
                        Convierte tus ideas en historias cautivadoras
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
