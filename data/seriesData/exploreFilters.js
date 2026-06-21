// Shared filter constants used by both movies and series.
// Age ratings are unified across film (G/PG/PG-13/R) and TV (TV-Y/TV-PG/TV-14/TV-MA)
// scales so one dropdown and one Zustand filter works for both content types.

export const genres = [
  "All Genres",
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Fantasy",
  "Romance",
];

export const ageRatings = [
  "All",
  "G",
  "PG",
  "PG-13",
  "R",
  "TV-Y",
  "TV-PG",
  "TV-14",
  "TV-MA",
];