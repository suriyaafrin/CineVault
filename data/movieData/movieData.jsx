// Centralized movie data for the Explore Movies page.
// Each entry has a unique id — use this as the React key, never the array index,
// so duplicate titles in real data never cause rendering bugs.

export const genres = [
  "All Genres",
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Fantasy",
  "Romance",
  "Thriller",
];

export const ageRatings = ["All", "G", "PG", "PG-13", "R", "NC-17"];

export const movies = [
  {
    id: "mv-001",
    title: "Oppenheimer",
    year: 2023,
    duration: "3h 0m",
    rating: 8.6,
    genres: ["Drama", "Thriller"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    id: "mv-002",
    title: "The Batman",
    year: 2022,
    duration: "2h 56m",
    rating: 8.7,
    genres: ["Action", "Crime", "Drama"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: "mv-003",
    title: "Interstellar",
    year: 2014,
    duration: "2h 49m",
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: "mv-004",
    title: "Dune",
    year: 2021,
    duration: "2h 35m",
    rating: 8.0,
    genres: ["Sci-Fi", "Fantasy"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  },
  {
    id: "mv-005",
    title: "The Dark Knight",
    year: 2008,
    duration: "2h 33m",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: "mv-006",
    title: "The Super Mario Bros. Movie",
    year: 2023,
    duration: "1h 32m",
    rating: 7.8,
    genres: ["Comedy", "Fantasy"],
    ageRating: "PG",
    poster:
      "https://image.tmdb.org/t/p/w400/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  },
  {
    id: "mv-007",
    title: "The Last of Us",
    year: 2023,
    duration: "1 Season",
    rating: 9.3,
    genres: ["Drama", "Horror", "Thriller"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/uKvVjHNqB5VmOrdxqWCspHfYTwH.jpg",
  },
  {
    id: "mv-008",
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    duration: "2h 20m",
    rating: 8.6,
    genres: ["Action", "Comedy", "Fantasy"],
    ageRating: "PG",
    poster:
      "https://image.tmdb.org/t/p/w400/8Vt6mWEReuy4Of61Lnj5Xj4jVrW.jpg",
  },
  {
    id: "mv-009",
    title: "John Wick: Chapter 4",
    year: 2023,
    duration: "2h 49m",
    rating: 7.8,
    genres: ["Action", "Thriller"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
  },
  {
    id: "mv-010",
    title: "Killers of the Flower Moon",
    year: 2023,
    duration: "3h 26m",
    rating: 7.7,
    genres: ["Drama", "Thriller"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
  },
  {
    id: "mv-011",
    title: "Everything Everywhere All At Once",
    year: 2022,
    duration: "2h 19m",
    rating: 8.0,
    genres: ["Comedy", "Sci-Fi", "Fantasy"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/u68AjlvlutfEIcpmbYpKcdi09ut.jpg",
  },
  {
    id: "mv-012",
    title: "The Quiet Place",
    year: 2024,
    duration: "1h 39m",
    rating: 7.0,
    genres: ["Horror", "Thriller", "Sci-Fi"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/A4ScLgFlihPK5HmkPkvDpVo3Ddx.jpg",
  },
  {
    id: "mv-013",
    title: "Nimona",
    year: 2023,
    duration: "1h 40m",
    rating: 7.6,
    genres: ["Action", "Comedy", "Fantasy"],
    ageRating: "PG",
    poster:
      "https://image.tmdb.org/t/p/w400/lpXVOWWZbz5L7e1qsZ0qsh5JV4o.jpg",
  },
  {
    id: "mv-014",
    title: "Guardians of the Galaxy Vol. 3",
    year: 2023,
    duration: "2h 30m",
    rating: 7.9,
    genres: ["Action", "Comedy", "Sci-Fi"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/r2J02Z2OpNTctfOSN1Ydgih1czE.jpg",
  },
  {
    id: "mv-015",
    title: "The Marvels",
    year: 2023,
    duration: "1h 45m",
    rating: 6.0,
    genres: ["Action", "Sci-Fi"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/9GBhzXMFjgcZ3FdR9w3bUMMTps9.jpg",
  },
  {
    id: "mv-016",
    title: "Past Lives",
    year: 2023,
    duration: "1h 45m",
    rating: 7.9,
    genres: ["Romance", "Drama"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/h3xS3PtRPL5sExmL2VBouXk3iAI.jpg",
  },
  {
    id: "mv-017",
    title: "Talk to Me",
    year: 2023,
    duration: "1h 35m",
    rating: 7.1,
    genres: ["Horror"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
  },
  {
    id: "mv-018",
    title: "Wonka",
    year: 2023,
    duration: "1h 56m",
    rating: 7.2,
    genres: ["Comedy", "Fantasy"],
    ageRating: "PG",
    poster:
      "https://image.tmdb.org/t/p/w400/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
  },
  {
    id: "mv-019",
    title: "Godzilla Minus One",
    year: 2023,
    duration: "2h 5m",
    rating: 7.7,
    genres: ["Action", "Drama", "Sci-Fi"],
    ageRating: "PG-13",
    poster:
      "https://image.tmdb.org/t/p/w400/h2P5GpQimkfDqRDtAOlqaTjFvFv.jpg",
  },
  {
    id: "mv-020",
    title: "Poor Things",
    year: 2023,
    duration: "2h 21m",
    rating: 7.9,
    genres: ["Comedy", "Drama", "Romance"],
    ageRating: "R",
    poster:
      "https://image.tmdb.org/t/p/w400/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  },
];

export const collections = [
  { id: "col-001", title: "Nolan Collection", meta: "2021 · 2 Items" },
  { id: "col-002", title: "MCU", meta: "555 · 3 Seasons" },
  { id: "col-003", title: "Star Wars", meta: "1981 · 2 Items" },
  { id: "col-004", title: "Trailer", meta: "57 · 12 Items" },
];

export const newAdditions = [
  { id: "new-001", title: "The Batman", poster: movies[1].poster },
  { id: "new-002", title: "Spider-Man", poster: movies[7].poster },
  { id: "new-003", title: "Stranger Things", poster: movies[6].poster },
];