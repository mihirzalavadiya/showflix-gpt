import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.post('/api/groq', async (req, res) => {
  try {
    const { gptPrompt } = req.body;
    if (!gptPrompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

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
    res.json(data);
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({ error: 'Failed to fetch from Groq API' });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_AUTHORIZATION}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('TMDB API error:', error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

app.get('/api/movies/:type', async (req, res) => {
  try {
    const { type } = req.params; // now_playing | popular | top_rated | upcoming

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?page=1&language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_AUTHORIZATION}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} movies`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('TMDB Movies API error:', error);
    res.status(500).json({ error: 'Failed to fetch movies list' });
  }
});

app.get('/api/movie/:id/videos', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_AUTHORIZATION}`, // safe key
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie videos');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('TMDB Videos API error:', error);
    res.status(500).json({ error: 'Failed to fetch movie videos' });
  }
});

// server.js
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_AUTHORIZATION}`, // safe
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('TMDB Search API error:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

app.listen(3000, () =>
  console.log('✅ API server running at http://localhost:3000')
);
