import {
  createSelectedPrefecture,
  searchPrefecture,
} from '../SelectedPrefecture';

describe('createSelectPrefecture', () => {
  const mockPrefectures = [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
    {
      prefCode: 3,
      prefName: '岩手県',
    },
    {
      prefCode: 4,
      prefName: '宮城県',
    },
    {
      prefCode: 5,
      prefName: '秋田県',
    },
    {
      prefCode: 6,
      prefName: '山形県',
    },
    {
      prefCode: 7,
      prefName: '福島県',
    },
    {
      prefCode: 8,
      prefName: '茨城県',
    },
    {
      prefCode: 9,
      prefName: '栃木県',
    },
    {
      prefCode: 10,
      prefName: '群馬県',
    },
  ];

  test('search prefecture', () => {
    const searchTarget = 1;
    const expectData = {
      prefCode: 1,
      prefName: '北海道',
    };

    expect(searchPrefecture(searchTarget, mockPrefectures)).toEqual(expectData);
  });

  test('selected prefecture with save order ', () => {
    const checkList = [1, 8, 3];

    const expectData = [
      {
        prefCode: 1,
        prefName: '北海道',
      },
      {
        prefCode: 8,
        prefName: '茨城県',
      },
      {
        prefCode: 3,
        prefName: '岩手県',
      },
    ];

    expect(createSelectedPrefecture(checkList, mockPrefectures)).toEqual(
      expectData,
    );
  });
});
