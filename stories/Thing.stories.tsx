import { Meta } from '@storybook/react';
import React from 'react';
import { Props, Thing } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: Thing,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (args: Props) => <Thing {...args} />;

export const Default = Template.bind({});

Default.args = {};
