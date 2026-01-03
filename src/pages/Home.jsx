import React from "react";
import Banner from "../components/Home/Banner";
import Services from "../components/Home/Services";
import HowItWorks from "../components/Home/HowItWorks";
import TrustedBy from "../components/Home/TrustedBy";
import Guarantee from "../components/Home/Guarantee";
import Priority from "../components/Home/Priority";
import TestimonialCarousel from "../components/Home/TestimonialCarousel";

const Home = () => {
  return (
    <div className="webWidth">
      <Banner />
      <HowItWorks />
      <Services />
      <TrustedBy />
      <Guarantee />
      <Priority />
      <TestimonialCarousel />
    </div>
  );
};

export default Home;
