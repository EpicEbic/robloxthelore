// Combat Section Components
export { GradeTooltip, GradeBadge } from './grade-tooltip';
export { StatCard } from './stat-card';
export { StatsCardGrid } from './stats-card-grid';
export { TechniqueAccordion, TechniqueText, TechniqueList } from './technique-list';
export { TechniqueTabs } from './technique-tabs';

// Re-export stat types and constants from the unified stats system
export { 
  GRADE_VALUES,
  GRADE_COLORS, 
  PHYSICAL_CATEGORIES,
  PHYSICAL_STAT_DESCRIPTIONS,
  type GradeLabel,
  type StatGrade,
  type PhysicalStats,
  createPhysicalStats,
  createCombatStats,
  getStatDescription,
  getStatDefinition
} from '@/lib/stats';
