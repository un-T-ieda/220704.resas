import { useState, ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { AppChart } from '@/components/AppChart';
import { CheckButtonList } from '@/components/CheckButtonList';
import { LayoutContainer } from '@/components/LayoutContainer';
import { SelectedPrefecture } from '@/components/SelectedPrefecture';
import { mixins } from '@/utils/styles';
import { useFetchResas } from '@/hooks/useFetchResas';

export const App = () => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const { prefecture, population, fetchPopulation, setPopulation } =
    useFetchResas();

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
            margin-left: ${mixins.rem(-2.4)};
            margin-right: ${mixins.rem(-0.8)};
          `}
        >
          <AppChart population={population}></AppChart>
        </div>
      </div>
    </LayoutContainer>
  );
};
