import BackComponent from '../../components/BackComponent/BackComponent';
import LesftSection from '../../components/LeftSection/LesftSection';
import LikeLinks from '../../components/LikeLinks/LikeLinks';
import SearchBar from '../../components/SearchBar/SearchBar';

import { toast } from 'react-toastify';

import defImg from '../../assets/default.jpg';

import {
   addToFavorites,
   deleteFromFavorites,
   getRandom,
   getVotes,
   postVotes,
} from '../../API/api.js';

import './voting.scss';
import LikeButtons from '../../components/LikeButtons/LikeButtons';
import { useFetch } from '../../hooks/useFeth';
import Loader from '../../components/Loader/Loader';
import VotingList from '../../components/VotingList/VotingList';
import { useCallback, useState } from 'react';
import useMedia from '../../hooks/useMedia';
import ButtonBurger from '../../components/ButtonBurrger/ButtonBurger';

const Voting = () => {
   const { isMobile, isTablet } = useMedia();
   const [vote, setVote] = useState(null);
   const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
   const [favoriteId, setFavoriteId] = useState(0);
   const [value, setValue] = useState('');

   const { data: dataCats, isLoading: isLoadingCats } = useFetch({
      api_cb: getRandom,
      dependency: vote,
   });

   const { data: dataVotes, isLoading: isLoadingVotes } = useFetch({
      api_cb: getVotes,
      dependency: vote,
   });
   

   const onClickVote = async (value: number) => {
      try {
         //@ts-ignore
         await postVotes({ value, image_id: dataCats[0].id });
         //@ts-ignore
         setVote({ value, image_id: dataCats[0].id });
         toast.success('Your vote is added');
      } catch (error) {
         if (error instanceof Error){
            toast.error(
               <>
                  <h2>Something went wrong</h2>
   
                  <p>
                     {
                        error.message
                     }
                  </p>
               </>
            );
         }
      }
   };

   const onClickFavorite = async () => {
      if (isAddedToFavorites) {
         await deleteFromFavorites(favoriteId);
         setIsAddedToFavorites(false);
         toast.success('Your vote is added');
      } else {
         //@ts-ignore
         const data = await addToFavorites(dataCats[0].id);
         setIsAddedToFavorites(true);
         setFavoriteId(data.id);
         toast.success('Your vote is added');
      }
   };

   const onChange = useCallback((value: string) => {
      setValue(value);
   }, []);

   return (
      <main className="voting home container">
         {!isMobile && !isTablet && <LesftSection />}
         <section className="home__right">
            <div className="page__header">
               <ButtonBurger />
               <SearchBar
                  onChange={onChange}
                  value={value}
               />
               <LikeLinks />
            </div>
            <div className="page__body">
               <BackComponent />
               {isLoadingCats ? (
                  <Loader width={80} height={80}/>
               ) : (
                  <div className="wrapper">
                     <div className="thumb">
                        <img
                           //@ts-ignore
                           src={dataCats[0]?.url || defImg}
                           //@ts-ignore
                           width={dataCats[0]?.width || 500}
                           //@ts-ignore
                           height={dataCats[0]?.height || 500}
                           alt="pet"
                        />
                     </div>
                     <LikeButtons
                        onClickVote={onClickVote}
                        onClickFavorite={onClickFavorite}
                        isDisabled={isLoadingVotes}
                        isAddedToFavorites={isAddedToFavorites}
                     />
                  </div>
               )}

               <VotingList
                  list={dataVotes}
                  isLoading={isLoadingVotes}
               />
            </div>
         </section>
      </main>
   );
};

export default Voting;
