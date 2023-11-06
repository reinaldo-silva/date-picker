import { Meta } from '@storybook/react';
import React from 'react';
import { DatePicker, DatePickerProps } from '../src';

const meta: Meta = {
  title: 'Date Picker',
  component: DatePicker,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (args: DatePickerProps) => (
  <DatePicker {...args} setValue={() => {}} />
);

export const Default = Template.bind({});

Default.args = {};
