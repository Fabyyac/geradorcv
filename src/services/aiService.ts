// src/services/aiService.ts

let GEMINI_API_KEY = ""; // Será preenchida dinamicamente pelo formulário

// Função para atualizar a API Key
export function setApiKey(key: string) {
  GEMINI_API_KEY = key.trim();
  console.log("API Key atualizada:", GEMINI_API_KEY ? "✅ IA Ativa" : "❌ API Key vazia");
}

// Função para melhorar texto via IA
export async function melhorarTextoIA(
  texto: string,
  tipo: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("API Key não configurada");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Melhore este ${tipo} de CV:\n\n${texto}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro na API: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    // O texto vem em data.candidates[0].content.parts[0].text
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ A IA não retornou resposta."
    );
  } catch (err) {
    console.error("Erro IA:", err);
    throw new Error("Não foi possível melhorar o texto no momento.");
  }
}
