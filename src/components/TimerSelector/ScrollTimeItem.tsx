import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface ScrollItemProps extends PropsWithChildren {
  isSelected: boolean;
  id: string;
  onClick: () => void;
}

export function ScrollItem({
  children,
  isSelected,
  id,
  onClick,
}: ScrollItemProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(
        'flex w-full cursor-pointer select-none snap-center justify-center border p-2 transition-colors hover:bg-indigo-100',
        { 'bg-indigo-400 text-zinc-100 hover:!bg-indigo-300': isSelected }
      )}
    >
      {children}
    </button>
  );
}
