import BackComponent from '../../components/BackComponent/BackComponent';
import Button from '../../components/Button/Button';
import FilterForm from '../../components/FilterForm/FilterForm';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import LesftSection from '../../components/LeftSection/LesftSection';
import LikeLinks from '../../components/LikeLinks/LikeLinks';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useFetch } from '../../hooks/useFeth';
import { addToFavorites, deleteFromFavorites, getCatsGallery } from '../../API/api';
import Icon from '../../components/Icon/Icon';
import Loader from '../../components/Loader/Loader';
import { useCallback, useState } from 'react';
import './gallery.scss';
import useMedia from '../../hooks/useMedia';
import ButtonBurger from '../../components/ButtonBurrger/ButtonBurger';
import ButtonUpload from '../../components/ButtonUpload/ButtonUpload';
import { toast } from 'react-toastify';

import defImg from '../../assets/default.jpg';

const Gallery = () => {
   const { isMobile, isTablet } = useMedia();
   const [form, setForm] = useState({
      breed: 'None',
      limit: 5,
      order: 'Random',
      type: 'Static',
   });
   const [submitTrigger, setSubmitTrigger] = useState(null);
   const [handleIsLoading, setHandleIsLoading] = useState(false);
   const [valueSearchForm, setValueSearchForm] = useState('');

   const { data, isLoading } = useFetch({
      api_cb: useCallback(() => getCatsGallery(form), [form]),
      dependency: submitTrigger,
   });

   //@ts-ignore
   const onChange = ({ id, value }) => {
      setForm((prev) => ({ ...prev, [id]: value }));
   };

   const onClickSubmit = (e: any) => {
      e.preventDefault();
      //@ts-ignore
      setSubmitTrigger(form);
   };

   const onChangeSearchForm = useCallback((value: string) => {
      setValueSearchForm(value);
   }, []);

   //@ts-ignore
   const onClickItem = async ({ id, favoriteId }) => {
      setHandleIsLoading(true);
      if (favoriteId) {
         await deleteFromFavorites(favoriteId);
         setHandleIsLoading(false);
         toast.success('Your vote is added');

         return;
      }
      await addToFavorites(id);

      setHandleIsLoading(false);
      toast.success('Your vote is added');
   };

   return (
      <main className="gallery home container">
         {!isMobile && !isTablet && <LesftSection />}
         <section className="home__right ">
            <div className="page__header">
               <ButtonBurger />
               <SearchBar
                  value={valueSearchForm}
                  onChange={onChangeSearchForm}
               />
               <LikeLinks />
            </div>
            <div className="page__body">
               <div className="gallery__body-header">
                  <BackComponent />
                  <ButtonUpload />
               </div>
               <FilterForm
                  onChange={onChange}
                  //@ts-ignore
                  onClickSubmit={onClickSubmit}
                  defaultValue={form}
               />
               {isLoading ? (
                  <Loader
                     width={80}
                     height={80}
                  />
               ) : (
                  <GalleryGrid
                     galleryList={data}
                     render={({ id, name, url, width, height, favoriteId }) => (
                        <div
                           key={id}
                           className="gallery-list__item"
                           onClick={
                              handleIsLoading
                                 ? () => {}
                                 : //@ts-ignore
                                   () => onClickItem({ id, favoriteId })
                           }
                        >
                           {
                              <>
                                 <img
                                    src={url ? url : defImg}
                                    alt={name || 'cat'}
                                    width={width && 500}
                                    height={height && 500}
                                 />
                                 <Button
                                    width={40}
                                    height={40}
                                    className="like-gallery-item"
                                    isDisabled={handleIsLoading}
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
                              </>
                           }
                        </div>
                     )}
                  />
               )}
            </div>
         </section>
      </main>
   );
};

export default Gallery;
