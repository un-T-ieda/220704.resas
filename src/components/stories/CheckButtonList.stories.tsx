import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { CheckButtonList } from '../CheckButtonList';

export default {
  title: 'Components/CheckButtonList',
  component: CheckButtonList,
} as ComponentMeta<typeof CheckButtonList>;

const Template: ComponentStory<typeof CheckButtonList> = (args) => {
  return <CheckButtonList {...args} />;
};

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

export const Normal = Template.bind({});
Normal.args = {
  prefecture,
  onChange: (event) => {
    console.log(`click target value is ${event.target.value}`);
  },
};
