import React from 'react';
import './icons.scss';
import sprite from '../../assets/sprite.svg';

interface IProps {
   name: string;
   width?: number;
   height?: number;
   fill?: string;
   className?: string;
}

export default function Icon({
   name,
   width = 20,
   height = 15.5,
   fill = '#ff868e',
   className="icon"
}: IProps) {
   return (
      <svg
         className={className}
         style={{ width: `${width}px`, height: `${height}px` }}
         fill={fill}
      >
         <use href={sprite + `#${name}`}></use>
      </svg>
   );
}
