import clsx from 'clsx';
import React, { ComponentProps, forwardRef } from 'react';

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'cursor-pointer flex rounded-md border border-zinc-200 bg-white p-1 relative w-fit',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
