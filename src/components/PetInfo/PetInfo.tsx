import React from "react";
import Loader from "../Loader/Loader";
import "./pet-info.scss";

type DataType = {
  name: string;
  description: string;
  temperament: string;
  data: string;
  origin: string;
  weight: {
    metric: string;
  };
  life_span: string;
};

export interface IState {
  data: DataType;
  isLoading: boolean;
}

export default function PetInfo({ data, isLoading }: IState) {
  if (isLoading) {
    return <Loader width={80} height={80} />;
  }

  return (
    <div className="pet-info__block">
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <div className="pet-info__text-block">
        <div className="pet-info__text-block left">
          <p>Temperament:</p>
          <span>{data?.temperament}</span>
        </div>
        <div className="pet-info__text-block right">
          <p>
            Origin: <span>{data?.origin}</span>
          </p>
          <p>
            Weight: <span>{data?.weight?.metric + " kgs"}</span>
          </p>
          <p>
            Life span: <span>{data?.life_span + " years"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
