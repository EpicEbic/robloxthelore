import { WhatsNewEntry } from "@/types/whats-new-types";

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    id: "complete-chronological-update",
    date: "2026-01-11",
    title: "The Complete & Chronological Update",
    description: "The largest upgrade of the lore to-date, restructuring the entire website in preparation for the official plot. Alongside a completely rebuilt UI and backend, almost all entries have been updated or altered in one way or another.",
    changes: [
      { text: "The entire website has gone through an extensive UI overhaul, completely remade from scratch. This final iteration features the cleanest design yet and adds a handful of new sections to the main pages. This brings a close to the frequent style and interface changes. From now on, you are now seeing the definitive appearance of the website going forwards.", category: "new" },
      { text: "Among the UI rework of the website is a full update to the entry UI system, giving it a finalized look. It now features parallax, glass-like tiles with gaussian blur and more! Dropdown menus have been scrapped in favor of pill buttons to switch between different options. Entry themes have been redesigned across the board to adjust to this new system.", category: "new" },
      { text: "The website has been restructured around the plot timeline by introducing a 'Part' system. With this new system, the website will be divided into each part as it is introduced, allowing you to view the same (or new) entries throughout the different parts. Existing entries have been sorted appropriately into this new system, so you may notice a few entries missing as they have not canonically appeared in Part 1 yet.", category: "new" },
      { text: "A simple \"height comparison\" system has been added, allowing up to 4 characters to be placed side-by-side to be measured among one another.", category: "new" },
      { text: "There is now visual feedback when typing an easter egg, through a text box that appears atop the screen. The box will appear when typing a valid phrase, and flicker red if an incorrect letter is typed. This greatly reduces the amount of guesswork, turning it more into a game of trial and error.", category: "new" },
      { text: "In addition to the visual feedback easter eggs now give, two new easter egg phrases have been added. Note that these are less of a joke and more of a personal reflection on my life and relationship with The Lore over the years I've worked on this project. Do not expect hidden entries or content, only commentary.", category: "new" },
      { text: "A minor villain, Karblox Jones, has been added and given a custom theme.", category: "new" },
      { text: "As the official canon is in the works, existing character entries didn't entirely line up or hold true to the series anymore. Most entries have been updated, drastically altered, or stripped for the time being. As much as it hurt to delete most of my work, it will return slowly, rebuilt to be strongly-aligned with the canon.", category: "changes" },
      { text: "Caesar Bloxwright has been stripped and restructured for the upcoming plot. He has also received new images following a small redesign.", category: "changes" },
      { text: "Nauli Parter has been stripped and restructured for the upcoming plot.", category: "changes" },
      { text: "Vortex A. Steele has been stripped and restructured for the upcoming plot.", category: "changes" },
      { text: "Rice Farmer has been stripped and restructured for the upcoming plot.", category: "changes" },
      { text: "Bryck Manning has been stripped and restructured for the upcoming plot.", category: "changes" },
      { text: "Builderman has been hidden.", category: "changes" },
      { text: "Bloxxanne Whelder has been hidden.", category: "changes" },
      { text: "Spawnboy has been hidden.", category: "changes" },
      { text: "The Breadwinner has been hidden.", category: "changes" },
      { text: "The entire backend of the website has been reworked from scratch, restructuring hundreds of thousands of lines of code. Almost every aspect of the website has been adjusted or optimized in some way, drastically boosting efficiency and manageability. Load times and code/visual bugs have noticeably died down.", category: "fixes" },
      { text: "Code was not consistent between character entries prior to this update, some older characters used redundant features while others referenced systems or functions that no longer existed. A mass cleanup has been done, ensuring a 1:1 codebase across entries and other systems on the website. While this will not have any impact on the website's functionality or efficiency, it will make the project drastically easier to expand on in the future.", category: "fixes" },
      { text: "A handful of transitions were bugged, jarring, or outright broken. Any and all of these transitions have either been repaired or removed completely, making website navigation a lot smoother and hold far less of a delay.", category: "fixes" },
      { text: "The search bar felt truly pointless due to the smaller scope of the project, so it has been completely removed for the time being. Once the series has grown to a comfortably large size, it may be reintroduced.", category: "removals" },
      { text: "The Comparison System has only been gathering dust and growing more outdated by the day, so it has been completely removed for the time being. I still believe it has potential as a system, so it will likely return at a later date after some heavy workshopping.", category: "removals" }
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