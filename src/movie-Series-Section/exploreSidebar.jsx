import { useEffect, useState } from "react";
import { getCollectionDetails, getNowPlayingMovies, getImageUrl } from "../services/tmdb";
import { FEATURED_MOVIE_COLLECTION_IDS } from "./featuredCollectionIds";

export default function ExploreSidebar({ type = "movie" }) {
  const isSeries = type === "series";

  const [collections, setCollections] = useState([]);
  const [newAdditions, setNewAdditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadSidebarData() {
      try {
        const collectionsPromise = isSeries
          ? Promise.resolve([])
          : Promise.allSettled(
              FEATURED_MOVIE_COLLECTION_IDS.map((id) => getCollectionDetails(id))
            ).then((results) =>
              results
                .filter((r) => r.status === "fulfilled")
                .map((r) => r.value)
            );
        const newAdditionsPromise = getNowPlayingMovies();

        const [collectionResults, newAdditionsData] = await Promise.all([
          collectionsPromise,
          newAdditionsPromise,
        ]);

        if (!isMounted) return;

        const mappedCollections = collectionResults.map((col) => ({
          id: col.id,
          title: col.name,
          meta: `${col.parts?.length || 0} Items`,
          poster: getImageUrl(col.poster_path),
        }));

        const mappedNewAdditions = (newAdditionsData.results || [])
          .slice(0, 3)
          .map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster: getImageUrl(movie.poster_path),
          }));

        setCollections(mappedCollections);
        setNewAdditions(mappedNewAdditions);
      } catch (err) {
        console.error("Failed to load sidebar data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSidebarData();
    return () => {
      isMounted = false;
    };
  }, [isSeries]);

  return (
    <aside className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-[#C8102E] mb-3">
          Top {isSeries ? "Series" : "Movie"} Collections
        </h2>

        {isSeries ? (
          <p className="text-xs text-gray-400">No collections available for series.</p>
        ) : loading ? (
          <ul className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gray-200 shrink-0 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-2 w-1/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {collections.map((col) => (
              <li key={col.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gray-900 shrink-0 overflow-hidden">
                  {col.poster && (
                    <img
                      src={col.poster}
                      alt={col.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#C8102E] leading-tight">
                    {col.title}
                  </p>
                  <p className="text-xs text-gray-400">{col.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-sm font-bold text-[#C8102E] mb-3">New Additions</h2>
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden aspect-16/10 bg-gray-200 animate-pulse"
                />
              ))
            : newAdditions.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg overflow-hidden aspect-16/10"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    {item.title}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </aside>
  );
}