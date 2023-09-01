import React from 'react';
import './search-bar.scss';
import Icon from '../Icon/Icon';
import { Link } from 'react-router-dom';

interface IProps {
   value: string;
   onChange: (value: string) => void;
}

export default function SearchBar({ value = '', onChange }: IProps) {
   return (
      <form className="search-bar">
         <input
            type="text"
            value={value}
            placeholder="Search for breeds by name"
            onChange={({ target: { value } }) => onChange(value.toLowerCase())}
         />
         <Link
            className="submit"
            to={`/search?q=${value}`}
         >
            <Icon
               name="icon-search"
               height={20}
               width={20}
            ></Icon>
         </Link>
      </form>
   );
}
