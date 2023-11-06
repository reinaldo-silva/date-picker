import { Meta } from '@storybook/react';
import React from 'react';
import { DatePicker } from '../src';

const meta: Meta = {
  title: 'Date Picker',
  component: DatePicker,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = () => {
  return <DatePicker />;
};

export const Default = Template.bind({});

Default.args = {};
