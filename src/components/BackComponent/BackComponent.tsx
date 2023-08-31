import React from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import RoutName from "../RoutName/RoutName";
import "./back-component.scss";
import { useNavigate } from "react-router-dom";

export default function BackComponent() {
  const navigate = useNavigate();

  return (
    <div className="back-component">
      <Button onClick={() => navigate(-1)}>
        <Icon name="icon-arrow-left" />
      </Button>
      <RoutName />
    </div>
  );
}
