import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import MenuCTA from "@/components/MenuCTA";
import SocialSection from "@/components/SocialSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";


const Index = () => {
  const [loaded, setLoaded] = useState(() => !!sessionStorage.getItem("rc-loaded"));
  const onLoadComplete = useCallback(() => setLoaded(true), []);
  const location = useLocation();

  useEffect(() => {
    if (loaded && location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [loaded, location.state]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className={loaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
        <HeroSection />
        <FeaturedSection />
        <MenuCTA />
        <SocialSection />
        <ReservationSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
