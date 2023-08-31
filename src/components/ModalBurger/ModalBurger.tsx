import React, { forwardRef } from "react";
import "./ModalBurger";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import "./modal-burger.scss";
import Navigation from "../Navigation/Navigation";

const ModalBurger = forwardRef((_, ref: any) => {
  const onClickClose = () => {
    ref.current.classList.remove("opened");
  };

  return (
    <div ref={ref} className="modal-burger">
      <Button width={40} height={40} onClick={onClickClose} className="close">
        <Icon name="icon-cross" width={17} height={17} />
      </Button>

      <Navigation />
    </div>
  );
});

ModalBurger.displayName = "ModalBurger";
export default ModalBurger;
