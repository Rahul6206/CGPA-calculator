import type { ReactNode } from "react";

interface CalculatorCardProps {
  children: ReactNode;
  className?: string;
}

export default function CalculatorCard({
  children,
  className = "",
}: CalculatorCardProps) {
  return (
    <div
      className={`rounded-[12px] bg-canvas p-6 sm:p-8 shadow-level-3 ${className}`}
    >
      {children}
    </div>
  );
}
