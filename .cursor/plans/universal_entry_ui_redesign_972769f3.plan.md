---
name: Universal Entry UI Redesign
overview: A comprehensive visual overhaul of all wiki entry types (Characters, Equipment, Locations) with unified glass-morphism styling, comprehensive glow effects, and consistent structure while maintaining type-specific metadata and preserving all existing content.
todos:
  - id: create-entry-components
    content: Create shared entry components directory with glass-panel, header, metadata, tabs
    status: completed
  - id: extend-theme-types
    content: Extend CharacterTheme interface with glow, glass, and effects properties
    status: completed
  - id: css-variables-utilities
    content: Add CSS variables and utility classes for glass-morphism and glows
    status: completed
  - id: unified-tab-navigation
    content: Build unified EntryTabNavigation component for all entry types
    status: completed
  - id: entry-metadata-component
    content: Create flexible EntryMetadata component with type-specific fields
    status: completed
  - id: refactor-character-card
    content: Refactor CharacterEntryCard to use new shared components
    status: completed
  - id: refactor-equipment-card
    content: Refactor EquipmentEntryCard to use new shared components
    status: completed
  - id: refactor-location-card
    content: Refactor LocationEntryCard to use new shared components
    status: completed
  - id: migrate-themes
    content: Update all 15+ character themes with new glow/glass/effects properties
    status: completed
  - id: mobile-optimization
    content: Optimize responsive layouts and performance for mobile devices
    status: completed
---

# Universal Entry UI Redesign Plan

## Design Philosophy

**Aesthetic Direction:** Elegant/Premium with subtle glass-morphism effects**Glow System:** Comprehensive application across borders, buttons, icons, and text**Layout Approach:** Moderate restructuring to reduce clutter and improve visual hierarchy**Animation Level:** Moderate - smooth transitions and subtle hover feedback**Content Preservation:** All existing writing, data, and functionality remains unchanged---

## Entry Type Overview

The wiki has three distinct entry types that share common UI patterns but have unique metadata:| Entry Type | Metadata Fields | Tab Sections ||------------|-----------------|--------------|| **Character** | Species, Age, Height, Status, Alignment/Archetype | Profile (Overview/Appearance/Personality), Relationships, Combat, Lifestyle & History, Trivia || **Equipment** | Subcategory (Artifacts/Standard/Materials) | Overview (Appearance/General Info), Functionality, Timeline, Trivia || **Location** | Type, Size, Region | Overview, Segments, Trivia |---

## Phase 1: Unified Base Component System

### 1.1 Create Shared Entry Components

Create a new directory [`src/components/entry/`](src/components/entry/) with base components:

```javascript
src/components/entry/
├── glass-panel.tsx          # Reusable glass container
├── entry-header.tsx         # Unified header (title, quote)
├── entry-metadata.tsx       # Flexible metadata bar
├── entry-tab-navigation.tsx # Shared tab system
├── entry-content-panel.tsx  # Content wrapper with glass
├── entry-image-carousel.tsx # Unified carousel
└── index.ts                 # Exports
```

**GlassPanel Component:**

```typescript
interface GlassPanelProps {
  children: React.ReactNode;
  glow?: boolean;
  glowColor?: string;
  intensity?: 'subtle' | 'moderate' | 'strong';
  className?: string;
}
```

**EntryMetadata Component:**

```typescript
interface MetadataField {
  icon: LucideIcon;
  label: string;
  value: string | React.ReactNode;
  expandable?: boolean;  // For archetype cards, etc.
}

interface EntryMetadataProps {
  fields: MetadataField[];
  variant: 'character' | 'equipment' | 'location';
}
```



### 1.2 Extend Theme System

Update [`src/types/character-theme-types.ts`](src/types/character-theme-types.ts):

```typescript
export interface CharacterTheme {
  // ...existing colors, gradients, particles...
  
  glow: {
    primary: string;
    secondary: string;
    intensity: 'subtle' | 'moderate' | 'intense';
    blur: number;
    spread: number;
  };
  
  glass: {
    blur: number;
    opacity: number;
    border: number;
    tint: string;
  };
  
  effects: {
    hoverScale: number;
    transitionSpeed: 'fast' | 'normal' | 'slow';
    shadowDepth: 'flat' | 'subtle' | 'elevated';
  };
}
```

---

## Phase 2: Entry-Specific Card Refactoring

### 2.1 Character Entry Card

Refactor [`src/components/character-entry-card.tsx`](src/components/character-entry-card.tsx):**Structure (unchanged logic, new styling):**

