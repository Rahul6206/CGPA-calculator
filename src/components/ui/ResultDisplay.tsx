import type { ReactNode } from "react";
import AnimatedNumber from "./AnimatedNumber";

interface ResultDisplayProps {
  label: string;
  value: number | null;
  suffix?: string;
  decimals?: number;
  status?: "default" | "success" | "warning" | "danger";
  children?: ReactNode;
}

export default function ResultDisplay({
  label,
  value,
  suffix = "",
  decimals = 2,
  status = "default",
  children,
}: ResultDisplayProps) {
  if (value === null) return null;

  const statusColors = {
    default: "from-gradient-develop-start to-gradient-develop-end",
    success: "from-gradient-develop-start to-gradient-develop-end",
    warning: "from-gradient-ship-start to-gradient-ship-end",
    danger: "from-error to-highlight-pink",
  };

  return (
    <div className="animate-fade-in-up mt-6 rounded-[12px] bg-canvas-soft p-6">
      <p className="caption-mono text-mute uppercase mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span
          className={`display-xl bg-gradient-to-r ${statusColors[status]} bg-clip-text text-transparent`}
        >
          <AnimatedNumber
            value={value}
            decimals={decimals}
            className={`display-xl bg-gradient-to-r ${statusColors[status]} bg-clip-text text-transparent`}
          />
        </span>
        {suffix && <span className="display-sm text-mute">{suffix}</span>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
