import React from 'react';
import "../assets/scss/landingpage.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/landingpage/NavBar";
import { Banner } from "../components/landingpage/Banner";
import { Skills } from "../components/landingpage/Skills";
import { Projects } from "../components/landingpage/Projects";
import { Contact } from "../components/landingpage/Contact";
import { Footer } from "../components/landingpage/Footer";

function exploreWindow() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default exploreWindow;
