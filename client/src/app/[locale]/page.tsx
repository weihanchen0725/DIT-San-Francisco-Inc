import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Home from "@/components/Home/Home";
import News from "@/components/News/News";
import Services from "@/components/Services/Services";
import Tools from "@/components/Tools/Tools";

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a1a]">
        <Home />
        <About />
        <Services />
        <Tools />
        <News />
        <Contact />
    </div>
  );
};

export default HomePage;
