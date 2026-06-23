import { useGlobalStore } from "./useGlobalStore";

// Fixed x/y positions on the 800x400 viewBox below, hand-placed to
// roughly match each region on the simplified world silhouette.
const pinPositions = {
  "Southeast Asia": { x: 600, y: 200 },
  "North America": { x: 180, y: 130 },
  "Western Europe": { x: 390, y: 110 },
  "South America": { x: 250, y: 280 },
};

function HotspotMap() {
  const hotspots = useGlobalStore((state) => state.hotspots);
  const openHotspotModal = useGlobalStore((state) => state.openHotspotModal);

  return (
    <div className="relative bg-[#16181C] rounded-xl overflow-hidden ">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        role="img"
        aria-label="World map showing regions with trending content"
      >
        {/* simplified landmass silhouettes, decorative only */}
        <ellipse cx="190" cy="150" rx="95" ry="60" fill="#22252B" />
        <ellipse cx="250" cy="290" rx="70" ry="55" fill="#22252B" />
        <ellipse cx="390" cy="120" rx="55" ry="40" fill="#22252B" />
        <ellipse cx="430" cy="220" rx="70" ry="50" fill="#22252B" />
        <ellipse cx="600" cy="190" rx="95" ry="65" fill="#22252B" />
        <ellipse cx="700" cy="290" rx="50" ry="35" fill="#22252B" />

        {hotspots.map((hotspot) => {
          const pos = pinPositions[hotspot.region];
          if (!pos) return null;
          return (
            <g
              key={hotspot.id}
              onClick={() => openHotspotModal(hotspot.id)}
              className="cursor-pointer"
            >
              <circle cx={pos.x} cy={pos.y} r="5" fill="#C8102E">
                <animate
                  attributeName="r"
                  values="5;11;5"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={pos.x} cy={pos.y} r="5" fill="#C8102E" />
              <text
                x={pos.x + 12}
                y={pos.y - 4}
                fontSize="13"
                fill="#F09595"
                fontWeight="500"
              >
                {hotspot.genre} trending
              </text>
              <text
                x={pos.x + 12}
                y={pos.y + 11}
                fontSize="11"
                fill="#888780"
              >
                {hotspot.region}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default HotspotMap;