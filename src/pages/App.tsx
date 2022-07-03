import { useEffect, useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { AppChart } from '@/components/AppChart';

type PrefectureResponse = {
  // OPTIMIZE: 1 ~ 47 の Union 型にしたいがいい方法はない？
  prefCode: number;
  prefName: string;
};

type PopulationData = {
  year: number;
  value: number;
};

type PopulationResponse = {
  result: {
    data: {
      label: string;
      data: PopulationData[];
    }[];
  };
};

type PrefecturePopulation = {
  prefName: string;
  data: PopulationData[];
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

export const App = () => {
  const [prefecture, setPrefecture] = useState<PrefectureResponse[]>([]);
  const [population, setPopulation] = useState<PrefecturePopulation[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);

  const fetchPrefectures = () => {
    fetchData(prefecturesAPIUrl).then((res) => {
      const data: PrefectureResponse[] = res.result;

      setPrefecture(data);
    });
  };

  const fetchPopulation = (eventPrefCode: number) => {
    fetchData(populationAPIUrl(eventPrefCode)).then((res: PopulationResponse) => {
      const data: PopulationData[] = res.result.data[0].data;
      const prefName = prefecture.find((item) => item.prefCode === eventPrefCode)!.prefName;

      setPopulation([
        ...population,
        {
          prefName,
          data,
        },
      ]);
    });
  };

  const handleChange = (event: ChangeEvent) => {
    const eventTarget = event.target as HTMLInputElement;
    const eventPrefCode = parseInt(eventTarget.value);
    const prefName = prefecture.find((item) => item.prefCode === eventPrefCode)!.prefName;

    if (eventTarget.checked) {
      setCheckList([...checkList, eventPrefCode]);
      fetchPopulation(eventPrefCode);
    } else {
      setCheckList(checkList.filter((item) => item !== eventPrefCode));
      setPopulation(population.filter((item) => item.prefName !== prefName));
    }
  };

  useEffect(() => {
    fetchPrefectures();
  }, []);

  return (
    <>
      <ul
        css={css`
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        `}
      >
        {prefecture.map((item) => (
          <li key={item.prefCode}>
            <label
              css={css`
                cursor: pointer;
              `}
            >
              {item.prefName}
              <input
                onChange={(event) => {
                  handleChange(event);
                }}
                type="checkbox"
                value={item.prefCode}
              />
            </label>
          </li>
        ))}
      </ul>
      <AppChart population={population}></AppChart>
    </>
  );
};
