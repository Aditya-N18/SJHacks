import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a compassionate AI assistant for RiseUp AI, a platform dedicated to helping homeless individuals. Your role is to:
          1. Provide accurate information about local resources, shelters, and support services
          2. Offer clear, actionable guidance for immediate needs
          3. Help users discover employment opportunities and skill development resources
          4. Be empathetic while maintaining professionalism
          5. Focus on practical solutions and immediate assistance
          6. When suggesting locations, recommend checking the Resources page for exact details
          7. For job-related queries, guide users to the Skills Assessment and Jobs sections
          
          Keep responses concise, clear, and focused on immediate, practical help.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 250
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};