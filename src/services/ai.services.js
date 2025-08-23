const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text
}

async function generateVectors(prompt) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: prompt,
    });

    return response.embeddings;
}

module.exports = { generateContent, generateVectors };