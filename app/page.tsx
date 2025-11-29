import { Feature72 } from "@/components/feature72";
import Footer from "@/components/footer";
import { Hero7 } from "@/components/hero7";
import { Navbar03 } from "@/components/navBar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar03 />

      {/* Hero Section */}
      <Hero7 />

      {/* Section 1 */}
      <Feature72 title={"fsdfsdaf"} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
