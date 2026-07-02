import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import GradeSelector from "../ui/GradeSelector";
import Button from "../ui/Button";
import ResultDisplay from "../ui/ResultDisplay";
import { calculateSgpa } from "../../lib/calculations";
import { MAX_CREDITS } from "../../lib/constants";

interface SubjectRow {
  id: string;
  name: string;
  credits: string;
  gradePoints: number;
}

export default function SubjectSgpaCalculator() {
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { id: "1", name: "", credits: "", gradePoints: 10 },
    { id: "2", name: "", credits: "", gradePoints: 10 },
    { id: "3", name: "", credits: "", gradePoints: 10 },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", credits: "", gradePoints: 10 },
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof SubjectRow, value: string | number) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const calculate = () => {
    const newErrors: Record<string, string> = {};
    subjects.forEach((s) => {
      const c = parseFloat(s.credits);
      if (s.credits === "" || isNaN(c) || c <= 0 || c > MAX_CREDITS) {
        newErrors[s.id] = `Credits: 1–${MAX_CREDITS}`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const parsed = subjects.map((s) => ({
        id: s.id, name: s.name || "Subject", credits: parseFloat(s.credits), gradePoints: s.gradePoints,
      }));
      setResult(calculateSgpa(parsed));
    }
  };

  const totalCredits = subjects.reduce((sum, s) => sum + (parseFloat(s.credits) || 0), 0);

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-4">
        {subjects.map((sub, index) => (
          <div key={sub.id} className="flex flex-col gap-3 sm:flex-row sm:items-end rounded-[8px] bg-canvas-soft p-4 sm:p-3">
            <div className="flex-1">
              <InputField label={`Subject ${index + 1}`} placeholder="e.g. Mathematics" value={sub.name}
                onChange={(e) => updateSubject(sub.id, "name", e.target.value)} id={`sub-name-${index}`} />
            </div>
            <div className="w-full sm:w-20">
              <InputField label="Credits" type="number" min="1" max={MAX_CREDITS} placeholder="4" value={sub.credits}
                onChange={(e) => updateSubject(sub.id, "credits", e.target.value)} error={errors[sub.id]} id={`sub-cr-${index}`} />
            </div>
            <div className="w-full sm:w-40">
              <GradeSelector value={sub.gradePoints} onChange={(v) => updateSubject(sub.id, "gradePoints", v)} id={`sub-gr-${index}`} />
            </div>
            {subjects.length > 1 && (
              <button onClick={() => removeSubject(sub.id)} type="button" aria-label={`Remove subject ${index + 1}`}
                className="flex h-12 sm:h-10 w-full sm:w-10 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas text-mute hover:border-error hover:text-error transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h8" /></svg>
              </button>
            )}
          </div>
        ))}

        <button onClick={addSubject} type="button"
          className="body-sm flex h-12 sm:h-10 items-center justify-center gap-2 rounded-[6px] border border-dashed border-hairline-strong text-body hover:border-ink hover:text-ink transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 3v8M3 7h8" /></svg>
          Add Subject
        </button>

        {totalCredits > 0 && (
          <div className="flex items-center gap-2 rounded-[6px] bg-canvas-soft-2 px-3 py-2">
            <span className="caption-mono text-mute">TOTAL CREDITS</span>
            <span className="body-sm-strong text-ink">{totalCredits}</span>
          </div>
        )}

        <Button onClick={calculate} size="lg" fullWidth className="mt-2">Calculate SGPA</Button>
      </div>

      <ResultDisplay label="Your SGPA" value={result} decimals={2}>
        {result !== null && (
          <div className="flex flex-col gap-2 mt-2">
            <p className="caption-mono text-mute uppercase">Breakdown</p>
            {subjects.filter((s) => parseFloat(s.credits) > 0).map((s, i) => (
              <div key={s.id} className="flex items-center justify-between body-sm text-body">
                <span>{s.name || `Subject ${i + 1}`}</span>
                <span className="code text-mute">{s.credits} × {s.gradePoints} = {(parseFloat(s.credits) * s.gradePoints).toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}
      </ResultDisplay>
    </CalculatorCard>
  );
}
