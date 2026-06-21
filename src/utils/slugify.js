// Converts a movie title (+ optional year, for disambiguating remakes/sequels
// with the same title) into a URL-safe slug for /movie/:slug routes.
//
// "The Batman" -> "the-batman"
// "Dune", 2021  -> "dune-2021"  (pass includeYear: true when titles collide)

export function slugify(title, { year, includeYear = false } = {}) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // strip punctuation (colons, apostrophes, etc.)
    .replace(/\s+/g, "-") // spaces -> hyphens
    .replace(/-+/g, "-"); // collapse repeated hyphens

  return includeYear && year ? `${base}-${year}` : base;
}