import type { SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string | number }[];
  error?: string;
}

export default function SelectField({
  label,
  options,
  error,
  id,
  className = "",
  ...props
}: SelectFieldProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={selectId} className="body-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={selectId}
        className={`h-12 sm:h-10 w-full rounded-[6px] border bg-canvas px-3 body-sm text-ink outline-none transition-all duration-150 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23888%22%20d%3D%22M6%208.825L.35%203.175l.7-.7L6%207.425l4.95-4.95.7.7z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat cursor-pointer focus:border-ink focus:ring-1 focus:ring-ink/10 ${
          error
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-hairline"
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="caption text-error">{error}</p>}
    </div>
  );
}
