import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectedPrefecture } from '../SelectedPrefecture';

export default {
  title: 'Components/SelectedPrefecture',
  component: SelectedPrefecture,
} as ComponentMeta<typeof SelectedPrefecture>;

const Template: ComponentStory<typeof SelectedPrefecture> = (args) => (
  <SelectedPrefecture {...args} />
);

const prefecture = [
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

export const UnSelected = Template.bind({});
UnSelected.args = {
  prefecture,
  checkList: [],
};

export const SelectedFirst = Template.bind({});
SelectedFirst.args = {
  prefecture,
  checkList: [1],
};

export const SelectedAll = Template.bind({});
SelectedAll.args = {
  prefecture,
  checkList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};
