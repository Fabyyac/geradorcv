// src/utils/ai.ts
export async function improveText(apiKey: string, text: string): Promise<string> {
if (!apiKey) throw new Error('API Key ausente.');
if (!text?.trim()) return text;


const res = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apiKey}`,
},
body: JSON.stringify({
model: 'gpt-4o-mini',
temperature: 0.3,
max_tokens: 250,
messages: [
{ role: 'system', content: 'Você é um editor de currículos. Reescreva textos de forma clara, concisa e profissional em PT-BR, sem inventar fatos.' },
{ role: 'user', content: `Melhore o texto a seguir para um currículo, mantendo o sentido e o português brasileiro: \n\n"""${text}"""` },
],
}),
});


if (!res.ok) throw new Error(`OpenAI erro HTTP ${res.status}`);
const data = await res.json();
return data.choices?.[0]?.message?.content?.trim() ?? text;
}