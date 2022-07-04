/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { css } from '@emotion/react';
import { SelectedPrefectureProps } from '@/types';

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
        {prefecture
          .filter((item) => checkList.includes(item.prefCode))
          .map((item) => (
            <li key={item.prefName}>{item.prefName}&nbsp;</li>
          ))}
      </ul>
    </div>
  );
};
