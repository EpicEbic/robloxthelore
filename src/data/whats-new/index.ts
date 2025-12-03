import { WhatsNewEntry } from "@/types/whats-new-types";

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    id: "clean-classy-update",
    date: "2025-12-02",
    title: "The Clean & Classy Update",
    description: "After a long break, The Lore is back with a major overhaul to the website's UI system, alongside new visual enhancements, character reworks, a new character, and more!",
    changes: [
      "The entire website has recieved a visual rework, along with a new layout and animation overhauls. Transitions between pages are smoother, and are accompinied by subtle effects and animations.",
      "The original theming system for entries has recieved a complete overhaul, now supporting multiple themes per-entry and dynamic particles that can be added just about anywhere. Only some entries have custom themes and particles for now, but with time every entry will recieve a theme!",
      "Touchups have been made to both the Comparison System and the Fusion system, primarily to make them compatible with the new themeing/particle system, but also for their own planned rework sometime in the future!",
      "An experimental \"World Map\" feature has been added alongside a reworked Bloxiverse entry! This new map will be expanded on later, especially as the Bloxiverse is further expanded on!",
      "Many entries were entirely reworked, though some will see future changes. But just for now, only Caesar, Nauli, Vortex and Bryck have had upgrades. These are not final and will have more information added later, as always!",
      "A new entry was added for the Bounceman! It is a completed entry with a full theme and particles!",
      "An impossibly large list of bug fixes and optimizations have been made, boosting loading times and navigation speeds across the entire website!"
    ],
    isNew: true
  },
  {
    id: "bryck-update",
    date: "2025-10-03",
    title: "The Bryck & Uhh... Just Bryck, actually. Update",
    description: "A total overhaul to Bryck's entry, updating him for the modern systems.",
    link: "/entry/bryck-manning",
    changes: [
      "Total overhaul to Bryck's entry, updating him for the modern systems. Tons of new images and content to check out!",
      "Bryck has been enabled in the Comparison system, and can be matched with any other character available!",
      "Updates have significantly slowed down due to my lack of funding and a subscription at the moment, so big updates will take some time before releasing. For now, expect small drops such as character reworks or new characters every 2-10 days."
    ],
    isNew: true
  },
  {
    id: "fusion-fixes-update",
    date: "2025-09-11",
    title: "The Fusion & Fixes Update",
    description: "An experimental \"Fusion\" system has been added, along with various bug fixes.",
    link: "/fusion",
    changes: [
      "Added an experimental \"Fusion\" system that'll let you mix two characters together. It's purely for fun, and no characters produced through the fusion system are canon. I may remove it later depending on how I feel.",
      "Fixed a visual bug that would prevent you from scrolling the sidebar list if the mouse couldn't properly focus on it.",
      "Fixed the comparison system breaking if characters were rapidly selected and de-selected, sometimes causing the comparison system to highlight 3 characters and stop working.",
      "Fixed character labels being incorrect due to how they were handled internally, such as how Spawnboy was labelled as an 'evil' character."
    ],
    isNew: false
  },
  {
    id: "cross-compare-update",
    date: "2025-08-29",
    title: "The Cross & Compare Update",
    description: "The Comparison System has received a complete overhaul.",
    link: "/comparison",
    changes: [
      "The Comparison System has received a complete overhaul, bringing a total visual redesign as well as a more-depthy matchup system. It currently works for all reworked characters! Characters that have yet to be reworked are greyed out for the time being.",
      "A few more bug fixes and adjustments to better improve the website's functionality."
    ],
    isNew: false
  },
  {
    id: "spawn-spiffy-update",
    date: "2025-08-26",
    title: "The Spawn & Spiffy Update",
    description: "Spawnboy's entry has been reworked, stats have been rebalanced, and other design adjustments.",
    link: "/entry/spawnboy",
    changes: [
      "Reworked Spawnboy's design and entry, and added character stats and history.",
      "Rebalanced the stats of every character, as well as their abilities if applicable to better match information provided by the \"Statistics Information\" page.",
      "Made design adjustments to the All Characters page, which now divides all characters by what type of character they are (Protagonist, Neutralist, etc.) rather than just listing them all in a bundle.",
      "Corrected a handful of grammatical errors present in a variety of different entries.",
      "The Comparison Page now shows update images for every character, rather than using their old (and outdated) designs.",
      "Removed a ton of redundant code and optimized image loading. Entries and their images should load much faster now! More optimization will be done later."
    ],
    isNew: false
  },
  {
    id: "statistics-quality-update",
    date: "2025-08-14",
    title: "The Statistics & Quality Update",
    description: "A new statistic system, a comparison system, and history sections have been added.",
    link: "/statistics",
    changes: [
      "Added a new statistic system to measure the potential and overall capability of a character, and their ability if they have one! A page dedicated to statistics and their information was created to better elaborate on stats.",
      "Added a \"Comparison\" system allowing you to match any two characters and compare their statistics! Data for matchups are still being worked on, but as of now it works with Caesar, Nauli, Vortex, and Rice!",
      "Added a \"History\" section for character entries! History information is slowly being rolled out for all characters.",
      "Reworked Caesar's design and entry, and added character stats and history.",
      "Reworked Nauli's design and entry, and added character stats and history.",
      "Heavily reworked Vortex's entry, and added his ability and character stats and history.",
      "Minor touchups to Rice's entry, including character stats and history.",
      "Heavy rework of Ren's entry, including a redesign, introduction of history, and a combat rework."
    ],
    isNew: false
  }
];