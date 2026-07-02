import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function InputField({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="body-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        className={`h-12 sm:h-10 w-full rounded-[6px] border bg-canvas px-3 body-sm text-ink outline-none transition-all duration-150 placeholder:text-mute focus:border-ink focus:ring-1 focus:ring-ink/10 ${
          error
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-hairline"
        }`}
        {...props}
      />
      {error && <p className="caption text-error">{error}</p>}
      {hint && !error && <p className="caption text-mute">{hint}</p>}
    </div>
  );
}
