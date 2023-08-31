import React from "react";
import "./like-buttons.scss";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import useMedia from "../../hooks/useMedia";

interface IProps {
  onClickVote: (value: number) => void;
  onClickFavorite: () => void;
  isDisabled: boolean;
  isAddedToFavorites: boolean;
}

export default function LikeButtons({
  onClickVote,
  onClickFavorite,
  isDisabled,
  isAddedToFavorites,
}: IProps) {
  const { isMobile } = useMedia();
  return (
    <div className="like-buttons">
      <Button
        className="mint"
        width={isMobile ? 60 : 80}
        height={isMobile ? 60 : 80}
        onClick={() => onClickVote(1)}
        isDisabled={isDisabled}>
        <Icon
          name="icon-like"
          width={isMobile ? 22.5 : 30}
          height={isMobile ? 22.5 : 30}
        />
      </Button>
      <Button
        className={isAddedToFavorites ? "pink added-to-fav" : "pink"}
        width={isMobile ? 60 : 80}
        height={isMobile ? 60 : 80}
        onClick={onClickFavorite}
        isDisabled={isDisabled}>
        {isAddedToFavorites ? (
          <Icon
            name="icon-heart-fill"
            width={isMobile ? 22.5 : 30}
            height={isMobile ? 22.5 : 30}
            className="icon filled"
          />
        ) : (
          <Icon
            name="icon-favorite"
            width={isMobile ? 22.5 : 30}
            height={isMobile ? 22.5 : 30}
            className="icon stroke"
          />
        )}
      </Button>
      <Button
        className="orange"
        width={isMobile ? 60 : 80}
        height={isMobile ? 60 : 80}
        onClick={() => onClickVote(-1)}
        isDisabled={isDisabled}>
        <Icon
          name="icon-dislike"
          width={isMobile ? 22.5 : 30}
          height={isMobile ? 22.5 : 30}
        />
      </Button>
    </div>
  );
}
