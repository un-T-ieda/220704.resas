import { useState } from 'react';

export const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, _setData] = useState<string>('sample');

  return <p>{data}</p>;
};
