import { useEffect, useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { AppChart } from '@/components/AppChart';
import { CheckButton } from '@/components/CheckButton';
import { mixins } from '@/utils/styles';
import { LayoutContainer } from '@/components/LayoutContainer';
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
        <div
          css={css`
            display: flex;
            overflow-x: auto;
          `}
        >
          <p
            css={css`
              flex-shrink: 0;
            `}
          >
            選択中の都道府県：
          </p>
          <ul
            css={css`
              display: flex;
              flex-shrink: 0;
            `}
          >
            {prefecture
              .filter((item) => checkList.includes(item.prefCode))
              .map((item) => (
                <li key={item.prefName}>{item.prefName}&nbsp;</li>
              ))}
          </ul>
        </div>
        <ul
          css={css`
            display: grid;
            gap: ${mixins.rem(1.2)};
            grid-template-columns: repeat(
              auto-fit,
              minmax(${mixins.rem(8)}, 1fr)
            );
            padding: ${mixins.rem(1.6)} ${mixins.rem(0.8)};
            border-top: 1px solid var(--line-secondary-color);
            border-bottom: 1px solid var(--line-secondary-color);
            max-height: 40vh;
            overflow-y: auto;
            position: relative;
          `}
        >
          {prefecture.map((item) => (
            <li key={item.prefCode}>
              <CheckButton
                name={item.prefName}
                value={item.prefCode.toString()}
                onChange={(event) => {
                  handleChange(event);
                }}
              ></CheckButton>
            </li>
          ))}
        </ul>
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
