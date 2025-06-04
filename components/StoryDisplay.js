function StoryDisplay({ story, onReset }) {
    try {
        if (!story) return null;

        const [title, ...contentParts] = story.split('\n\n');
        const content = contentParts.join('\n\n');
        const paragraphs = content.split('\n\n');
        const [isSending, setIsSending] = React.useState(false);

        const handleExport = () => {
            const blob = new Blob([story], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'historia-cuentrix.txt';
            a.click();
            window.URL.revokeObjectURL(url);
        };

        const handleWebhookSend = async () => {
            setIsSending(true);
            
            try {
                const cuento = document.querySelector('div[data-name="story-display"]')?.innerText;
                
                const response = await fetch("/functions/publicWebhookSend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ cuento })
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                const data = await response.json();
                
                if (data.success) {
                    alert("✅ Historia enviada con éxito");
                } else {
                    throw new Error(data.error || "Error al enviar");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
            } finally {
                setIsSending(false);
            }
        };

        return (
            <div className="card p-6" data-name="story-display">
                <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    {title}
                </h1>
                
                <div className="story-container" data-name="story-content">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="story-paragraph" data-name={`paragraph-${index}`}>
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="story-controls flex justify-between items-center" data-name="story-controls">
                    <div className="flex gap-2">
                        <button
                            onClick={onReset}
                            className="btn-primary bg-gray-700 hover:bg-gray-600"
                            data-name="reset-button"
                            disabled={isSending}
                        >
                            <i className="fas fa-undo mr-2"></i>
                            Nueva Historia
                        </button>
                        <button
                            onClick={handleWebhookSend}
                            className={`btn-primary flex items-center ${
                                isSending 
                                    ? 'bg-gray-500 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                            data-name="webhook-button"
                            disabled={isSending}
                        >
                            {isSending ? (
                                <React.Fragment>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Enviando...
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                                    Enviar Historia
                                </React.Fragment>
                            )}
                        </button>
                    </div>
                    <button
                        onClick={handleExport}
                        className="btn-primary"
                        data-name="export-button"
                        disabled={isSending}
                    >
                        <i className="fas fa-download mr-2"></i>
                        Exportar Historia
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StoryDisplay component error:', error);
        reportError(error);
        return null;
    }
}
