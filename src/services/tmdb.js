const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function tmdbFetch(endpoint, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, ...params }).toString();
  const url = `${BASE_URL}${endpoint}?${query}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDb request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function fetchTrending(mediaType = "movie", timeWindow = "week") {
  return tmdbFetch(`/trending/${mediaType}/${timeWindow}`);
}

export function getTopRatedMovies(page = 1) {
  return tmdbFetch(`/movie/top_rated`, { page });
}

export function getTopRatedTV(page = 1) {
  return tmdbFetch(`/tv/top_rated`, { page });
}

export function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`, { append_to_response: "credits,videos" });
}

export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
export function getPopularMovies(page = 1) {
  return tmdbFetch(`/movie/popular`, { page });
}
export function getNowPlayingMovies(page = 1) {
  return tmdbFetch(`/movie/now_playing`, { page });
}