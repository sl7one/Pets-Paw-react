import React, { forwardRef } from "react";
import "./modal.scss";
import DropZone from "../DropZone/DropZone";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const Modal = forwardRef((_, ref: any) => {
  const onClickClose = () => {
    if (ref.current) {
      ref.current.classList.remove("opened");
    }
  };

  return (
    <div className="overlay" ref={ref}>
      <div className="modal">
        <Button width={40} height={40} onClick={onClickClose} className="close">
          <Icon name="icon-cross" width={17} height={17} />
        </Button>
        <h2 className="modal__header">Upload a .jpg or .png Cat Image</h2>
        <p className="modal__text">
          Any uploads must comply with the upload{" "}
          {
            <Link to="https://thecatapi.com/privacy" target="_blank">
              upload guidelines
            </Link>
          }{" "}
          or face deletion.
        </p>
        <DropZone />
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
