import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { gptPrompt } = req.body;
    if (!gptPrompt)
      return res.status(400).json({ error: 'Prompt is required' });

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{ role: 'user', content: gptPrompt }],
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Groq API error:', err);
    res.status(500).json({ error: 'Failed to fetch from Groq API' });
  }
}
