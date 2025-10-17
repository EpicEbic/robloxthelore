import { WhatsNewEntry } from "@/types/whats-new-types";

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    id: "clean-classy-p2-update",
    date: "2025-10-17T12:00:00",
    title: "The Clean & Classy Update (Part 2 of 3)",
    description: "Introduces further upgrades to the website's interface, along with new and improved dedicated themes with particles and more!",
    changes: [
      "The sidebar UI menu has been reworked to be less intrusive. The new bar takes up less space and is more obviously-pronounced with its categories.",
      "Entry themes have been remade from the ground-up, with improved coloring! This also includes brand-new particle and VFX decorations! Each character will be given their own custom particles and themed entries, though for now this system has only been applied for the Protagonists.",
      "The Comparison System has been given a semi-rework, overhauling a majority of the visuals while otherwise keeping the same layout and premise. Additionally, the custom VFX and decorations now appear in the comparison system when matching two valid characters that both have complete themes.",
      "The Fusion system has been given a semi-rework, overhauling some of its visuals. The core functionality of the system remains unchanged.",
      "Custom scroll bars have been implemented, replacing the default microsoft/apple scroll bars when possible. This change won't affect mobile/tablet users due to limitations.",
      "As per-usual, a ton of optimization work has been done-- especially so due to the major graphical improvements and adjustments made.",
      "A TON of bugs were fixed, some introduced in Clean & Classy (Part 1 of 3) and others introduced and patched in the making of Clean & Classy (Part 2 of 3).",
      "This update is Part 2 out of 3 for the Clean & Classy Update, adding in core systems that will make way for the final part, primarily themes and the layout/visual changes to multiple pages on the site. Particles were fun to figure out!"
    ],
    isNew: true
  },
  {
    id: "clean-classy-p1-update",
    date: "2025-10-13",
    title: "The Clean & Classy Update (Part 1)",
    description: "Introduces significant upgrades to the website's interface, along with multiple enhancements and quality of life features.",
    changes: [
      "Made multiple changes and enhancements to the website's UI, modernizing it further with a handful of new animations and visual effects for different entries.",
      "Layout adjustments for character entries have been made, for future-planned changes not introduced in Part 1 of Clean & Classy.",
      "Characters and objects with multiple images now have small lists allowing a reader to click directly to a specific image if they wish.",
      "A ton of bug fixing and heavy optimization work has been done to further improve loading speeds, and performance on memory-hungry browsers.",
      "This update is Part 1 out of 3 for the Clean & Classy update, designed to give the website a fresh and fancy layout and UI. These changes not only look nicer, but will make way for several new features and quality of life changes in the future!"
    ],
    isNew: false
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