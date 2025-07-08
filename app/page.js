import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import StatsBar from "./components/status";
import BusinessShowcase from "./components/businessshowcase";
import Footer from "./components/footer";
export default function Home() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
      {/* <Navbar /> */}
      <HeroSection />
      <StatsBar />
      <BusinessShowcase />
      {/* <Footer /> */}
    </div>

    </>
  );
}

