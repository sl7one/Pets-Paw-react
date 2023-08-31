import React from "react";
import MainButton from "../MainButton/MainButton";
import { useLocation } from "react-router-dom";

import voting from "../../assets/voting.png";
import breeds from "../../assets/breeds.png";
import gallery from "../../assets/gallery.png";

export default function Navigation() {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <nav className="home__left-wrapper">
      <MainButton
        linkImage={voting}
        linkPath="/voting"
        linkName="voting"
        className="voting"
        width={100}
        height={124.5}
        isActive={pathname === "/voting" ? true : false}
      />
      <MainButton
        linkImage={breeds}
        linkPath="/breeds"
        linkName="breeds"
        className="breeds"
        width={117}
        height={163}
        isActive={pathname === "/breeds" ? true : false}
      />
      <MainButton
        linkImage={gallery}
        linkPath="/gallery"
        linkName="gallery"
        className="gallery"
        width={112}
        height={186}
        isActive={pathname === "/gallery" ? true : false}
      />
    </nav>
  );
}
