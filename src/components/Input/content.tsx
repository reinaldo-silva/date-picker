import React, { ComponentProps } from 'react';

export function Content({ children }: ComponentProps<'div'>) {
  return (
    <div className="cursor-pointer rounded-md border border-zinc-200 bg-white p-1">
      {children}
    </div>
  );
}
