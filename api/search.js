import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API_AUTHORIZATION}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search movies' });
  }
}
