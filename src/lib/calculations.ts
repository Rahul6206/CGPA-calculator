import type { Subject, AttendanceResult } from "./types";

/**
 * SGPA to CGPA: weighted average of all semester SGPAs.
 * CGPA = Σ(SGPA) / n
 */
export function sgpaToCgpa(sgpas: number[]): number {
  if (sgpas.length === 0) return 0;
  const sum = sgpas.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / sgpas.length).toFixed(2));
}

/**
 * CGPA to Percentage.
 * Default formula: Percentage = CGPA × multiplier
 * Some universities use: Percentage = (CGPA - 0.75) × 10
 */
export function cgpaToPercentage(cgpa: number, multiplier: number): number {
  return parseFloat((cgpa * multiplier).toFixed(2));
}

/**
 * Percentage to CGPA (reverse of above).
 * CGPA = Percentage / multiplier
 */
export function percentageToCgpa(
  percentage: number,
  multiplier: number
): number {
  if (multiplier === 0) return 0;
  return parseFloat((percentage / multiplier).toFixed(2));
}

/**
 * Percentage to SGPA.
 * SGPA = Percentage / multiplier
 */
export function percentageToSgpa(
  percentage: number,
  multiplier: number
): number {
  if (multiplier === 0) return 0;
  return parseFloat((percentage / multiplier).toFixed(2));
}

/**
 * Subject-wise SGPA calculation.
 * SGPA = Σ(credits × gradePoints) / Σ(credits)
 */
export function calculateSgpa(subjects: Subject[]): number {
  if (subjects.length === 0) return 0;
  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedSum = subjects.reduce(
    (acc, s) => acc + s.credits * s.gradePoints,
    0
  );
  return parseFloat((weightedSum / totalCredits).toFixed(2));
}

/**
 * Target CGPA planner.
 * Required SGPA = ((targetCGPA × totalSemesters) - (currentCGPA × completedSemesters)) / remainingSemesters
 */
export function targetSgpa(
  currentCgpa: number,
  completedSemesters: number,
  targetCgpa: number,
  totalSemesters: number
): number {
  const remaining = totalSemesters - completedSemesters;
  if (remaining <= 0) return 0;
  const required =
    (targetCgpa * totalSemesters - currentCgpa * completedSemesters) / remaining;
  return parseFloat(required.toFixed(2));
}

/**
 * Attendance planner.
 * Calculates current %, classes needed to reach target, classes that can be bunked.
 */
export function attendancePlanner(
  attended: number,
  total: number,
  target: number = 75
): AttendanceResult {
  const currentPercentage =
    total > 0 ? parseFloat(((attended / total) * 100).toFixed(2)) : 0;

  // Classes needed to reach target% assuming future classes are attended
  // (attended + x) / (total + x) >= target/100
  // x = (target * total - 100 * attended) / (100 - target)
  let needed = 0;
  if (currentPercentage < target && target < 100) {
    needed = Math.ceil(
      (target * total - 100 * attended) / (100 - target)
    );
    if (needed < 0) needed = 0;
  }

  // Classes that can be bunked while maintaining target%
  // attended / (total + x) >= target/100
  // x = (100 * attended - target * total) / target
  let canBunk = 0;
  if (currentPercentage >= target && target > 0) {
    canBunk = Math.floor(
      (100 * attended - target * total) / target
    );
    if (canBunk < 0) canBunk = 0;
  }

  const status: AttendanceResult["status"] =
    currentPercentage >= target
      ? "safe"
      : currentPercentage >= target - 5
        ? "warning"
        : "danger";

  return { currentPercentage, needed, canBunk, status };
}
