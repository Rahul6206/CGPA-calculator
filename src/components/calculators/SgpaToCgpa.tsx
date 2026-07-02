import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ResultDisplay from "../ui/ResultDisplay";
import { sgpaToCgpa } from "../../lib/calculations";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { LS_KEYS, MAX_SGPA } from "../../lib/constants";

interface SemesterInput {
  id: string;
  value: string;
}

export default function SgpaToCgpa() {
  const [semesters, setSemesters] = useLocalStorage<SemesterInput[]>(
    LS_KEYS.SGPA_SEMESTERS,
    [
      { id: "1", value: "" },
      { id: "2", value: "" },
    ]
  );
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { id: String(Date.now()), value: "" },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((s) => s.id !== id));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateSemester = (id: string, value: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value } : s))
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const calculate = () => {
    const newErrors: Record<string, string> = {};
    const values: number[] = [];

    semesters.forEach((s, i) => {
      const num = parseFloat(s.value);
      if (s.value === "" || isNaN(num)) {
        newErrors[s.id] = "Enter a valid SGPA";
      } else if (num < 0 || num > MAX_SGPA) {
        newErrors[s.id] = `SGPA must be 0–${MAX_SGPA}`;
      } else {
        values.push(num);
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setResult(sgpaToCgpa(values));
    }
  };

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-4">
        {semesters.map((sem, index) => (
          <div key={sem.id} className="flex items-end gap-3">
            <div className="flex-1">
              <InputField
                label={`Semester ${index + 1} SGPA`}
                type="number"
                step="0.01"
                min="0"
                max={MAX_SGPA}
                placeholder="e.g. 8.5"
                value={sem.value}
                onChange={(e) => updateSemester(sem.id, e.target.value)}
                error={errors[sem.id]}
                id={`sgpa-sem-${index + 1}`}
              />
            </div>
            {semesters.length > 1 && (
              <button
                onClick={() => removeSemester(sem.id)}
                className="mb-0.5 flex h-12 sm:h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas text-mute transition-colors hover:border-error hover:text-error"
                aria-label={`Remove semester ${index + 1}`}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 8h8" />
                </svg>
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addSemester}
          type="button"
          className="body-sm flex h-12 sm:h-10 items-center justify-center gap-2 rounded-[6px] border border-dashed border-hairline-strong text-body transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 3v8M3 7h8" />
          </svg>
          Add Semester
        </button>

        <Button onClick={calculate} size="lg" fullWidth className="mt-2">
          Calculate CGPA
        </Button>
      </div>

      <ResultDisplay label="Your CGPA" value={result} decimals={2} />
    </CalculatorCard>
  );
}
