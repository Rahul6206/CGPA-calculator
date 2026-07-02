import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ResultDisplay from "../ui/ResultDisplay";
import { attendancePlanner } from "../../lib/calculations";
import { DEFAULT_ATTENDANCE_TARGET } from "../../lib/constants";
import type { AttendanceResult } from "../../lib/types";

export default function AttendancePlanner() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [target, setTarget] = useState(String(DEFAULT_ATTENDANCE_TARGET));
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculate = () => {
    const e: Record<string, string> = {};
    const a = parseInt(attended);
    const t = parseInt(total);
    const tgt = parseFloat(target);

    if (isNaN(a) || a < 0) e.attended = "Enter attended classes";
    if (isNaN(t) || t < 1) e.total = "Enter total classes";
    if (!isNaN(a) && !isNaN(t) && a > t) e.attended = "Cannot exceed total";
    if (isNaN(tgt) || tgt <= 0 || tgt > 100) e.target = "Target: 1–100";

    setErrors(e);
    if (Object.keys(e).length === 0) {
      setResult(attendancePlanner(a, t, tgt));
    }
  };

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Classes Attended" type="number" min="0" placeholder="e.g. 45"
            value={attended} onChange={(e) => setAttended(e.target.value)} error={errors.attended} id="attend-attended" />
          <InputField label="Total Classes" type="number" min="1" placeholder="e.g. 60"
            value={total} onChange={(e) => setTotal(e.target.value)} error={errors.total} id="attend-total" />
        </div>
        <InputField label="Target Attendance (%)" type="number" min="1" max="100" step="1"
          placeholder="75" value={target} onChange={(e) => setTarget(e.target.value)} error={errors.target}
          id="attend-target" hint="Most universities require 75%" />
        <Button onClick={calculate} size="lg" fullWidth className="mt-2">Check Attendance</Button>
      </div>

      {result && (
        <div className="mt-6 animate-fade-in-up">
          <ResultDisplay
            label="Current Attendance"
            value={result.currentPercentage}
            suffix="%"
            decimals={1}
            status={result.status === "safe" ? "success" : result.status === "warning" ? "warning" : "danger"}
          />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.status === "safe" ? (
              <div className="rounded-[8px] bg-cyan-soft/40 p-4">
                <p className="caption-mono text-mute uppercase mb-1">Can safely skip</p>
                <p className="display-md text-ink">{result.canBunk}</p>
                <p className="body-sm text-body mt-1">
                  class{result.canBunk !== 1 ? "es" : ""} while staying above {target}%
                </p>
              </div>
            ) : (
              <div className="rounded-[8px] bg-error-soft/40 p-4">
                <p className="caption-mono text-mute uppercase mb-1">Must attend</p>
                <p className="display-md text-ink">{result.needed}</p>
                <p className="body-sm text-body mt-1">
                  consecutive class{result.needed !== 1 ? "es" : ""} to reach {target}%
                </p>
              </div>
            )}
            <div className="rounded-[8px] bg-canvas-soft p-4">
              <p className="caption-mono text-mute uppercase mb-1">Summary</p>
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between body-sm">
                  <span className="text-body">Attended</span>
                  <span className="text-ink font-medium">{attended} / {total}</span>
                </div>
                <div className="flex justify-between body-sm">
                  <span className="text-body">Current %</span>
                  <span className="text-ink font-medium">{result.currentPercentage}%</span>
                </div>
                <div className="flex justify-between body-sm">
                  <span className="text-body">Target</span>
                  <span className="text-ink font-medium">{target}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
