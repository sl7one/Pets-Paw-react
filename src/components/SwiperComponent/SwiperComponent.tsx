import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import Loader from '../Loader/Loader';
import './swiper-component.scss';
import useMedia from '../../hooks/useMedia';

type ItemType = {
   id: string;
   url: string;
   width: number;
   height: number;
};

export interface IState {
   data: ItemType[];
   isLoading: boolean;
   error?: string;
}

export default function SwiperComponent({ data, isLoading }: IState) {
   const { isMobile } = useMedia();

   if (isLoading) {
      return (
         <Loader
            width={80}
            height={80}
         />
      );
   }

   const items = data.map(({ id, url, width, height }: ItemType) => (
      <SwiperSlide key={id}>
         <img
            src={url}
            width={width}
            height={height}
            alt="cat"
            style={{
               objectFit: 'cover',
               objectPosition: 'center',
               width: '100%',
               height: '100%',
            }}
         />
      </SwiperSlide>
   ));

   return (
      <Swiper
         //@ts-ignore
         slidesPerView={1}
         modules={[Pagination]}
         pagination={{ clickable: true }}
         style={{
            maxWidth: isMobile ? '300px' : '600px',
            maxHeight: isMobile ? '200px' : '360px',
            marginTop: '20px',
            borderRadius: '20px',
         }}
      >
         {items}
      </Swiper>
   );
}
