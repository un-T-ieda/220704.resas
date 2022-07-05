import { useEffect, useState } from 'react';
import {
  PopulationData,
  PopulationResponse,
  PrefecturePopulation,
  PrefectureResponse,
} from '@/types';

const fetchData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY,
    },
  });
  return response.json();
};

const isProduction = import.meta.env.MODE === 'production';
const prefecturesAPIUrl = isProduction
  ? 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  : 'http://localhost:8000/prefectures';
const populationAPIUrl = (prefCode: number): string => {
  return isProduction
    ? `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`
    : `http://localhost:8000/population?prefCode=${prefCode}`;
};

export const useFetchResas = () => {
  const [prefecture, setPrefecture] = useState<PrefectureResponse[]>([]);
  const [population, setPopulation] = useState<PrefecturePopulation[]>([]);

  const fetchPrefectures = () => {
    fetchData(prefecturesAPIUrl).then((res) => {
      const data: PrefectureResponse[] = res.result;

      setPrefecture(data);
    });
  };

  const fetchPopulation = (eventPrefCode: number) => {
    fetchData(populationAPIUrl(eventPrefCode)).then(
      (res: PopulationResponse) => {
        const data: PopulationData[] = res.result.data[0].data;
        const prefName = prefecture.find(
          (item) => item.prefCode === eventPrefCode,
        )!.prefName;

        setPopulation([
          ...population,
          {
            prefName,
            data,
          },
        ]);
      },
    );
  };

  useEffect(() => {
    fetchPrefectures();
  }, []);

  return {
    prefecture,
    population,
    setPopulation,
    fetchPopulation,
  };
};
