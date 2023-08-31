import { Link } from "react-router-dom";
import React from "react";
import "./main-button.scss";
import useMedia from "../../hooks/useMedia";

interface IProps {
  linkPath: string;
  linkImage: string;
  linkName: string;
  className?: string;
  width: number;
  height: number;
  isActive?: boolean;
}

export default function MainButton({
  linkPath,
  linkImage,
  linkName,
  className,
  isActive = false,
  width,
  height,
}: IProps) {
  const { isMobile } = useMedia();
  return (
    <Link
      to={linkPath}
      className={!isActive ? `main-button` : "main-button active"}>
      {!isMobile && (
        <div className={`thumb ${className}`}>
          <img src={linkImage} alt={linkName} width={width} height={height} />
        </div>
      )}
      <span>{linkName}</span>
    </Link>
  );
}
