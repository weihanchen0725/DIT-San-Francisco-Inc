import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Home from "@/components/Home/Home";
import News from "@/components/News/News";
import Services from "@/components/Services/Services";
import Tools from "@/components/Tools/Tools";
import React from "react";

const HomePage = async () => {
  return (
    <React.Fragment>
        <Home />
        <About />
        <Services />
        <Tools />
        <News />
        <Contact />
    </React.Fragment>
  );
};

export default HomePage;
