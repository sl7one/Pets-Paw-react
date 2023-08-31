import { Link } from "react-router-dom";
import React from "react";
import Icon from "../Icon/Icon";
import { useLocation } from "react-router-dom";
import "./like-links.scss";

export default function LikeLinks() {
  const { pathname }: { pathname: string } = useLocation();

  return (
    <div className="page-header-wrapper">
      <div className="like-links">
        <Link
          to="/likes"
          className={
            pathname === "/likes"
              ? "like-links__item active"
              : "like-links__item"
          }>
          <Icon name="icon-like" width={30} height={30} />
        </Link>
        <Link
          to="/favourites"
          className={
            pathname === "/favourites"
              ? "like-links__item active"
              : "like-links__item"
          }>
          <Icon name="icon-favorite" width={30} height={26} />
        </Link>
        <Link
          to="/dislikes"
          className={
            pathname === "/dislikes"
              ? "like-links__item active"
              : "like-links__item"
          }>
          <Icon name="icon-dislike" width={30} height={30} />
        </Link>
      </div>
    </div>
  );
}
