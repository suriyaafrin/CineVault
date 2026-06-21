// Standalone series data, mirroring src/data/movieData/movieData.js.
// Lives in its own folder so series content can be added/edited
// independently of movies. Shared genres/ageRatings now live in
// src/data/exploreFilters.js so both content types use one filter set.

export const series = [
  {
    id: 101,
    title: "The Last of Us",
    year: 2023,
    seasons: 1,
    episodes: 9,
    genres: ["Drama", "Horror"],
    rating: 8.8,
    ageRating: "TV-MA",
    posterUrl: "/posters/the-last-of-us.jpg",
  },
  {
    id: 102,
    title: "The Witcher",
    year: 2024,
    seasons: 4,
    episodes: 32,
    genres: ["Fantasy", "Action"],
    rating: 7.8,
    ageRating: "TV-MA",
    posterUrl: "/posters/the-witcher.jpg",
  },
  {
    id: 103,
    title: "John Wick: Chapter 4",
    year: 2023,
    seasons: 1,
    episodes: 1,
    genres: ["Action"],
    rating: 7.8,
    ageRating: "TV-14",
    posterUrl: "/posters/john-wick-4.jpg",
  },
  {
    id: 104,
    title: "Stranger Things",
    year: 2024,
    seasons: 5,
    episodes: 42,
    genres: ["Sci-Fi", "Horror", "Drama"],
    rating: 8.7,
    ageRating: "TV-14",
    posterUrl: "/posters/stranger-things.jpg",
  },
  {
    id: 105,
    title: "Spider-Man: The Mileg Chronicles",
    year: 2024,
    seasons: 4,
    episodes: 24,
    genres: ["Action", "Sci-Fi"],
    rating: 8.8,
    ageRating: "TV-PG",
    posterUrl: "/posters/spider-man-series.jpg",
  },
];