```javascript
┌─────────────────────────────────────────────────────────────────┐
│  CHARACTER HEADER (Title, Quote)                    [Glass]     │
├─────────────────────────────────────────────────────────────────┤
│  METADATA BAR                                       [Glass]     │
│  Species | Age | Height | Status | Alignment                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────┐  │
│  │              │  │  TAB NAVIGATION (Profile, Relations...) │  │
│  │   CAROUSEL   │  ├─────────────────────────────────────────┤  │
│  │   [Glass]    │  │                                         │  │
│  │              │  │  CONTENT PANEL                [Glass]   │  │
│  │              │  │  (Switchers, Text, Lists)               │  │
│  └──────────────┘  │                                         │  │
│                    └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Key Changes:**

- Replace current Card with GlassPanel
- Unified tab navigation styling with glow indicators
- Content panels wrapped in glass containers
- Metadata bar with consistent field rendering
- All existing section switchers preserved

### 2.2 Equipment Entry Card

Refactor [`src/components/equipment-entry-card.tsx`](src/components/equipment-entry-card.tsx):**Structure:**

```javascript
┌─────────────────────────────────────────────────────────────────┐
│  EQUIPMENT HEADER (Title, Quote)                    [Glass]     │
├─────────────────────────────────────────────────────────────────┤
│  METADATA BAR                                       [Glass]     │
│  Category: Artifact / Standard / Materials                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────┐  │
│  │              │  │  TAB NAVIGATION (Overview, Function...) │  │
│  │   CAROUSEL   │  ├─────────────────────────────────────────┤  │
│  │   [Glass]    │  │                                         │  │
│  │              │  │  CONTENT PANEL                [Glass]   │  │
│  │              │  │  (Appearance switcher, Timeline, etc.)  │  │
│  └──────────────┘  │                                         │  │
│                    └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Multi-Item Support (Coils of Power):**

- Tabbed item selector with glass styling
- Individual item cards with consistent glass panels
- Unified with character entry visual language

### 2.3 Location Entry Card

Refactor [`src/components/location-entry-card.tsx`](src/components/location-entry-card.tsx):**Structure:**

```javascript
┌─────────────────────────────────────────────────────────────────┐
│  LOCATION HEADER (Title, Quote)                     [Glass]     │
├─────────────────────────────────────────────────────────────────┤
│  METADATA BAR                                       [Glass]     │
│  Type | Size | Region                                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────┐  │
│  │              │  │  TAB NAVIGATION (Overview, Segments...) │  │
│  │   CAROUSEL   │  ├─────────────────────────────────────────┤  │
│  │  or MAP CTA  │  │                                         │  │
│  │   [Glass]    │  │  CONTENT PANEL                [Glass]   │  │
│  │              │  │  (Segments, Trivia)                     │  │
│  └──────────────┘  │                                         │  │
│                    └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 3: Unified Tab Navigation System

### 3.1 Create EntryTabNavigation Component

Replace individual tab implementations with unified component:

```typescript
interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  subTabs?: { id: string; label: string }[];  // For Profile sub-sections
}

interface EntryTabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  activeSubTab?: string;
  onTabChange: (tabId: string) => void;
  onSubTabChange?: (subTabId: string) => void;
}
```

**Visual Design:**

- Glass container with subtle backdrop blur
- Glowing underline indicator for active tab
- Smooth slide animation between tabs
- Icon + text with proper spacing
- Sub-tab buttons for Profile section (Overview/Appearance/Personality)

### 3.2 Tab Configurations Per Entry Type

**Character Tabs:**

```typescript
const CHARACTER_TABS: TabConfig[] = [
  { id: 'profile', label: 'Profile', icon: User, 
    subTabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'appearance', label: 'Appearance' },
      { id: 'personality', label: 'Personality' }
    ]
  },
  { id: 'relationships', label: 'Relationships', icon: Heart },
  { id: 'combat', label: 'Combat', icon: Sword },
  { id: 'lifestyle', label: 'Lifestyle & History', icon: Home },
  { id: 'trivia', label: 'Trivia', icon: ScrollText }
];
```

**Equipment Tabs:**

```typescript
const EQUIPMENT_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Package },
  { id: 'functionality', label: 'Functionality', icon: Zap },
  { id: 'timeline', label: 'Timeline', icon: History },
  { id: 'trivia', label: 'Trivia', icon: ScrollText }
];
```

**Location Tabs:**

```typescript
const LOCATION_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'segments', label: 'Segments', icon: Map },
  { id: 'trivia', label: 'Trivia', icon: ScrollText }
];
```

---

## Phase 4: CSS and Styling System

### 4.1 New CSS Variables

Add to [`src/index.css`](src/index.css):

```css
:root {
  /* Glass-morphism */
  --glass-blur: 8px;
  --glass-opacity: 0.15;
  --glass-border-opacity: 0.2;
  --glass-tint: transparent;
  
  /* Glow system */
  --glow-primary: hsl(var(--primary));
  --glow-secondary: hsl(var(--accent));
  --glow-intensity: 0.4;
  --glow-blur: 12px;
  --glow-spread: 2px;
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 400ms;
}
```



### 4.2 Glow Utility Classes

```css
.glow-border {
  box-shadow: 
    0 0 var(--glow-blur) var(--glow-spread) var(--glow-primary),
    inset 0 0 calc(var(--glow-blur) / 2) 0 rgba(var(--glow-primary-rgb), 0.1);
}

