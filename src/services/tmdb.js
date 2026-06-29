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
export function discoverMovies({
  page = 1,
  sortBy = "popularity.desc",
  genreId = null,
  yearGte = null,
  yearLte = null,
  certification = null,
} = {}) {
  const params = {
    page,
    sort_by: sortBy,
    include_adult: false,
  };
  if (genreId) params.with_genres = genreId;
  if (yearGte) params["primary_release_date.gte"] = `${yearGte}-01-01`;
  if (yearLte) params["primary_release_date.lte"] = `${yearLte}-12-31`;
  if (certification) {
    params.certification_country = "US";
    params.certification = certification;
  }
  return tmdbFetch(`/discover/movie`, params);
}

export function discoverTV({
  page = 1,
  sortBy = "popularity.desc",
  genreId = null,
  yearGte = null,
  yearLte = null,
} = {}) {
  const params = {
    page,
    sort_by: sortBy,
    include_adult: false,
  };
  if (genreId) params.with_genres = genreId;
  if (yearGte) params["first_air_date.gte"] = `${yearGte}-01-01`;
  if (yearLte) params["first_air_date.lte"] = `${yearLte}-12-31`;
  // Note: TV certifications use a different scheme (TV ratings, not MPAA);
  // not wired here — see flag below.
  return tmdbFetch(`/discover/tv`, params);
}

export function getMovieGenres() {
  return tmdbFetch(`/genre/movie/list`);
}

export function getTVGenres() {
  return tmdbFetch(`/genre/tv/list`);
}
export function getTVDetails(id) {
  return tmdbFetch(`/tv/${id}`, { append_to_response: "credits,videos" });
}
export function getCollectionDetails(id) {
  return tmdbFetch(`/collection/${id}`);
}
export function searchMulti(query, page = 1) {
  return tmdbFetch(`/search/multi`, {
    query,
    page,
    include_adult: false,
  });
}