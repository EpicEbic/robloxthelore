import { ReactNode } from "react";
import { X, Quote, Compass, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Archetype } from "@/data/character-archetypes";

/**
 * Archetype cell colors with inline-style-ready hex values
 * Organized as [row][column] for consistent lookup
 */
export const ARCHETYPE_COLORS: Record<string, Record<string, {
  bgGradient: string;
  borderColor: string;
  textColor: string;
  bgSolid: string;
}>> = {
  // Good row - bright, vibrant colors
  good: {
    lawful: { bgGradient: "linear-gradient(135deg, rgba(8, 145, 178, 0.6) 0%, rgba(6, 95, 118, 0.8) 100%)", borderColor: "#22d3ee", textColor: "#22d3ee", bgSolid: "rgba(8, 145, 178, 0.4)" },
    social: { bgGradient: "linear-gradient(135deg, rgba(101, 163, 13, 0.6) 0%, rgba(63, 98, 18, 0.8) 100%)", borderColor: "#a3e635", textColor: "#a3e635", bgSolid: "rgba(101, 163, 13, 0.4)" },
    neutral: { bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.6) 0%, rgba(20, 83, 45, 0.8) 100%)", borderColor: "#4ade80", textColor: "#4ade80", bgSolid: "rgba(22, 163, 74, 0.4)" },
    rebel: { bgGradient: "linear-gradient(135deg, rgba(202, 138, 4, 0.6) 0%, rgba(113, 63, 18, 0.8) 100%)", borderColor: "#facc15", textColor: "#facc15", bgSolid: "rgba(202, 138, 4, 0.4)" },
    chaotic: { bgGradient: "linear-gradient(135deg, rgba(234, 88, 12, 0.6) 0%, rgba(124, 45, 18, 0.8) 100%)", borderColor: "#fb923c", textColor: "#fb923c", bgSolid: "rgba(234, 88, 12, 0.4)" },
  },
  // Moral row - slightly cooler tones
  moral: {
    lawful: { bgGradient: "linear-gradient(135deg, rgba(13, 148, 136, 0.6) 0%, rgba(17, 94, 89, 0.8) 100%)", borderColor: "#2dd4bf", textColor: "#2dd4bf", bgSolid: "rgba(13, 148, 136, 0.4)" },
    social: { bgGradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.6) 0%, rgba(6, 78, 59, 0.8) 100%)", borderColor: "#34d399", textColor: "#34d399", bgSolid: "rgba(5, 150, 105, 0.4)" },
    neutral: { bgGradient: "linear-gradient(135deg, rgba(22, 163, 74, 0.6) 0%, rgba(20, 83, 45, 0.8) 100%)", borderColor: "#22c55e", textColor: "#22c55e", bgSolid: "rgba(22, 163, 74, 0.4)" },
    rebel: { bgGradient: "linear-gradient(135deg, rgba(101, 163, 13, 0.6) 0%, rgba(63, 98, 18, 0.8) 100%)", borderColor: "#84cc16", textColor: "#84cc16", bgSolid: "rgba(101, 163, 13, 0.4)" },
    chaotic: { bgGradient: "linear-gradient(135deg, rgba(202, 138, 4, 0.6) 0%, rgba(113, 63, 18, 0.8) 100%)", borderColor: "#eab308", textColor: "#eab308", bgSolid: "rgba(202, 138, 4, 0.4)" },
  },
  // Neutral row - gray/muted tones
  neutral: {
    lawful: { bgGradient: "linear-gradient(135deg, rgba(71, 85, 105, 0.6) 0%, rgba(30, 41, 59, 0.8) 100%)", borderColor: "#94a3b8", textColor: "#94a3b8", bgSolid: "rgba(71, 85, 105, 0.4)" },
    social: { bgGradient: "linear-gradient(135deg, rgba(75, 85, 99, 0.6) 0%, rgba(31, 41, 55, 0.8) 100%)", borderColor: "#9ca3af", textColor: "#9ca3af", bgSolid: "rgba(75, 85, 99, 0.4)" },
    neutral: { bgGradient: "linear-gradient(135deg, rgba(82, 82, 91, 0.6) 0%, rgba(39, 39, 42, 0.8) 100%)", borderColor: "#d4d4d8", textColor: "#d4d4d8", bgSolid: "rgba(82, 82, 91, 0.4)" },
    rebel: { bgGradient: "linear-gradient(135deg, rgba(87, 83, 78, 0.6) 0%, rgba(41, 37, 36, 0.8) 100%)", borderColor: "#a8a29e", textColor: "#a8a29e", bgSolid: "rgba(87, 83, 78, 0.4)" },
    chaotic: { bgGradient: "linear-gradient(135deg, rgba(82, 82, 82, 0.6) 0%, rgba(38, 38, 38, 0.8) 100%)", borderColor: "#a3a3a3", textColor: "#a3a3a3", bgSolid: "rgba(82, 82, 82, 0.4)" },
  },
  // Impure row - warmer, orange-tinted
  impure: {
    lawful: { bgGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.6) 0%, rgba(76, 29, 149, 0.8) 100%)", borderColor: "#a78bfa", textColor: "#a78bfa", bgSolid: "rgba(124, 58, 237, 0.4)" },
    social: { bgGradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.6) 0%, rgba(120, 53, 15, 0.8) 100%)", borderColor: "#f59e0b", textColor: "#f59e0b", bgSolid: "rgba(217, 119, 6, 0.4)" },
    neutral: { bgGradient: "linear-gradient(135deg, rgba(234, 88, 12, 0.6) 0%, rgba(124, 45, 18, 0.8) 100%)", borderColor: "#f97316", textColor: "#f97316", bgSolid: "rgba(234, 88, 12, 0.4)" },
    rebel: { bgGradient: "linear-gradient(135deg, rgba(234, 88, 12, 0.6) 0%, rgba(124, 45, 18, 0.8) 100%)", borderColor: "#fb923c", textColor: "#fb923c", bgSolid: "rgba(234, 88, 12, 0.4)" },
    chaotic: { bgGradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.6) 0%, rgba(127, 29, 29, 0.8) 100%)", borderColor: "#f87171", textColor: "#f87171", bgSolid: "rgba(220, 38, 38, 0.4)" },
  },
  // Evil row - dark, red-tinted
  evil: {
    lawful: { bgGradient: "linear-gradient(135deg, rgba(192, 38, 211, 0.6) 0%, rgba(112, 26, 117, 0.8) 100%)", borderColor: "#e879f9", textColor: "#e879f9", bgSolid: "rgba(192, 38, 211, 0.4)" },
    social: { bgGradient: "linear-gradient(135deg, rgba(225, 29, 72, 0.6) 0%, rgba(136, 19, 55, 0.8) 100%)", borderColor: "#fb7185", textColor: "#fb7185", bgSolid: "rgba(225, 29, 72, 0.4)" },
    neutral: { bgGradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.6) 0%, rgba(127, 29, 29, 0.8) 100%)", borderColor: "#ef4444", textColor: "#ef4444", bgSolid: "rgba(220, 38, 38, 0.4)" },
    rebel: { bgGradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.6) 0%, rgba(127, 29, 29, 0.8) 100%)", borderColor: "#f87171", textColor: "#f87171", bgSolid: "rgba(220, 38, 38, 0.4)" },
    chaotic: { bgGradient: "linear-gradient(135deg, rgba(153, 27, 27, 0.6) 0%, rgba(69, 10, 10, 0.8) 100%)", borderColor: "#dc2626", textColor: "#dc2626", bgSolid: "rgba(153, 27, 27, 0.4)" },
  },
};

