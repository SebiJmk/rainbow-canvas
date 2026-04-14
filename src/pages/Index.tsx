import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import FeaturedItems from "@/components/FeaturedItems";
import MenuSection from "@/components/MenuSection";
import ReservationSection from "@/components/ReservationSection";
import SocialSection from "@/components/SocialSection";
import StickyBottomBar from "@/components/StickyBottomBar";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  const [loaded, setLoaded] = useState(() => !!sessionStorage.getItem("rc-loaded"));

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className={loaded ? "opacity-100" : "opacity-0"}>
        <HeroSection />
        <FeaturedItems />
        <MenuSection />
        <ReservationSection />
        <SocialSection />
        <ContactFooter />
      </main>
      <StickyBottomBar />
    </>
  );
};

export default Index;
