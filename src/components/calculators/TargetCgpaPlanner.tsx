import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ResultDisplay from "../ui/ResultDisplay";
import { targetSgpa } from "../../lib/calculations";
import { MAX_CGPA, MAX_SEMESTERS } from "../../lib/constants";

export default function TargetCgpaPlanner() {
  const [currentCgpa, setCurrentCgpa] = useState("");
  const [completed, setCompleted] = useState("");
  const [total, setTotal] = useState("8");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculate = () => {
    const e: Record<string, string> = {};
    const cCgpa = parseFloat(currentCgpa);
    const cComp = parseInt(completed);
    const cTotal = parseInt(total);
    const cTarget = parseFloat(target);

    if (isNaN(cCgpa) || cCgpa < 0 || cCgpa > MAX_CGPA) e.currentCgpa = `CGPA: 0–${MAX_CGPA}`;
    if (isNaN(cComp) || cComp < 1) e.completed = "Enter completed semesters";
    if (isNaN(cTotal) || cTotal < 2 || cTotal > MAX_SEMESTERS) e.total = `Total: 2–${MAX_SEMESTERS}`;
    if (isNaN(cTarget) || cTarget < 0 || cTarget > MAX_CGPA) e.target = `Target: 0–${MAX_CGPA}`;
    if (!isNaN(cComp) && !isNaN(cTotal) && cComp >= cTotal) e.completed = "Must be less than total";

    setErrors(e);
    if (Object.keys(e).length === 0) {
      setResult(targetSgpa(cCgpa, cComp, cTarget, cTotal));
    }
  };

  const isImpossible = result !== null && result > MAX_CGPA;
  const isEasy = result !== null && result <= parseFloat(currentCgpa || "0");

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Current CGPA" type="number" step="0.01" min="0" max={MAX_CGPA}
            placeholder="e.g. 7.5" value={currentCgpa} onChange={(e) => setCurrentCgpa(e.target.value)}
            error={errors.currentCgpa} id="target-current-cgpa" />
          <InputField label="Target CGPA" type="number" step="0.01" min="0" max={MAX_CGPA}
            placeholder="e.g. 8.5" value={target} onChange={(e) => setTarget(e.target.value)}
            error={errors.target} id="target-cgpa" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Completed Semesters" type="number" min="1" max={MAX_SEMESTERS}
            placeholder="e.g. 4" value={completed} onChange={(e) => setCompleted(e.target.value)}
            error={errors.completed} id="target-completed" />
          <InputField label="Total Semesters" type="number" min="2" max={MAX_SEMESTERS}
            placeholder="e.g. 8" value={total} onChange={(e) => setTotal(e.target.value)}
            error={errors.total} id="target-total" />
        </div>
        <Button onClick={calculate} size="lg" fullWidth className="mt-2">Calculate Required SGPA</Button>
      </div>

      <ResultDisplay
        label="Required SGPA per remaining semester"
        value={result}
        decimals={2}
        status={isImpossible ? "danger" : isEasy ? "success" : "default"}
      >
        {result !== null && (
          <div className="mt-3">
            {isImpossible ? (
              <div className="rounded-[6px] bg-error-soft px-3 py-2">
                <p className="body-sm text-error font-medium">
                  Not achievable — required SGPA exceeds {MAX_CGPA}. Consider adjusting your target.
                </p>
              </div>
            ) : isEasy ? (
              <div className="rounded-[6px] bg-cyan-soft px-3 py-2">
                <p className="body-sm text-ink font-medium">
                  You're on track! Just maintain an SGPA of {result} or above.
                </p>
              </div>
            ) : (
              <p className="body-sm text-body">
                You need an average SGPA of <strong>{result}</strong> across your remaining{" "}
                {parseInt(total) - parseInt(completed)} semester(s).
              </p>
            )}
          </div>
        )}
      </ResultDisplay>
    </CalculatorCard>
  );
}
