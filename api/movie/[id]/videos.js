import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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
    res.status(500).json({ error: 'Failed to fetch movie videos' });
  }
}
