import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer';

interface TooltipProps {
    children: React.ReactNode;
    targetRect: { left: number; top: number; right: number; bottom: number } | null;
}

export default function Tooltip({ children, targetRect }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    // Center horizontally
    tooltipX = (targetRect.left + targetRect.right) / 2;
    tooltipY = targetRect.top - tooltipHeight - 14; 
    if (tooltipY < 0) {
      tooltipY = targetRect.bottom + 8;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
