import { WhatsNewEntry } from "@/types/whats-new-types";

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    id: "complete-chronological-update",
    date: "2026-01-11",
    title: "The Complete & Chronological Update",
    description: "The largest update yet for The Lore! It reworks several aspects of the website and its contents. Most UIs have been overhauled or remade, most characters were updated or reworked, there are a handful of new characters, more official chapters for the plot timeline, and more!",
    changes: [
      { text: "The website's main-page UIs have all been completely remade from scratch. This finally brings a close to the constant style and interface changes, you are now seeing the definitive appearance of the website from this point and onwards. There are a handful of new UI elements and additions sprinkled around the main pages, including subcategory descriptions, etc.", category: "new" },
      { text: "To make way for the plot of the Lore as well as the webcomic, the entire website is now structured through the 'Part' system. By switching parts, you can see existing characters at different points in their life! Currently, Part 2 appears as 'T' and is named 'TEMP' for the time being, as Part 2 has yet to start being made. This addition is more of a for-the-future change, but it will pave the path to future changes using this new organization system.", category: "new" },
      { text: "The following characters have been added, given a custom theme and particles: Guest#1204, Larkon, Korag, and Darblox Jones.", category: "new" },
      { text: "Two new easter eggs have been added, but they are less of a joke and more of a personal reflection on myself and the growth of the series over the years.", category: "new" },
      { text: "The following characters have been restructured, reworked, given a theme and particles, or changed in one way or another: Caesar Bloxwright, Nauli Parter, Vortex A. Steele, Rice Farmer, Ren Bytera, Bryck Manning, The Bounceman.", category: "changes" },
      { text: "Ironically, the Updates system has gotten an update itself. What's New has been given visual polishing as well as category separating, so you can view the specific changes of an update filter any specific changes down.", category: "changes" },
      { text: "The World Map has received a visual overhaul and several optimizations. It has also received mobile support, allowing for pinching gestures to zoom in and out!", category: "changes" },
      { text: "Easter eggs now have a visual indicator when typing, so it isn't entirely guesswork. If you are typing a valid phrase, a small text box will appear at the top of your screen. If it flickers red, that means that the key you typed is invalid.", category: "changes" },
      { text: "The entire backend of the website has been reworked from scratch, restructuring hundreds of thousands of lines of code. Almost all aspects of the website have been optimized or adjusted for efficiency in one way or another. This should drastically improve load times.", category: "fixes" },
      { text: "The code, structure and functionality of some characters were not 1:1 across entries. Character entry logic and handling were entirely remade from the ground up, and are now coded (and have been made visually) identical to one another.", category: "fixes" },
      { text: "Some transitions, effects and changes would cause weird graphical errors or jarring swaps across the website. Most transitions and effects have been redone from scratch, and some were removed as I find that navigation is simply easier without them.", category: "fixes" },
      { text: "The search bar feels pointless due to the currently-small scope of the project, so it has been removed for the time being. Once the series is comfortably large, it may be reintroduced.", category: "removals" },
      { text: "The Comparison System has been growing more and more outdated as characters have developed and new changes and features have been made, so it has been removed for the time being.", category: "removals" },
      { text: "This doesn't really count as JUST a fix or a removal, so I'm putting this here: Tons of unused files, code, and features have been completely deleted from the website's data for the sake of optimization and structure organization.", category: "others" }
    ],
    isNew: true
  },
  {
    id: "topbar-timeline-update",
    date: "2026-01-05",
    title: "The Topbar & Timeline Update",
    description: "The first chapter of The Lore has been introduced to the Plot Timeline, alongside an overhaul which reworks the sidebar into a topbar!",
    changes: [
      { text: "Added Chapter 1 of The Lore's Plot Timeline! There is finally a clear vision of what the pilot will be! All of those pesky AI-generated filler entries are gone, I shouldn't have let them stay there in the first place.", category: "new" },
      { text: "The sidebar has been replaced by a topbar instead, similarly to what the old Lore website used to use! This bar takes up less space both horizontally and vertically, reducing clutter by a wide margin.", category: "changes" },
      { text: "The mobile variant of the site has recieved a handful of improvements, including an updated sidebar and button logic changes to make navigation feel smoother and easier overall.", category: "changes" },
      { text: "Some characters had incorrect archetypes that weren't properly updated, so all (available) entries now display the correct typing!", category: "fixes" }
    ],
    isNew: true
  },
  {
    id: "characteristics-coils-update",
    date: "2026-01-01",
    title: "The Characteristics & Coils Update",
    description: "Happy New Year, let us hope for a good 2026! Starting strong; A final, definitive version of the character grading system has been implemented, alongside character classifications known as Archetypes-- replacing the old alignment system.",
    changes: [
      { text: "The Statistics Page has recieved a complete and final overhaul, adding new categories to widely cover all kinds of Bloxians! Every character has had their stats adjusted in one way or another, so check to see how characters you like have been changed!", category: "changes" },
      { text: "The alignment system (Chaotic/Good, Lawful/Evil, etc.) has been expanded from the standard 9 types, to 25! Each character will be classified under one of the 25 different archetypes! Info for Archetypes can be found in the reworked Statistics Page.", category: "changes" },
      { text: "The Coils of Power have been reintroduced after going through a complete overhaul. Each coil is complete with their own themes and effects!", category: "new" },
      { text: "The \"Equipment\" section has been reworked into \"Objects\", with a new Materials subcategory for future additions such as Bloxite.", category: "changes" },
      { text: "A ton of old and unused code and images have been completely deleted or otherwise repurposed, speeding up loading times and preventing a handful of glitches that would occur if you swapped pages too quickly.", category: "removals" }
    ],
    isNew: true
  },
  {
    id: "buildup-banishment-update",
    date: "2025-12-24",
    title: "The Buildup & Banishment Update",
    description: "Merry Christmas, reader! Builderman and his trusty Banhammer have been reintroduced into The Lore, how jolly!",
    changes: [
      { text: "Builderman received a complete overhaul, updated for the modern systems and lore! He also has a theme and effects now!", category: "changes" },
      { text: "The Banhammer has received a partial rework, featuring updated text and new images! It also has a custom theme and flashy effects now!", category: "changes" },
      { text: "A \"Questions & Answers\" section has been added towards the bottom of the homepage with a few questions I assume people would wish to know the answer to. More questions may be added later on.", category: "new" },
      { text: "I removed a weird smoothing effect the site would apply when the total vertical height of the page changed, typically when viewing different text in an entry. I plan to implement a smoother transition later, one that doesn't trigger my own vertigo, haha.", category: "removals" }
    ],
    isNew: true
  },
  {
    id: "sodas-seltzers-update",
    date: "2025-12-21",
    title: "The Sodas and Seltzers Update",
    description: "Reintroducing the Bloxy Cola and the Witches Brew to the modern Lore!",
    changes: [
      { text: "Completely reworked Equipment entries to modernize them, similarly to the new character UI systems.", category: "changes" },
      { text: "Reworked the Bloxy Cola entry to use the new modern UI system. It has been completely rewritten, and has been given a custom theme!", category: "changes" },
      { text: "Reworked the Witches Brew entry to use the new modern UI system. It has been completely rewritten, and has been given a custom theme!", category: "changes" },
      { text: "The 'Coils of Power' entry is no more, I plan to rework it completely. The other entry, the 'Banhammer', has been locked and is pending a rework very soon!", category: "removals" },
      { text: "A small handful of bugs were fixed up, I forget most of them lol", category: "fixes" }
    ],
    isNew: true
  },
  {
    id: "rice-refocus-update",
    date: "2025-12-20",
    title: "The Rice & Refocus Update",
    description: "Rice Farmer's much-needed overhaul is finally here, plus a shift in direction for the website, with some features added and some removed.",
    changes: [
      { text: "Rice Farmer was given a complete rework, both visually and as a character! He's still a lovable softie, not to worry.", category: "changes" },
      { text: "As a ton of characters are pending updates, changes, or adaptations to the new systems in place-- I've locked a majority of entries on the site. They'll slowly be re-enabled as I work on each one individually.", category: "others" },
      { text: "The Fusion system has been removed, I didn't have as much fun working on it as I thought I would, and it's been sitting indefinitely on the backburner. I'm working on something much new and much cooler to replace it, so hang tight! (Rest in peace to the one fusion character, Spawnsar Bloxwright...)", category: "removals" }
    ],
    isNew: true
  },
  {
    id: "clean-classy-update",
    date: "2025-12-02",
    title: "The Clean & Classy Update",
    description: "After a long break, The Lore is back with a major overhaul to the website's UI system, alongside new visual enhancements, character reworks, a new character, and more!",
    changes: [
      { text: "The entire website has recieved a visual rework, along with a new layout and animation overhauls. Transitions between pages are smoother, and are accompinied by subtle effects and animations.", category: "changes" },
      { text: "The original theming system for entries has recieved a complete overhaul, now supporting multiple themes per-entry and dynamic particles that can be added just about anywhere. Only some entries have custom themes and particles for now, but with time every entry will recieve a theme!", category: "changes" },
      { text: "Touchups have been made to both the Comparison System and the Fusion system, primarily to make them compatible with the new themeing/particle system, but also for their own planned rework sometime in the future!", category: "changes" },
      { text: "An experimental \"World Map\" feature has been added alongside a reworked Bloxiverse entry! This new map will be expanded on later, especially as the Bloxiverse is further expanded on!", category: "new" },
      { text: "Many entries were entirely reworked, though some will see future changes. But just for now, only Caesar, Nauli, Vortex and Bryck have had upgrades. These are not final and will have more information added later, as always!", category: "changes" },
      { text: "A new entry was added for the Bounceman! It is a completed entry with a full theme and particles!", category: "new" },
      { text: "An impossibly large list of bug fixes and optimizations have been made, boosting loading times and navigation speeds across the entire website!", category: "fixes" }
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
      { text: "Total overhaul to Bryck's entry, updating him for the modern systems. Tons of new images and content to check out!", category: "changes" },
      { text: "Bryck has been enabled in the Comparison system, and can be matched with any other character available!", category: "changes" },
      { text: "Updates have significantly slowed down due to my lack of funding and a subscription at the moment, so big updates will take some time before releasing. For now, expect small drops such as character reworks or new characters every 2-10 days.", category: "others" }
    ],
    isNew: true
  },
  {
    id: "fusion-fixes-update",
    date: "2025-09-11",
    title: "The Fusion & Fixes Update",
    description: "An experimental \"Fusion\" system has been added, along with various bug fixes.",
    changes: [
      { text: "Added an experimental \"Fusion\" system that'll let you mix two characters together. It's purely for fun, and no characters produced through the fusion system are canon. I may remove it later depending on how I feel.", category: "new" },
      { text: "Fixed a visual bug that would prevent you from scrolling the sidebar list if the mouse couldn't properly focus on it.", category: "fixes" },
      { text: "Fixed the comparison system breaking if characters were rapidly selected and de-selected, sometimes causing the comparison system to highlight 3 characters and stop working.", category: "fixes" },
      { text: "Fixed character labels being incorrect due to how they were handled internally, such as how Spawnboy was labelled as an 'evil' character.", category: "fixes" }
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
      { text: "The Comparison System has received a complete overhaul, bringing a total visual redesign as well as a more-depthy matchup system. It currently works for all reworked characters! Characters that have yet to be reworked are greyed out for the time being.", category: "changes" },
      { text: "A few more bug fixes and adjustments to better improve the website's functionality.", category: "fixes" }
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
      { text: "Reworked Spawnboy's design and entry, and added character stats and history.", category: "changes" },
      { text: "Rebalanced the stats of every character, as well as their abilities if applicable to better match information provided by the \"Statistics Information\" page.", category: "changes" },
      { text: "Made design adjustments to the All Characters page, which now divides all characters by what type of character they are (Protagonist, Neutralist, etc.) rather than just listing them all in a bundle.", category: "changes" },
      { text: "Corrected a handful of grammatical errors present in a variety of different entries.", category: "fixes" },
      { text: "The Comparison Page now shows update images for every character, rather than using their old (and outdated) designs.", category: "changes" },
      { text: "Removed a ton of redundant code and optimized image loading. Entries and their images should load much faster now! More optimization will be done later.", category: "removals" }
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
      { text: "Added a new statistic system to measure the potential and overall capability of a character, and their ability if they have one! A page dedicated to statistics and their information was created to better elaborate on stats.", category: "new" },
      { text: "Added a \"Comparison\" system allowing you to match any two characters and compare their statistics! Data for matchups are still being worked on, but as of now it works with Caesar, Nauli, Vortex, and Rice!", category: "new" },
      { text: "Added a \"History\" section for character entries! History information is slowly being rolled out for all characters.", category: "new" },
      { text: "Reworked Caesar's design and entry, and added character stats and history.", category: "changes" },
      { text: "Reworked Nauli's design and entry, and added character stats and history.", category: "changes" },
      { text: "Heavily reworked Vortex's entry, and added his ability and character stats and history.", category: "changes" },
      { text: "Minor touchups to Rice's entry, including character stats and history.", category: "changes" },
      { text: "Heavy rework of Ren's entry, including a redesign, introduction of history, and a combat rework.", category: "changes" }
    ],
    isNew: false
  }
];