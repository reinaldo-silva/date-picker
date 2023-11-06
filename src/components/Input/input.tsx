import React, { ComponentProps, forwardRef } from 'react';
import { clsx } from 'clsx';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx('cursor-pointer px-1 outline-none', className)}
        {...rest}
      />
    );
  }
);

Input.displayName = 'InputComponent';
