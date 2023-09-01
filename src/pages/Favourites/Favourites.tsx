import BackComponent from '../../components/BackComponent/BackComponent';
import LesftSection from '../../components/LeftSection/LesftSection';
import { getFavorites, getVotes } from '../../API/api';
import { useFetch } from '../../hooks/useFeth';
import SearchBar from '../../components/SearchBar/SearchBar';
import LikeLinks from '../../components/LikeLinks/LikeLinks';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import useMedia from '../../hooks/useMedia';
import ButtonBurger from '../../components/ButtonBurrger/ButtonBurger';
import '../Likes/likes.scss';
import './favorites.scss';
import { useCallback, useState } from 'react';
import VotingList from '../../components/VotingList/VotingList';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

import defImg from '../../assets/default.jpg';

export type OptionType = {
   label: string;
   value: string | number;
};

export type SelectEventType = {
   id: string;
   value: string;
};

const Favourites = () => {
   const { isMobile, isTablet } = useMedia();
   const [vote, setVote] = useState(null);
   const [value, setValue] = useState('');

   const {
      data: catsData,
      isLoading: catsIsLoading,
   } = useFetch({
      api_cb: getFavorites,
   });

   const { data: dataVotes, isLoading: isLoadingVotes } = useFetch({
      api_cb: getVotes,
      dependency: vote,
   });

   const {
      data: dataFavorites = null,
   } = useFetch({
      api_cb: getFavorites,
   });

   const onChangeSearchForm = useCallback((value: string) => {
      setValue(value);
   }, []);

   const items = catsData.map((cat) => {
      //@ts-ignore
      const favorite = dataFavorites.find((fav) => cat.image_id === fav.image_id);
      if (!favorite) {
         return cat;
      }
      //@ts-ignore
      return { ...cat, favoriteId: favorite.id };
   });

   return (
      <main className="favorites home container">
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
                  <div className="breeds__header-wrapper"></div>
               </div>
               {catsIsLoading ? (
                  <Loader />
               ) : (
                  <GalleryGrid
                     galleryList={items}
                     render={({ id, image, name, favoriteId }) => (
                        <div
                           key={id}
                           className="gallery-list__item"
                        >
                           <img
                              src={image?.url ? image.url : defImg}
                              alt={'cat '}
                              width={image?.width ? image.width : 500}
                              height={image?.height ? image.height : 500}
                           />
                           <Button
                              width={40}
                              height={40}
                              className="like-gallery-item"
                              isDisabled={isLoadingVotes}
                           >
                              {!favoriteId ? (
                                 <Icon
                                    name="icon-favorite"
                                    width={20}
                                    height={20}
                                 />
                              ) : (
                                 <Icon
                                    name="icon-favorite-filled"
                                    width={20}
                                    height={20}
                                 />
                              )}
                           </Button>
                        </div>
                     )}
                  />
               )}

               <VotingList
                  //@ts-ignore
                  list={dataVotes}
                  isLoading={isLoadingVotes}
               />
            </div>
         </section>
      </main>
   );
};

export default Favourites;
