// ── TypeScript types for the Student Utility Hub ──

export interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoints: number;
}

export interface GradeOption {
  label: string;
  value: number;
}

export interface AttendanceResult {
  currentPercentage: number;
  needed: number;
  canBunk: number;
  status: "safe" | "warning" | "danger";
}

export interface CalculatorPageMeta {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  subtitle: string;
}

export interface SemesterSgpa {
  id: string;
  semester: number;
  sgpa: number;
}
