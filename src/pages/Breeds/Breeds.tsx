import { useCallback, useMemo, useState } from 'react';
import BackComponent from '../../components/BackComponent/BackComponent';
import LesftSection from '../../components/LeftSection/LesftSection';
import { getBreeds } from '../../API/api';
import { useFetch } from '../../hooks/useFeth';
import './breeds.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import LikeLinks from '../../components/LikeLinks/LikeLinks';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import { optionsLimit } from '../../utils/utils.js';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import ButtonBurger from '../../components/ButtonBurrger/ButtonBurger';

import defImg from '../../assets/default.jpg';

export type OptionType = {
   label: string;
   value: string | number;
};

export type SelectEventType = {
   id: string;
   value: string;
};

const Breeds = () => {
   const { isMobile, isTablet } = useMedia();
   const [filter, setFilter] = useState({
      order: 'Random',
      type: 'All',
      limit: 10,
      breed: 'None',
   });
   const [value, setValue] = useState('');

   const { data: catsData, isLoading: catsIsLoading } = useFetch({
      api_cb: useCallback(() => getBreeds(filter), [filter]),
      dependency: filter,
   });

   const {
      data: optionsData,
      isLoading: optionsIsLoading,
   } = useFetch({
      api_cb: getBreeds,
      storage: true,
      storageKey: 'breedsOptionts',
   });

   const optionsBreeds: OptionType[] = useMemo(
      () =>
         optionsData.map(({ name }: { name: string }) => ({
            label: name,
            value: name.toLowerCase(),
         })),
      [optionsData]
   );

   const onChange = ({ id, value }: SelectEventType) => {
      setFilter((prev) => ({ ...prev, [id]: value }));
   };

   const onChangeSearchForm = useCallback((value: string) => {
      setValue(value);
   }, []);

   return (
      <main className="breeds home container">
         {!isMobile && !isTablet && <LesftSection />}
         <section className="home__right">
            <div className="page__header">
               <ButtonBurger />
               <SearchBar
                  value={value}
                  onChange={onChangeSearchForm}
               />
               <LikeLinks />
            </div>
            <div className="page__body">
               <div className="breeds__body-header">
                  <BackComponent />
                  <div className="breeds__header-wrapper">
                     <SelectComponent
                        options={optionsBreeds}
                        isDisabled={optionsIsLoading}
                        onChange={onChange}
                        id="option"
                        defaulValue={{ label: 'All breeds', value: 'None' }}
                     />
                     <div className="breeds__nested-header-wrapper">
                        <SelectComponent
                           options={optionsLimit}
                           defaulValue={{
                              label: `Limit: ${filter.limit}`,
                              value: filter.limit,
                           }}
                           onChange={onChange}
                           id="limit"
                        />
                        <Button
                           height={40}
                           width={40}
                           className="sort"
                           onClick={() =>
                              setFilter((prev) => ({ ...prev, order: 'desc' }))
                           }
                        >
                           <Icon
                              height={22}
                              width={18.5}
                              name="icon-desc"
                           />
                        </Button>
                        <Button
                           height={40}
                           width={40}
                           className="sort"
                           onClick={() =>
                              setFilter((prev) => ({ ...prev, order: 'asc' }))
                           }
                        >
                           <Icon
                              height={22}
                              width={18.5}
                              name="icon-asc"
                           />
                        </Button>
                     </div>
                  </div>
               </div>
               {catsIsLoading ? (
                  <Loader />
               ) : (
                  <GalleryGrid
                     galleryList={catsData}
                     render={({ id, image, name }) => (
                        <Link
                           to={`/breeds/${id}`}
                           key={id}
                           className="gallery-list__item"
                        >
                           <img
                              src={image?.url ? image.url : defImg}
                              alt={name}
                              width={image?.width && 500}
                              height={image?.height && 500}
                           />
                           <p className="gallery-list__item-text">{name}</p>
                        </Link>
                     )}
                  />
               )}
            </div>
         </section>
      </main>
   );
};

export default Breeds;
