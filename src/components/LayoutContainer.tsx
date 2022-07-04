/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { css } from '@emotion/react';
import { mixins } from '@/utils/styles';
import { LayoutContainerProps } from '@/types';

export const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div
      css={css`
        max-width: 1280px;
        margin: 0 auto;
        padding: ${mixins.rem(2.5)};
      `}
    >
      {children}
    </div>
  );
};
