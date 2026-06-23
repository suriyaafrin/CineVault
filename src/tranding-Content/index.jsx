import React from "react";
import TrendingHero from "./trendingHero";
import TrendingMovieCard from "./trendingMovieCard";
import TrendingSection from "./trendingSec";
import CommunitySection from "./communitySec";
import GlobalHotspotsSection from "./globalHotSpotSec";
import PersonalTrendingSection from "./personalTrendingSection";


function TrendingContent() {
  return (
    <div>
      <TrendingHero />
      <TrendingMovieCard />
      <TrendingSection />
      <CommunitySection />
      <section className="m-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
        <GlobalHotspotsSection />
        <PersonalTrendingSection />
      </section>
    </div>
  );
}

export default TrendingContent;
