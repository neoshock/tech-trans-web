const apiKey = process.env.REACT_APP_API_KEY_OPEN_IA;
const apiUrl = process.env.REACT_APP_URL_API_OPEN_IA;

export default async function sendMessageToIA(storedContent, userMessage, titleContent) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Eres un asistente que genera contenido el siguiente contenido, solo requiero texto de ${storedContent}`,
                    },
                    {
                        role: 'system',
                        content: `Eres un asistente que respondes, de la manera mas cortes y haciendo el contenido lo mas comprensible posible, no ejemplos de codigo, solo texto, en cortos parrafos, de lo siguiente ${titleContent}, si pregunta sobre un tema diferente, responder que solo te riges al tema de ${titleContent}`,
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la API');
        }

        const data = await response.json();
        const generatedContent = data.choices[0].message.content;
        // Aquí puedes añadir más lógica para procesar la respuesta, como limpiar HTML, etc.

        return generatedContent;

    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
}