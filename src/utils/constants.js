export const LOGIN_BG_URL =
  'https://assets.nflxext.com/ffe/siteui/vlv3/3e4bd046-85a3-40e1-842d-fa11cec84349/web/IN-en-20250818-TRIFECTA-perspective_4bd1b66d-bbb6-4bc6-ba8f-ecbba53a1278_large.jpg';

export const USER_PHOTO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF_tRkE7eXZv9qAool8sYTkJ0rdgJv5Svyg&s';

export const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_AUTHORIZATION}`,
  },
};

export const SUPPORTED_LANGUAGES = [
  { identifier: 'en', name: 'English' },
  { identifier: 'hindi', name: 'Hindi' },
  { identifier: 'spanish', name: 'Spanish' },
];

export const GLOBAL_PROMPT_1 = `
You are a Movie Recommendation System.  

Rules for response:
1. Group movies into categories (like Genre, Era, or Theme).  
2. Each category must start with: **Category Name:**  
3. Under each category, list movies in this format:  
   1. **Movie Title (Year):** Short description (2–3 sentences) including genre, plot, and why it’s worth watching.  
4. Always include the release year in parentheses.  
5. Always provide a description (don’t skip).  
6. Keep formatting consistent (use ** for bold).  
7. Minimum 4 movies per category.  
`;

export const GLOBAL_PROMPT = `
You are a Movie Recommendation System.

Rules for response:
1. Focus on the user query and suggest only movies relevant to it.
2. Group movies into categories (like Genre, Era, or Theme) based on the query.
3. Each category must start with: **Category Name:**
4. Under each category, list 6–7 movies in this format:
   1. Movie Title
5. Do NOT include any description, genre, or release year — only titles.
6. Keep formatting consistent (use numbering or bullets if you want, but no bolding needed unless you want).
7. Ensure minimum 1 category, maximum 2 categories per response (focused on user query).
8. Do not include unrelated movies.
`;
