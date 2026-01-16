/**
 * List of entry IDs that should be displayed as disabled (greyed out)
 * These entries will still be visible but appear greyed out and non-clickable
 */

export const DISABLED_ENTRY_IDS: Set<string> = new Set([
  // All characters except Caesar
  "nauli-parter",
  "vortex-a-steele",
  "rice-farmer",
  "ren-bytera",
  "spawnboy",
  "charles-studson",
  "bryck-manning",
  "the-reckoner",
  "builderman",
  "bloxxanne-whelder",
  "the-breadwinner",
  "the-bounceman",
  // Coils of Power
  "coils-of-power"
]);

/**
 * Check if an entry ID is disabled
 * @param entryId - The entry ID to check
 * @param enabledEntries - Optional set of enabled entry IDs (from easter egg context)
 * @returns true if the entry is disabled, false otherwise
 */
export function isEntryDisabled(entryId: string, enabledEntries?: Set<string>): boolean {
  // If entry is enabled (via UNLOCK command), it's not disabled
  if (enabledEntries && enabledEntries.has(entryId)) {
    return false;
  }
  return DISABLED_ENTRY_IDS.has(entryId);
}

