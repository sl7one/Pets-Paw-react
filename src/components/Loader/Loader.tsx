import React from 'react';
import './loader.scss';

interface IProps {
   width?: number;
   height?: number;
}

export default function Loader({ width = 40, height = 40 }: IProps) {
   return (
      <div
         className="lds-ripple"
         style={{ width: width + 'px', height: height + 'px' }}
      >
         <div></div>
         <div></div>
      </div>
   );
}
