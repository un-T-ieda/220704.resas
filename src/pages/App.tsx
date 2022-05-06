import { css } from '@emotion/react';
import { useEffect, useState, ChangeEvent } from 'react';

type Result = {
  prefCode: number;
  prefName: string;
};

const isProduction = import.meta.env.MODE === 'production';
const prefecturesAPIUrl = isProduction
  ? 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  : 'http://localhost:8000/prefectures';

const fetchData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': '',
    },
  });
  return response.json();
};

export const App = () => {
  const [data, setData] = useState<Result[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);

  useEffect(() => {
    fetchData(prefecturesAPIUrl).then((res) => {
      const data: Result[] = res.result;

      setData(data);
    });
  }, []);

  const handleChange = (event: ChangeEvent) => {
    const eventTarget = event.target as HTMLInputElement;
    const eventPrefCode = Number(eventTarget.value);

    if (eventTarget.checked) {
      setCheckList([...checkList, eventPrefCode]);
    } else {
      setCheckList(checkList.filter((item) => item !== eventPrefCode));
    }
  };

  return (
    <>
      <div>{JSON.stringify(checkList)}</div>
      <ul
        css={css`
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        `}
      >
        {data.map((item) => (
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
    </>
  );
};
