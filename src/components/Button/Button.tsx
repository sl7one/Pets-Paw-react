
import React, { ReactElement } from 'react';
import './button.scss';

interface IProps {
   width?: number;
   height?: number;
   children: ReactElement;
   className?: string;
   type?: "button" | "submit";
   isDisabled?: boolean;
   onClick?: () => void ;
}

export default function Button({
   width = 40,
   height = 40,
   children,
   className,
   type = 'button',
   isDisabled = false,
   onClick,
}: IProps) {
   return (
      <button
         className={className ? `button ${className}` : 'button'}
         style={{ width: `${width}px`, height: `${height}px` }}
         onClick={onClick}
         type={type}
         disabled={isDisabled}
      >
         {children}
      </button>
   );
}
