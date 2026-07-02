import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-ink text-on-primary hover:opacity-90",
    secondary:
      "bg-canvas text-ink shadow-level-1 hover:bg-canvas-soft-2",
  };

  const sizes = {
    sm: "h-7 px-3 text-sm rounded-[100px]",
    md: "h-10 px-4 text-sm rounded-[100px]",
    lg: "h-12 px-6 text-base rounded-[100px]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
