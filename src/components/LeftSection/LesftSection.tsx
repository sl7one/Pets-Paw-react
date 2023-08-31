import React from "react";
import Navigation from "../Navigation/Navigation";

import hi from "../../assets/hi.png" ;
import logo from "../../assets/logo.svg" ;

export default function LesftSection() {
  return (
    <section className="home__left ">
      <div className="home__left-sticky">
        <img src={logo} alt="logo" width={106} height={24} />
        <img className="home__hi" src={hi} alt="hi" width={103} height={46} />
        <p className="home__text">Welcome to MacPaw Bootcamp 2023</p>
        <p className="home__header">Lets start using The Cat API</p>
        <Navigation />
      </div>
    </section>
  );
}
