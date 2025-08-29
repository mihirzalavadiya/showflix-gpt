import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?page=1`,
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
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
