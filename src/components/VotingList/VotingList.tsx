import React from "react";
import Loader from "../Loader/Loader";
import "./voting-list.scss";
import Icon from "../Icon/Icon";

type VotesType = {
  image_id: string;
  created_at: Date;
  value: number;
};

interface IProps {
  list: VotesType[];
  isLoading: boolean;
}

const votes: {
  1: { text: string; icon: React.ReactElement };
  0: { text: string; icon: React.ReactElement };
  "-1": { text: string; icon: React.ReactElement };
} = {
  0: {
    text: "Favorites",
    icon: <Icon name="icon-favorite" width={20} height={20} fill="#ff868e" />,
  },
  1: {
    text: "Likes",
    icon: <Icon name="icon-like" width={20} height={20} fill="#97eab9" />,
  },
  "-1": {
    text: "Dislikes",
    icon: <Icon name="icon-dislike" width={20} height={20} fill="#ffd280" />,
  },
};

export default function VotingList({ list, isLoading }: IProps) {
  return (
    <>
      {isLoading ? (
        <Loader width={80} height={80} />
      ) : (
        <ul className="votes__list">
          {list.map(({ image_id, created_at, value }) => {
            const date = new Date(created_at);
            const hh = date.getUTCHours().toString().padStart(2, "0");
            const mm = date.getUTCMinutes().toString().padStart(2, "0");

            return (
              <li key={image_id} className="votes__item">
                <span className="votes__item-date">{hh + " : " + mm}</span>
                <p className="votes__item-text">
                  Image ID: <span>{image_id}</span> was added to{" "}
                  {
                    //@ts-ignore
                    <span>{votes[value].text}</span>
                  }
                </p>

                {
                  //@ts-ignore
                  votes[value].icon
                }
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
