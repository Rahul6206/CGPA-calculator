import type { GradeOption } from "./types";

// ── Default Grade Scale (10-point Indian University System) ──
export const GRADE_OPTIONS: GradeOption[] = [
  { label: "O (Outstanding)", value: 10 },
  { label: "A+ (Excellent)", value: 9 },
  { label: "A (Very Good)", value: 8 },
  { label: "B+ (Good)", value: 7 },
  { label: "B (Above Average)", value: 6 },
  { label: "C (Average)", value: 5 },
  { label: "P (Pass)", value: 4 },
  { label: "F (Fail)", value: 0 },
];

// ── Default conversion multiplier ──
export const DEFAULT_MULTIPLIER = 9.5;

// ── LocalStorage keys ──
export const LS_KEYS = {
  MULTIPLIER: "suh-multiplier",
  GRADE_SCALE: "suh-grade-scale",
  SGPA_SEMESTERS: "suh-sgpa-semesters",
  SUBJECTS: "suh-subjects",
  ATTENDANCE: "suh-attendance",
} as const;

// ── Navigation links ──
export const NAV_LINKS = [
  { label: "Converters", href: "/#converters" },
  { label: "Advanced", href: "/#advanced" },
  { label: "Settings", href: "/settings" },
] as const;

// ── Calculator cards for the homepage ──
export const CONVERTER_CARDS = [
  {
    title: "SGPA to CGPA",
    description: "Convert multiple semester SGPAs to cumulative CGPA.",
    href: "/sgpa-to-cgpa",
    icon: "📊",
  },
  {
    title: "CGPA to Percentage",
    description: "Convert your CGPA to percentage using standard formulas.",
    href: "/cgpa-to-percentage",
    icon: "📈",
  },
  {
    title: "Percentage to CGPA",
    description: "Reverse-calculate your CGPA from percentage.",
    href: "/percentage-to-cgpa",
    icon: "🔄",
  },
  {
    title: "Percentage to SGPA",
    description: "Convert percentage to semester-specific SGPA.",
    href: "/percentage-to-sgpa",
    icon: "🎯",
  },
] as const;

export const ADVANCED_CARDS = [
  {
    title: "Subject-wise SGPA",
    description:
      "Add subjects with credits and grades to calculate semester SGPA.",
    href: "/sgpa-calculator",
    icon: "📝",
  },
  {
    title: "Target CGPA Planner",
    description:
      "Plan the SGPA you need in remaining semesters to hit your target.",
    href: "/target-cgpa",
    icon: "🎯",
  },
  {
    title: "Attendance Planner",
    description:
      "Track attendance and know how many classes you can safely skip.",
    href: "/attendance-planner",
    icon: "📅",
  },
] as const;

// ── Max values for validation ──
export const MAX_SGPA = 10;
export const MAX_CGPA = 10;
export const MAX_PERCENTAGE = 100;
export const MAX_CREDITS = 10;
export const MAX_SEMESTERS = 12;
export const DEFAULT_ATTENDANCE_TARGET = 75;
