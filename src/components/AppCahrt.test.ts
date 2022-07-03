import { createHighcartsOptions } from './AppChart';

describe('createHighcartsOptions', () => {
  test('create chart options - 0', () => {
    const mockPopulation: { prefName: string; data: { year: number; value: number }[] }[] = [];

    const expectData = {
      title: {
        text: '総人口推移',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: [],
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      series: [{ type: 'spline', name: '都道府県名', data: [] }],
    };

    expect(createHighcartsOptions(mockPopulation)).toEqual(expectData);
  });

  test('create chart options - 1', () => {
    const mockPopulation = [
      {
        prefName: '北海道',
        data: [
          {
            year: 1960,
            value: 1681479,
          },
          {
            year: 1965,
            value: 1462123,
          },
          {
            year: 1970,
            value: 1309487,
          },
        ],
      },
    ];

    const expectData = {
      title: {
        text: '総人口推移',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: ['1960', '1965', '1970'],
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      series: [
        {
          type: 'spline',
          name: '北海道',
          data: [1681479, 1462123, 1309487],
        },
      ],
    };

    expect(createHighcartsOptions(mockPopulation)).toEqual(expectData);
  });

  test('create chart options - 2', () => {
    const mockPopulation = [
      {
        prefName: '北海道',
        data: [
          {
            year: 1960,
            value: 1681479,
          },
          {
            year: 1965,
            value: 1462123,
          },
          {
            year: 1970,
            value: 1309487,
          },
        ],
      },
      {
        prefName: '青森県',
        data: [
          {
            year: 1960,
            value: 1426606,
          },
          {
            year: 1965,
            value: 1416591,
          },
          {
            year: 1970,
            value: 1427520,
          },
        ],
      },
    ];

    const expectData = {
      title: {
        text: '総人口推移',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: ['1960', '1965', '1970'],
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      series: [
        {
          type: 'spline',
          name: '北海道',
          data: [1681479, 1462123, 1309487],
        },
        {
          type: 'spline',
          name: '青森県',
          data: [1426606, 1416591, 1427520],
        },
      ],
    };

    expect(createHighcartsOptions(mockPopulation)).toEqual(expectData);
  });
});
