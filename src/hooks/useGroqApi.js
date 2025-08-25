import { useEffect, useState } from 'react';
import { GLOBAL_PROMPT } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMovies } from '../redux/slice/gptSlice';

const useGroqApi = (prompt) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function parseGroqContent(content) {
    const parsed = [];
    const lines = content
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    let currentCategory = null;

    lines.forEach((line) => {
      // Category header
      const categoryMatch = line.match(/^\*\*(.*?)\*\*:?\s*$/);
      if (categoryMatch) {
        currentCategory = {
          category: categoryMatch[1],
          items: [],
        };
        parsed.push(currentCategory);
        return;
      }

      // Numbered movie title
      const movieMatch = line.match(/^\d+\.\s*(.+)$/);
      if (movieMatch && currentCategory) {
        const title = movieMatch[1].trim();
        currentCategory.items.push(title);
      }
    });

    return parsed.filter((cat) => cat.items.length > 0);
  }

  useEffect(() => {
    if (!prompt) return;

    const getGroqResponse = async () => {
      setLoading(true);
      const gptPrompt = `${GLOBAL_PROMPT}\nUser Query: ${prompt}`;

      try {
        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-4-scout-17b-16e-instruct',
              messages: [{ role: 'user', content: gptPrompt }],
            }),
          }
        );

        const json = await response.json();
        const parsedData = parseGroqContent(json.choices[0].message.content);
        setData(parsedData);
        dispatch(addGptMovies(parsedData));
      } catch (error) {
        console.error('Groq API error:', error);
      } finally {
        setLoading(false);
      }
    };

    getGroqResponse();
  }, [prompt]);

  return { data, loading };
};

export default useGroqApi;
