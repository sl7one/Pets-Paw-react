import BackComponent from '../../components/BackComponent/BackComponent';
import LesftSection from '../../components/LeftSection/LesftSection';
import { getBreeds } from '../../API/api.js';
import { useFetch } from '../../hooks/useFeth';
import SearchBar from '../../components/SearchBar/SearchBar';
import LikeLinks from '../../components/LikeLinks/LikeLinks';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import useMedia from '../../hooks/useMedia';
import ButtonBurger from '../../components/ButtonBurrger/ButtonBurger';
import '../Likes/likes.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import defImg from '../../assets/default.jpg';


const Search = () => {
   const [searchParams] = useSearchParams();
   const q: string | null = searchParams.get('q');
   const { isMobile, isTablet } = useMedia();

   const [value, setValue] = useState(q);

   const { data: catsData, isLoading: catsIsLoading } = useFetch({
      api_cb: getBreeds,
      storage: true,
   });

   const onChange = (value: string) => {
      setValue(value);
   };

   const items = catsData.filter(({ name }: { name: string }) =>
      name.toLowerCase().includes(value?.toLowerCase() || "")
   );

   return (
      <main className="search home container">
         {!isMobile && !isTablet && <LesftSection />}
         <section className="home__right">
            <div className="page__header">
               <ButtonBurger />
               <SearchBar
                  //@ts-ignore
                  value={value}
                  setValue={setValue}
                  onChange={onChange}
               />
               <LikeLinks />
            </div>
            <div className="page__body">
               <div className="breeds__body-header">
                  <BackComponent />
                  <div className="breeds__header-wrapper"></div>
               </div>
               <p className="search-results">
                  Search results for: <span>{value}</span>
               </p>
               {catsIsLoading ? (
                  <Loader />
               ) : (
                  <GalleryGrid
                     galleryList={items}
                     render={({ id, image, name }) => (
                        <Link
                           to={`/breeds/${id}`}
                           key={id}
                           className="gallery-list__item"
                        >
                           <img
                              src={image?.url ? image.url : defImg}
                              alt={name}
                              width={image?.width ? image.width : 500}
                              height={image?.height ? image.height : 500}
                           />
                           <p>{name}</p>
                        </Link>
                     )}
                  />
               )}
            </div>
         </section>
      </main>
   );
};

export default Search;
