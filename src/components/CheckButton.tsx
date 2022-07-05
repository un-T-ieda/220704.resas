/** @jsxImportSource @emotion/react */

import { FC } from 'react';
import { css } from '@emotion/react';
import { mixins } from '@/utils/styles';
import { CheckButtonProps } from '@/types';

export const CheckButton: FC<CheckButtonProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <div
      css={css`
        input:checked + label {
          position: relative;
          border: 1px solid var(--parts-primary-color);
          background-color: var(--parts-primary-color);
          color: var(--text-reverse-color);
        }

        input:focus-visible + label {
          outline: 2px solid var(--parts-focus-color);
          border: 1px solid var(--parts-focus-color);
        }
      `}
    >
      <input
        css={css`
          border: 0;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        `}
        id={`check-button-${value}`}
        onChange={onChange}
        type="checkbox"
        value={value}
      />
      <label
        htmlFor={`check-button-${value}`}
        css={css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--line-primary-color);
          width: 100%;
          min-height: ${mixins.rem(4.8)};
          text-align: center;
          transition: background-color 0.1s ease;
          font-weight: bold;
          border-radius: 9999px;
          font-size: ${mixins.rem(1.6)};
          letter-spacing: 0.1em;
          cursor: pointer;
        `}
      >
        {name}
      </label>
    </div>
  );
};
