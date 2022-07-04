import { useEffect, useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { AppChart } from '@/components/AppChart';
import { CheckButtonList } from '@/components/CheckButtonList';
import { LayoutContainer } from '@/components/LayoutContainer';
import { SelectedPrefecture } from '@/components/SelectedPrefecture';
import { mixins } from '@/utils/styles';
import {
  PopulationData,
  PopulationResponse,
  PrefecturePopulation,
  PrefectureResponse,
} from '@/types';

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

  const handleChange = (event: ChangeEvent) => {
    const eventTarget = event.target as HTMLInputElement;
    const eventPrefCode = parseInt(eventTarget.value);
    const prefName = prefecture.find(
      (item) => item.prefCode === eventPrefCode,
    )!.prefName;

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
    <LayoutContainer>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: ${mixins.rem(1.6)};
        `}
      >
        <h1
          css={css`
            overflow-wrap: break-word;
            word-break: keep-all;
            line-height: var(--lh-tight);
          `}
        >
          都道府県別&nbsp;
          <wbr />
          総人口推移グラフ
        </h1>
        <SelectedPrefecture prefecture={prefecture} checkList={checkList} />
        <CheckButtonList
          prefecture={prefecture}
          onChange={(event) => handleChange(event)}
        />
        <div
          css={css`
            margin-left: ${mixins.rem(-2.5)};
            margin-right: ${mixins.rem(-1)};
          `}
        >
          <AppChart population={population}></AppChart>
        </div>
      </div>
    </LayoutContainer>
  );
};
