import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { EmptyBlockOnScroll } from './ScrollEmptyBlock';

interface ScrollContentProps extends PropsWithChildren {
  isSelected: string;
}

export function ScrollContent({ children, isSelected }: ScrollContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const text = document.getElementById(isSelected);
      const [_, id] = isSelected.split('-');
      ref.current?.scrollTo({ top: (text?.offsetHeight ?? 1) * Number(id) });
    }
  }, [isSelected, ref]);

  return (
    <div
      ref={ref}
      className="flex snap-y flex-col items-center overflow-y-scroll scroll-smooth shadow-inner scrollbar-hide"
    >
      <EmptyBlockOnScroll />
      {children}
      <EmptyBlockOnScroll />
    </div>
  );
}
