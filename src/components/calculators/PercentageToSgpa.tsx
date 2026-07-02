import { useState } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ResultDisplay from "../ui/ResultDisplay";
import { percentageToSgpa } from "../../lib/calculations";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { LS_KEYS, DEFAULT_MULTIPLIER, MAX_PERCENTAGE } from "../../lib/constants";

export default function PercentageToSgpa() {
  const [multiplier] = useLocalStorage<number>(
    LS_KEYS.MULTIPLIER,
    DEFAULT_MULTIPLIER
  );
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const num = parseFloat(percentage);
    if (percentage === "" || isNaN(num)) {
      setError("Enter a valid percentage");
      return;
    }
    if (num < 0 || num > MAX_PERCENTAGE) {
      setError(`Percentage must be between 0 and ${MAX_PERCENTAGE}`);
      return;
    }
    setError("");
    setResult(percentageToSgpa(num, multiplier));
  };

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-4">
        <InputField
          label="Enter your Percentage"
          type="number"
          step="0.01"
          min="0"
          max={MAX_PERCENTAGE}
          placeholder="e.g. 76.00"
          value={percentage}
          onChange={(e) => {
            setPercentage(e.target.value);
            setError("");
          }}
          error={error}
          id="percentage-sgpa-input"
        />

        <div className="flex items-center gap-2 rounded-[6px] bg-canvas-soft-2 px-3 py-2">
          <span className="caption-mono text-mute">MULTIPLIER</span>
          <span className="body-sm-strong text-ink">{multiplier}</span>
          <a
            href="/settings"
            className="ml-auto caption text-link hover:text-link-deep transition-colors"
          >
            Change
          </a>
        </div>

        <Button onClick={calculate} size="lg" fullWidth>
          Convert to SGPA
        </Button>
      </div>

      <ResultDisplay label="Your SGPA" value={result} decimals={2} />

      {result !== null && (
        <div className="mt-4 rounded-[8px] bg-canvas-soft p-4 animate-fade-in">
          <p className="caption-mono text-mute uppercase mb-1">Formula used</p>
          <p className="code text-body">
            {percentage} ÷ {multiplier} = {result}
          </p>
        </div>
      )}
    </CalculatorCard>
  );
}