.glow-border-subtle {
  box-shadow: 0 0 8px 1px rgba(var(--glow-primary-rgb), 0.2);
}

.glow-text {
  text-shadow: 0 0 var(--glow-blur) var(--glow-primary);
}

.glow-icon {
  filter: drop-shadow(0 0 calc(var(--glow-blur) / 2) var(--glow-primary));
}

.glass-panel {
  background: rgba(var(--card-rgb), var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(var(--border-rgb), var(--glass-border-opacity));
}
```

---

## Phase 5: Theme Migration

### 5.1 Update All 15+ Existing Themes

For each theme in [`src/data/character-themes/`](src/data/character-themes/):Add default glow/glass/effects configurations that match character aesthetics:| Theme | Glow Primary | Glass Tint | Notes ||-------|-------------|------------|-------|| Caesar | #60a5fa (blue) | Blue | Electric feel || Nauli | #16a34a (green) | Green | Organic feel || Vortex | #a855f7 (purple) | Purple | Temporal feel || Rice Farmer | #3a7ca5 (earth blue) | Brown | Earthy warmth || Builderman | #f97316 (orange) | Orange | Divine warmth || Bounceman | #ef4444 (red) | Red | Energetic || ... | ... | ... | ... |

### 5.2 Create Default Theme

For entries without custom themes, create sensible defaults:

```typescript
const DEFAULT_THEME_EXTENSIONS = {
  glow: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--accent))',
    intensity: 'subtle',
    blur: 10,
    spread: 1,
  },
  glass: {
    blur: 8,
    opacity: 0.12,
    border: 0.15,
    tint: 'transparent',
  },
  effects: {
    hoverScale: 1.02,
    transitionSpeed: 'normal',
    shadowDepth: 'subtle',
  }
};
```

---

## Phase 6: Mobile Optimization

### 6.1 Responsive Adjustments

- Stack all sections vertically on mobile (existing behavior preserved)
- Increase touch targets for interactive elements
- Reduce backdrop-blur intensity on mobile for performance
- Collapse metadata bar into 2-column grid on mobile
- Maintain full functionality with adapted layouts

### 6.2 Performance Considerations

- Use `will-change` sparingly for animated elements
- Reduce glow effects on low-power devices
- CSS containment for isolated repaints
- Lazy-load non-critical visual enhancements

---

## File Changes Summary

| File | Action | Description ||------|--------|-------------|| `src/components/entry/` | Create | New shared component directory || `src/components/entry/glass-panel.tsx` | Create | Reusable glass container || `src/components/entry/entry-header.tsx` | Create | Unified header component || `src/components/entry/entry-metadata.tsx` | Create | Flexible metadata bar || `src/components/entry/entry-tab-navigation.tsx` | Create | Shared tab system || `src/components/entry/entry-content-panel.tsx` | Create | Content wrapper || `src/types/character-theme-types.ts` | Modify | Add glow/glass/effects || `src/index.css` | Modify | Add CSS variables and utilities || `src/styles/character-themes.css` | Modify | Update theme application || `src/components/character-entry-card.tsx` | Modify | Use new components || `src/components/equipment-entry-card.tsx` | Modify | Use new components || `src/components/location-entry-card.tsx` | Modify | Use new components || `src/components/character/character-content-tabs.tsx` | Modify | Use EntryTabNavigation || `src/components/equipment/equipment-content-tabs.tsx` | Modify | Use EntryTabNavigation || `src/components/location/location-content-tabs.tsx` | Modify | Use EntryTabNavigation || `src/components/character/character-basic-info.tsx` | Modify | Use EntryMetadata || `src/components/equipment/equipment-basic-info.tsx` | Modify | Use EntryMetadata || `src/components/location/location-basic-info.tsx` | Modify | Use EntryMetadata || `src/data/character-themes/*.ts` | Modify | Add new theme properties (15 files) || `src/hooks/use-theme-styles.ts` | Create | Theme-to-CSS hook |---

## Content Preservation Guarantee

**All existing content remains unchanged:**

- Character data files (`src/data/characters/*.ts`) - NO CHANGES to writing
- Equipment data files (`src/data/equipment/*.ts`) - NO CHANGES to writing
- Location data files (`src/data/locations/*.ts`) - NO CHANGES to writing
- Section switchers (appearance, personality, timeline, etc.) - Logic preserved
- Relationship system - Fully preserved
- Combat style system - Fully preserved
- Ability data system - Fully preserved

**Only visual presentation changes:**

- Wrapper components (glass styling)
- Tab navigation styling
- Metadata bar layout
- Color/glow effects from themes

---

## Implementation Order

1. **Foundation** - Create shared entry components, extend theme types
2. **CSS System** - Add variables, utilities, and glass styling
3. **Tab Navigation** - Build unified tab component
4. **Metadata Bars** - Create flexible metadata component
5. **Character Cards** - Refactor with new components
6. **Equipment Cards** - Refactor with new components
7. **Location Cards** - Refactor with new components
8. **Theme Migration** - Update all existing themes