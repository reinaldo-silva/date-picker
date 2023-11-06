import React, { ComponentProps, ReactNode } from 'react';

export interface Props extends ComponentProps<'div'> {
  children?: ReactNode;
}

export const Thing = ({ children }: Props) => {
  return (
    <div className="text-xl text-pink-500 p-4 bg-gray-200 rounded-lg">
      {children || `the snozzberries taste like snozzberries`}
    </div>
  );
};
