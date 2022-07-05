import { ChangeEventHandler, ReactNode } from 'react';

export type PopulationData = {
  year: number;
  value: number;
};

export type PrefectureData = {
  // OPTIMIZE: 1 ~ 47 の Union 型にしたいがいい方法はない？
  prefCode: number;
  prefName: string;
};

export type PopulationResponse = {
  result: {
    data: {
      label: string;
      data: PopulationData[];
    }[];
  };
};

export type PrefecturePopulation = {
  prefName: string;
  data: PopulationData[];
};

export type AppChartProps = {
  population: PrefecturePopulation[];
};

export type CheckButtonProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type CheckButtonListProps = {
  prefecture: PrefectureData[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type LayoutContainerProps = {
  children: ReactNode;
};

export type SelectedPrefectureProps = {
  prefecture: PrefectureData[];
  checkList: number[];
};
