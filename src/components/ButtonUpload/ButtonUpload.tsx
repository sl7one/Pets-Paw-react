import React, { useRef } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";

export default function ButtonUpload() {
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickUpload = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("opened");
    }
  };

  return (
    <>
      <Button
        className="upload"
        onClick={onClickUpload}
        type="button"
        width={143}>
        <span>
          <Icon name="icon-upload" width={16} height={16} /> upload
        </span>
      </Button>
      <Modal ref={modalRef} />
    </>
  );
}
