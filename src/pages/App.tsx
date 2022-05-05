import { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetchData(prefecturesAPIUrl).then((res) => {
      const data: Result[] = res;

      setData(data);
    });
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};
