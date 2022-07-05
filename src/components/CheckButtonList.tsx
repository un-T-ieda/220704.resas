/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { css } from '@emotion/react';
import { mixins } from '@/utils/styles';
import { CheckButton } from './CheckButton';
import { CheckButtonListProps } from '@/types';

export const CheckButtonList: FC<CheckButtonListProps> = ({
  prefecture,
  onChange,
}) => {
  return (
    <ul
      css={css`
        display: grid;
        gap: ${mixins.rem(1.2)};
        grid-template-columns: repeat(auto-fit, minmax(${mixins.rem(8)}, 1fr));
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
            onChange={onChange}
          ></CheckButton>
        </li>
      ))}
    </ul>
  );
};
