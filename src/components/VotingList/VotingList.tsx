import React from 'react';
import Loader from '../Loader/Loader';
import './voting-list.scss';
import Icon from '../Icon/Icon';

type VotesType = {
   image_id: string;
   created_at: Date;
   value: number;
};

interface IProps {
   list: VotesType[];
   isLoading: boolean;
}

type VotesUtils = {
   text: string;
   icon: React.ReactElement;
};

const createIconElement = (name: string, fill: string) => (
   <Icon
      name={name}
      width={20}
      height={20}
      fill={fill}
   />
);

const votes: Record<'0' | '1' | '-1', VotesUtils> = {
   '0': {
      text: 'Favorites',
      icon: createIconElement('icon-favorite', '#ff868e'),
   },
   '1': {
      text: 'Likes',
      icon: createIconElement('icon-like', '#97eab9'),
   },
   '-1': {
      text: 'Dislikes',
      icon: createIconElement('icon-dislike', '#ffd280'),
   },
};

export default function VotingList({ list, isLoading }: IProps) {
   return (
      <>
         {isLoading ? (
            <Loader
               width={80}
               height={80}
            />
         ) : (
            <ul className="votes__list">
               {list.map(({ image_id, created_at, value }, idx: number) => {
                  const date = new Date(created_at);
                  const hh = date.getUTCHours().toString().padStart(2, '0');
                  const mm = date.getUTCMinutes().toString().padStart(2, '0');

                  return (
                     <li
                        key={image_id + idx}
                        className="votes__item"
                     >
                        <span className="votes__item-date">{hh + ' : ' + mm}</span>
                        <p className="votes__item-text">
                           Image ID: <span>{image_id}</span> was added to{' '}
                           {
                              <span>
                                 {
                                    //@ts-ignore
                                    votes[value.toString()].text
                                 }
                              </span>
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
