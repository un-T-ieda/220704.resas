/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { css } from '@emotion/react';
import { PrefectureData, SelectedPrefectureProps } from '@/types';

export const searchPrefecture = (
  searchTarget: number,
  prefecture: PrefectureData[],
) =>
  prefecture.find((item) => searchTarget === item.prefCode) ?? {
    prefCode: 0,
    prefName: 'error',
  };

export const createSelectedPrefecture = (
  checkList: number[],
  prefecture: PrefectureData[],
) => {
  return checkList.reduce((accumulator, targetNumber) => {
    return [...accumulator, searchPrefecture(targetNumber, prefecture)];
  }, [] as PrefectureData[]);
};

export const SelectedPrefecture: FC<SelectedPrefectureProps> = ({
  prefecture,
  checkList,
}) => {
  return (
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
        {createSelectedPrefecture(checkList, prefecture).map((item) => (
          <li key={item.prefCode}>{item.prefName}&nbsp;</li>
        ))}
      </ul>
    </div>
  );
};
