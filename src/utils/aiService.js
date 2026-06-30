export const generateAIResponse = async (prompt, config) => {
  const { provider, model } = config;

  if (provider === 'ollama') {
    try {
      // ADDED / UPDATED HERE:
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'llama3',
          messages: [{ role: 'user', content: prompt }],
          stream: false,
          options: {
            temperature: 0.5,     // Makes the AI more direct
            num_predict: 100      // Caps the length of the response so it stops generating endless walls of text
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama local server status error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.message && data.message.content) {
        return data.message.content;
      }
      
      return "Error: Received empty structured framework packets from local AI engine.";
    } catch (error) {
      console.error("Ollama Network Interface Error:", error);
      throw error;
    }
  }

  throw new Error("Unsupported AI Provider configuration matrix.");
};