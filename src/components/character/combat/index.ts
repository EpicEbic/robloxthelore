// Combat Section Components
export { GradeTooltip, GradeBadge } from './grade-tooltip';
export { StatCard, PotentialCard } from './stat-card';
export { StatsCardGrid } from './stats-card-grid';
export { TechniqueAccordion, TechniqueText, TechniqueList } from './technique-list';
export { TechniqueTabs } from './technique-tabs';

// Re-export stat types and constants from the unified stats system
// Note: stat-constants.ts is deprecated - use @/lib/stats instead
export { 
  GRADE_VALUES,
  GRADE_COLORS, 
  PHYSICAL_CATEGORIES,
  ABILITY_CATEGORIES,
  PHYSICAL_STAT_DESCRIPTIONS,
  ABILITY_STAT_DESCRIPTIONS,
  type GradeLabel,
  type StatGrade,
  type PhysicalStats,
  type AbilityStats,
  createPhysicalStats,
  createCombatStats,
  createAbilityStats,
  createCharacterStats,
  getStatDescription,
  getStatDefinition
} from '@/lib/stats';