/**
 * Helper to get colors by archetype
 */
export function getArchetypeColors(archetype: Archetype) {
  return ARCHETYPE_COLORS[archetype.row]?.[archetype.column] || ARCHETYPE_COLORS.neutral.neutral;
}

/**
 * Character data for display in the expanded card
 */
export interface ArchetypeCharacter {
  id: string;
  title: string;
  iconUrl?: string | null;
}

/**
 * Props for the ExpandedArchetypeCard component
 */
export interface ExpandedArchetypeCardProps {
  archetype: Archetype;
  onClose: () => void;
  characters?: ArchetypeCharacter[];
  className?: string;
  /** Whether to render as an overlay (absolute positioning) or inline */
  overlay?: boolean;
}

/**
 * ExpandedArchetypeCard - A shared component for displaying detailed archetype information
 * 
 * This component uses INLINE STYLES exclusively to ensure it is completely immune
 * to character theme CSS overrides. All colors, text, and icons will display
 * consistently regardless of the theming context.
 * 
 * Used by:
 * - ArchetypeGrid (Statistics page)
 * - EntryInfoBar (Character entries)
 */
export function ExpandedArchetypeCard({
  archetype,
  onClose,
  characters = [],
  className = "",
  overlay = false,
}: ExpandedArchetypeCardProps) {
  const colors = getArchetypeColors(archetype);

  // Base container styles with CSS custom properties for theme override
  const containerStyle: React.CSSProperties & { [key: string]: string } = {
    background: colors.bgGradient,
    borderColor: colors.borderColor,
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "16px",
    overflow: "hidden",
    position: overlay ? "absolute" : "relative",
    ...(overlay ? { inset: "0", zIndex: "10" } : {}),
    // CSS custom properties for theme override (used by character-themes.css)
    "--archetype-text-color": colors.textColor,
    "--archetype-body-color": "rgba(255, 255, 255, 0.9)",
    "--archetype-icon-color": colors.textColor,
  } as React.CSSProperties;

  // Icon container styles
  const iconContainerStyle: React.CSSProperties = {
    width: "56px",
    height: "56px",
    minWidth: "56px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.borderColor,
    background: colors.bgSolid,
  };

  // Badge styles
  const badgeStyle: React.CSSProperties = {
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "6px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.borderColor,
    color: colors.textColor,
    background: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div style={containerStyle} className={`archetype-card-exempt ${className}`}>
      {/* Background decorative elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-96px",
            right: "-96px",
            width: "192px",
            height: "192px",
            borderRadius: "50%",
            opacity: 0.1,
            background: colors.borderColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-64px",
            left: "-64px",
            width: "128px",
            height: "128px",
            borderRadius: "50%",
            opacity: 0.1,
            background: colors.borderColor,
          }}
        />
      </div>

      {/* Close button - positioned with safe margin */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "12px",
          borderRadius: "50%",
          zIndex: 20,
          background: "rgba(255, 255, 255, 0.1)",
          border: `1px solid ${colors.borderColor}`,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Close archetype card"
      >
        <X
          style={{
            width: "20px",
            height: "20px",
            color: "#ffffff",
            stroke: "#ffffff",
          }}
        />
      </button>

      {/* Content container with generous padding */}
      <div
        style={{
          position: "relative",
          height: overlay ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          paddingRight: "64px", // Extra space for close button
          overflow: overlay ? "auto" : "visible",
        }}
      >
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
          {/* Icon */}
          <div style={iconContainerStyle}>
            <Compass
              style={{
                width: "28px",
                height: "28px",
                color: colors.textColor,
                stroke: colors.textColor,
              }}
            />
          </div>

          {/* Title and Badges */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
                color: colors.textColor,
                lineHeight: 1.2,
              }}
            >
              {archetype.name}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <span style={badgeStyle}>{archetype.columnLabel}</span>
              <span style={badgeStyle}>{archetype.rowLabel}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            width: "100%",
            marginBottom: "24px",
            background: colors.borderColor,
            opacity: 0.4,
          }}
        />

        {/* Description Section */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1 }}>
          <Quote
            style={{
              width: "24px",
              height: "24px",
              flexShrink: 0,
              marginTop: "2px",
              opacity: 0.5,
              color: colors.textColor,
              stroke: colors.textColor,
            }}
          />
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
            }}
          >
            {archetype.description || (
              <span style={{ fontStyle: "italic", color: "rgba(255, 255, 255, 0.6)" }}>
                No description available yet.
              </span>
            )}
          </p>
        </div>

        {/* Characters Section (optional) */}
        {characters.length > 0 && (
          <div
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "16px",
                color: colors.textColor,
              }}
            >
              Characters with this Archetype:
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {characters.map((character) => (
                <div
                  key={character.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Link
                    to={`/entry/${character.id}`}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `2px solid ${colors.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: colors.bgSolid,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {character.iconUrl ? (
                      <img
                        src={character.iconUrl}
                        alt={character.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Users
                        style={{
                          width: "24px",
                          height: "24px",
                          color: colors.textColor,
                          stroke: colors.textColor,
                        }}
                      />
                    )}
                  </Link>
                  <span
                    style={{
                      fontSize: "11px",
                      textAlign: "center",
                      fontWeight: 500,
                      maxWidth: "80px",
                      lineHeight: 1.3,
                      color: colors.textColor,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {character.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Press the X button to close
          </span>
        </div>
      </div>
    </div>
  );
}

