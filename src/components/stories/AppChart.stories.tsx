import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppChart } from '../AppChart';

export default {
  title: 'Components/AppChart',
  component: AppChart,
} as ComponentMeta<typeof AppChart>;

const Template: ComponentStory<typeof AppChart> = (args) => (
  <AppChart {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  population: [
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
        {
          year: 1975,
          value: 1312611,
        },
        {
          year: 1980,
          value: 1298324,
        },
        {
          year: 1985,
          value: 1217959,
        },
        {
          year: 1990,
          value: 1034251,
        },
        {
          year: 1995,
          value: 898673,
        },
        {
          year: 2000,
          value: 792352,
        },
        {
          year: 2005,
          value: 719057,
        },
        {
          year: 2010,
          value: 657312,
        },
        {
          year: 2015,
          value: 608296,
        },
        {
          year: 2020,
          value: 561558,
        },
        {
          year: 2025,
          value: 511677,
        },
        {
          year: 2030,
          value: 465307,
        },
        {
          year: 2035,
          value: 423382,
        },
        {
          year: 2040,
          value: 391086,
        },
        {
          year: 2045,
          value: 360177,
        },
      ],
    },
  ],
};

export const Double = Template.bind({});
Double.args = {
  population: [
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
        {
          year: 1975,
          value: 1312611,
        },
        {
          year: 1980,
          value: 1298324,
        },
        {
          year: 1985,
          value: 1217959,
        },
        {
          year: 1990,
          value: 1034251,
        },
        {
          year: 1995,
          value: 898673,
        },
        {
          year: 2000,
          value: 792352,
        },
        {
          year: 2005,
          value: 719057,
        },
        {
          year: 2010,
          value: 657312,
        },
        {
          year: 2015,
          value: 608296,
        },
        {
          year: 2020,
          value: 561558,
        },
        {
          year: 2025,
          value: 511677,
        },
        {
          year: 2030,
          value: 465307,
        },
        {
          year: 2035,
          value: 423382,
        },
        {
          year: 2040,
          value: 391086,
        },
        {
          year: 2045,
          value: 360177,
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
        {
          year: 1975,
          value: 1468646,
        },
        {
          year: 1980,
          value: 1523907,
        },
        {
          year: 1985,
          value: 1524448,
        },
        {
          year: 1990,
          value: 1482873,
        },
        {
          year: 1995,
          value: 1481663,
        },
        {
          year: 2000,
          value: 1475728,
        },
        {
          year: 2005,
          value: 1436657,
        },
        {
          year: 2010,
          value: 1373339,
        },
        {
          year: 2015,
          value: 1308265,
        },
        {
          year: 2020,
          value: 1235971,
        },
        {
          year: 2025,
          value: 1157332,
        },
        {
          year: 2030,
          value: 1076393,
        },
        {
          year: 2035,
          value: 993737,
        },
        {
          year: 2040,
          value: 908974,
        },
        {
          year: 2045,
          value: 823610,
        },
      ],
    },
  ],
};

export const UnSelected = Template.bind({});
UnSelected.args = {
  population: [],
};
