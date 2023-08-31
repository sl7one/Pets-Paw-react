import useMedia from "../../hooks/useMedia";
import React, { useRef } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import ModalBurger from "../ModalBurger/ModalBurger";

export default function ButtonBurger() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDesktop } = useMedia();

  const onClick = () => {
    if (ref.current) {
      ref.current.classList.add("opened");
    }
  };

  return (
    <>
      {!isDesktop && (
        <Button onClick={onClick} width={60} height={60} className="burger">
          <Icon name="icon-burger" width={30} height={18} />
        </Button>
      )}
      <ModalBurger ref={ref} />
    </>
  );
}
