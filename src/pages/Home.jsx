import React from 'react'
import HeroSection from "../components/home/HeroSection";
import Weather from "../components/home/Weather";
import Content from "../components/home/Content";
export const Home = () => {
  return (
    <>
   <HeroSection/>
   <Weather/>
   <Content />
    </>
    
  )
}
export default Home