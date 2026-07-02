import { useState, useEffect } from "react";
import CalculatorCard from "../ui/CalculatorCard";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { LS_KEYS, DEFAULT_MULTIPLIER } from "../../lib/constants";

const PRESETS = [
  { label: "CBCS Standard (×10)", value: 10 },
  { label: "Custom", value: -1 },
];

export default function SettingsPanel() {
  const [multiplier, setMultiplier] = useLocalStorage<number>(LS_KEYS.MULTIPLIER, DEFAULT_MULTIPLIER);
  const [inputValue, setInputValue] = useState(String(multiplier));
  const [saved, setSaved] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(() => {
    const found = PRESETS.find((p) => p.value === multiplier);
    return found ? found.value : -1;
  });

  const handlePreset = (value: number) => {
    setSelectedPreset(value);
    if (value > 0) {
      setInputValue(String(value));
      setMultiplier(value);
      flashSaved();
    }
  };

  const handleSave = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num) && num > 0 && num <= 20) {
      setMultiplier(num);
      flashSaved();
    }
  };

  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <CalculatorCard>
      <div className="flex flex-col gap-6">
        <div>
          <p className="caption-mono text-mute uppercase mb-3">Conversion Presets</p>
          <div className="flex flex-col gap-2">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => handlePreset(p.value)}
                className={`flex h-12 sm:h-10 items-center px-4 rounded-[8px] body-sm text-left transition-all duration-150 ${
                  selectedPreset === p.value
                    ? "bg-ink text-on-primary shadow-level-2"
                    : "bg-canvas-soft text-body hover:bg-canvas-soft-2"
                }`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-hairline pt-6">
          <p className="caption-mono text-mute uppercase mb-3">Custom Multiplier</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <InputField label="Multiplier Value" type="number" step="0.1" min="0.1" max="20"
                placeholder="e.g. 9.5" value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setSelectedPreset(-1); }}
                id="settings-multiplier" hint="Used in CGPA ↔ Percentage conversions" />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSave} size="md">Save</Button>
            </div>
          </div>
        </div>

        {saved && (
          <div className="animate-fade-in-up rounded-[8px] bg-cyan-soft/40 px-4 py-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#29bc9b" strokeWidth="2">
              <path d="M3 8.5l3 3 7-7" />
            </svg>
            <span className="body-sm text-ink font-medium">Settings saved! Changes apply to all calculators.</span>
          </div>
        )}

        <div className="rounded-[8px] bg-canvas-soft p-4">
          <p className="caption-mono text-mute uppercase mb-2">How it works</p>
          <p className="body-sm text-body">
            The multiplier is used in CGPA ↔ Percentage conversions. For example, with a
            multiplier of <strong>{multiplier}</strong>:
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            <p className="code text-body">CGPA 8.0 → {(8 * multiplier).toFixed(1)}%</p>
            <p className="code text-body">75% → CGPA {(75 / multiplier).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
