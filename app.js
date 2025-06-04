function App() {
    try {
        const [story, setStory] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(false);
        const [error, setError] = React.useState(null);
        const [activeTab, setActiveTab] = React.useState('story'); // 'story' or 'storyboard'

        const handleSubmit = async (formData) => {
            try {
                setIsLoading(true);
                setError(null);
                const generatedStory = await generateStory(formData);
                setStory(generatedStory);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        const handleReset = () => {
            setStory(null);
            setError(null);
            setActiveTab('story');
        };

        const TabButton = ({ id, label, icon }) => (
            <button
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(124,77,255,0.1)]'
                }`}
                data-name={`tab-${id}`}
            >
                <i className={`fas ${icon}`}></i>
                {label}
            </button>
        );

        return (
            <div className="min-h-screen pb-12" data-name="app">
                <Header />
                
                <main className="container" data-name="main-content">
                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded-lg mb-6" data-name="error-message">
                            <p>{error}</p>
                        </div>
                    )}

                    {!story && !isLoading && (
                        <StoryForm onSubmit={handleSubmit} isLoading={isLoading} />
                    )}

                    {isLoading && <LoadingSpinner />}

                    {story && !isLoading && (
                        <div className="space-y-6">
                            <div className="card p-4" data-name="story-navigation">
                                <div className="flex gap-2">
                                    <TabButton 
                                        id="story" 
                                        label="Historia" 
                                        icon="fa-book-open" 
                                    />
                                    <TabButton 
                                        id="storyboard" 
                                        label="Guión Visual" 
                                        icon="fa-film" 
                                    />
                                </div>
                            </div>

                            {activeTab === 'story' && (
                                <div className="space-y-6">
                                    <StoryDisplay story={story} onReset={handleReset} />
                                    <div className="card p-6 bg-gradient-to-r from-purple-900 to-indigo-900">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">¿Quieres visualizar tu historia?</h3>
                                                <p className="text-gray-300">
                                                    Crea un guión visual escena por escena con descripciones detalladas y prompts para IA
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setActiveTab('storyboard')}
                                                className="btn-primary bg-white text-purple-900 hover:bg-gray-100"
                                                data-name="create-storyboard-button"
                                            >
                                                <i className="fas fa-film mr-2"></i>
                                                Crear Guión Visual
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'storyboard' && (
                                <StoryboardCreator 
                                    story={story} 
                                    onBack={() => setActiveTab('story')} 
                                />
                            )}
                        </div>
                    )}
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
