import {
  collections as movieCollections,
  newAdditions as movieNewAdditions,
} from "../../data/movieData/movieData";
import {
  collections as seriesCollections,
  newAdditions as seriesNewAdditions,
} from "../../data/seriesData/seriesData";

export default function ExploreSidebar({ type = "movie" }) {
  const isSeries = type === "series";
  const collections = isSeries ? seriesCollections : movieCollections;
  const newAdditions = isSeries ? seriesNewAdditions : movieNewAdditions;

  return (
    <aside className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">
          Top {isSeries ? "Series" : "Movie"} Collections
        </h2>
        <ul className="space-y-3">
          {collections.map((col) => (
            <li key={col.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gray-900 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {col.title}
                </p>
                <p className="text-xs text-gray-400">{col.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">New Additions</h2>
        <div className="space-y-3">
          {newAdditions.map((item) => (
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