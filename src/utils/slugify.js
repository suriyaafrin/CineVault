export function slugify(title, { year, includeYear = false } = {}) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-") 
    .replace(/-+/g, "-");

  return includeYear && year ? `${base}-${year}` : base;
}