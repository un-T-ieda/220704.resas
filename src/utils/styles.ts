export const mixins = {
  rem: (value: number): string => {
    // NOTE: 10px = 1rem として扱うためのユーティリティ
    return `${value * 0.625}rem`;
  },
  hoverDefault: (color = 'inherit'): string => {
    return `
      @media (hover: hover) {
        opacity: 1;
        transition: opacity 0.2s ease-out;
        cursor: pointer;

        &:hover {
          opacity: 0.7;
          text-decoration: none;
          color: ${color};
        }
      }
    `;
  },
  lineClamp: (line = 3): string => {
    return `
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${line};
      -webkit-box-orient: vertical;
    `;
  },
};
