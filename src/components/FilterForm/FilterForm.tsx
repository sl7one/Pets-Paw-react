import React, { useMemo } from 'react';
import './filter-form.scss';
import SelectComponent from '../SelectComponent/SelectComponent';

import { optionsLimitPerPage, orderOptions, typeOptions } from '../../utils/utils';
import { useFetch } from '../../hooks/useFeth';
import { getBreeds } from '../../API/api.js';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { OptionType } from '../../pages/Breeds/Breeds';

interface IProps {
   onChange: (obj: { id: number; value: number | string }) => void;
   onClickSubmit: () => void;
   defaultValue: {
      breed: string;
      limit: number;
      order: string;
      type: string;
   };
}

export default function FilterForm({ onChange, onClickSubmit, defaultValue }: IProps) {
   const { data, isLoading } = useFetch({ api_cb: getBreeds, storage: false });

   const optionsBreeds: OptionType[] = useMemo(
      () =>
         data.map(({ name, id }: { name: string; id: string }) => ({
            label: name,
            value: id.toLowerCase(),
         })),
      [data]
   );

   return (
      <form
         className="filter-form"
         onSubmit={onClickSubmit}
      >
         <div className="filter-form__top">
            <div className="filter-form__item">
               <span className="filter-form__label"> Order</span>
               <SelectComponent
                  options={orderOptions}
                  id="order"
                  //@ts-ignore
                  onChange={onChange}
                  defaulValue={{
                     label: defaultValue['order'],
                     value: defaultValue['order'].toLowerCase(),
                  }}
                  bgcolor="white"
               />
            </div>
            <div className="filter-form__item">
               <span className="filter-form__label"> Type</span>
               <SelectComponent
                  options={typeOptions}
                  id="type"
                  //@ts-ignore
                  onChange={onChange}
                  defaulValue={{
                     label: defaultValue['type'],
                     value: defaultValue['type'].toLowerCase(),
                  }}
                  bgcolor="white"
               />
            </div>
         </div>
         <div className="filter-form__bottom">
            <div className="filter-form__item">
               <span className="filter-form__label"> Breed</span>
               <SelectComponent
                  options={optionsBreeds}
                  id="breed"
                  //@ts-ignore
                  onChange={onChange}
                  defaulValue={{
                     label: defaultValue['breed'],
                     value: defaultValue['breed'].toLowerCase(),
                  }}
                  isDisabled={isLoading}
                  bgcolor="white"
               />
            </div>
            <div className="filter-form__item">
               <span className="filter-form__label"> Limit</span>
               <SelectComponent
                  options={optionsLimitPerPage}
                  id="limit"
                  //@ts-ignore
                  onChange={onChange}
                  defaulValue={{
                     label: `${defaultValue['limit']} items per page`,
                     value: defaultValue['limit'],
                  }}
                  bgcolor="white"
               />
            </div>
            <Button
               type="submit"
               className="submit"
            >
               <Icon
                  name="icon-update"
                  width={20}
                  height={17.5}
               ></Icon>
            </Button>
         </div>
      </form>
   );
}
