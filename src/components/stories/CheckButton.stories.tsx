import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckButton } from '../CheckButton';

export default {
  title: 'Components/CheckButton',
  component: CheckButton,
} as ComponentMeta<typeof CheckButton>;

const Template: ComponentStory<typeof CheckButton> = (args) => (
  <CheckButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: '北海道',
  value: '1',
  onChange: () => {
    console.log('click test of CheckButton');
  },
};
