// Custom matchup descriptions for specific character combinations
export interface Matchup {
  entries: [string, string]; // IDs of the two entries
  description: string;
}

export const customMatchups: Matchup[] = [
  // Example matchups - add your custom descriptions here
  {
    entries: ["the-reckoner", "builderman"],
    description: "A clash between the ultimate destructor and the ultimate creator. The Reckoner's reality-bending powers face off against Builderman's infinite construction abilities in a battle that could reshape the very fabric of the Bloxiverse."
  },
  {
    entries: ["spawnboy", "the-breadwinner"],
    description: "The eternal newbie versus the seasoned veteran. While Spawnboy represents endless potential and fresh starts, The Breadwinner brings experience and hard-earned wisdom to this unlikely confrontation."
  },
  {
    entries: ["caesar-bloxwright", "nauli-parter"],
    description: "Caesar's combative style mostly revolves around his devastating strength and destructive potential, as well as his ability to absorb and shrug off a majority of incoming damage. Although Caesar is much more physically imposing than Nauli, she has an advantage over Caesar due to her agility and tactical intelligence. Pathokinesis would also be incredibly effective against Caesar, as he is mentally vulnerable to manipulation.\n\nDespite Nauli's tactical edge against Caesar, she could do very little to harm him. Caesar's hard-light armor and natural vitality easily shrug off any damage her combat knife could do, and Nauli is far too weak to injure Caesar herself. On top of this, Nauli would be putting herself at risk by attempting any close-quarters attack, as getting near him is very dangerous-- especially due to her weaker and fragile physique."
  },
  {
    entries: ["caesar-bloxwright", "vortex-a-steele"],
    description: "Vortex is a highly versatile fighter, with a combative style allowing him to adapt to a majority of opponents. However, many of his weapons would be ineffective against Caesar, due to the Electrogravitic Flow warping magnetic fields and gravity. Vortex's Mag-num would be completely ineffective against Caesar's Flow, and would likely struggle to penetrate his hard-light armor.\n\nWhile Vortex could use the Amplification Gauntlet to breach Caesar's armor and harm him, that would require sacrificing a great deal of his own agility. Such a sacrifice could leave Vortex vulnerable to being struck by Caesar, who can incapacitate most targets in just a few punches, even without amplifying his body through the Flow.\n\nIf Vortex plays defensively and makes good use of his Chronipulation, he may be able to land a few strikes onto Caesar's body, though they're unlikely to incapacitate Caesar. In a likely scenario, both would exhaust their supply of stamina due to the large quantities of energy that both the Flow and Chronipulation require."
  },
  {
    entries: ["vortex-a-steele", "nauli-parter"],
    description: "Vortex and Nauli both excel in their precision and speed, but Vortex has far more advantages above her in direct combat, especially when taking his Chronipulation into account.\n\nAssuming Vortex takes care of his stamina and manages the use of his Chronipulation, he'd have little difficulty overwhelming Nauli with his impossible speeds. Paired up with his Mag-num and Amplification Gauntlet, Nauli would find it difficult to consistently dodge his redirecting bullets. However, she'd likely be able to evade strikes from his Amplification Gauntlet, due to the significantly bulky nature of the weapon.\n\nNauli could likely hinder Vortex mid-fight, as Pathokinesis is effective against those who act irrationally or carelessly. However, she'd likely be unable to suppress his will completely, especially when taking Vortex's loyalty and dedication to the Hunter Association into account."
  },
  {
    entries: ["caesar-bloxwright", "rice-farmer"],
    description: "Rice is nothing more than a standard civilian, with no special abilities or strengths that could give him even a sliver of a chance against Caesar. At best, Rice could attempt to flee, but Caesar's Flow would be quick to catch Rice, if Caesar himself doesn't catch Rice first."
  },
  {
    entries: ["nauli-parter", "rice-farmer"],
    description: "Rice is but a humble civilian with no combative experience or abilities of his own, so he'd be quick to fall victim to Nauli. Her tactical knife would be more than enough to eliminate Rice, if her bare hands don't finish the job first.\n\nEven if Nauli were to avoid using her ability, Rice is far outclassed in almost every physical way. He'd be more of a victim than an opponent for her."
  },
  {
    entries: ["rice-farmer", "vortex-a-steele"],
    description: "A fight between Rice and Vortex would be trivial. Even without the use of Chronipulation, a single well-aimed bullet would be enough to bring about the end of Rice's life. His Amplification Gauntlet could easily break all of Rice's bones, even if it is unattuned to Chronipulation.\n\nThough Rice is armed with a rake, it would do very little beyond inconveniencing Vortex, as Rice is too weak to swing it with significant force or precision."
  },
  {
    entries: ["caesar-bloxwright", "ren-bytera"],
    description: "Caesar heavily outclasses or matches Ren in almost all aspects of being, save for Ren's far-superior intellect. Ren is an efficient manipulator and could easily bluff or mislead Caesar into falling for her different traps and inventions, while keeping a decent pace to try and maintain distance.\n\nCaesar may struggle against Ren's Biograft Blade, as it can easily pierce and melt through almost any material, including Caesar's hard-light armor and body. However, due to Ren's inexperience and the danger of entering close-quarter combat with Caesar, it'd likely only prove to be Ren's own downfall.\n\nThe Ion Shielding augment may be able to deflect and negate some of Caesar's energy, but it would quickly unmanifest under the pressure. Even if it could withstand the Flow, Caesar's brute strength would enable him to dismantle the shield with his bare hands."
  },
  {
    entries: ["caesar-bloxwright", "spawnboy"],
    description: "Though Caesar is a tough fighter with strength and durability to boot, he'd stand little chance against a deity such as Spawnboy. Even assuming a level playing field outside of the Edge, Caesar's efforts would all be for naught against Spawnboy's sheer power and defenses.\n\nEven if Caesar is given the benefit of the doubt and fights Spawnboy without Spawnboy's intangibility, he'd likely fall victim to their Respawner within the first few moments of the fight."
  },
  {
    entries: ["nauli-parter", "ren-bytera"],
    description: "Despite Nauli's superior physicals, Ren's augments would likely hold their own against Nauli-- at least for a time. Ren's Ion Shielding would hold easily against Nauli's weaker physique, and Pathokinesis would be ineffective against someone with such little sanity and high intelligence.\n\nEven without the shielding, Ren's Biograft Blade could prove highly lethal against Nauli, even with just a single slice. However, a close-quarters initiation would likely favor Nauli, as Ren is significantly limited in her combat experience and struggles to properly handle the blade against a target."
  },
  {
    entries: ["nauli-parter", "spawnboy"],
    description: "Faced against the deity responsible for life and death, Nauli could do very little against Spawnboy other than attempt to evade and stall the inevitable. Pathokinesis would be completely ineffective, as Spawnboy is physically incapable of experiencing or understanding the concept of emotions.\n\nEven without using their incredible strength or speed, a mere tap of Spawnboy's Respawner would be enough to instantly obliterate Nauli's lifeforce."
  },
  {
    entries: ["ren-bytera", "vortex-a-steele"],
    description: "Vortex and Ren both have their strengths and weaknesses, but Vortex mostly outclasses Ren in almost all aspects, save for Ren's intelligence and defense while making use of the Ion Shielding.\n\nThough the Ion Shielding would be able to stave off Vortex by default, his Mag-num (especially if it has been attuned to his Chronipulation) can easily breach the energy barrier protecting Ren and injure her. Ren could opt to pour more energy into the shielding to deflect the bullets, but that would quickly drain her reserves and leave her defenseless even faster.\n\nRen's Biograft Blade may be able to hold off Vortex at close range for a few moments, but she'd find herself quickly overwhelmed by Vortex's insane agility, especially if his Chronipulation is active. Vortex is the cautious type, and would be unlikely to fall victim to the dangerous blade."
  },
  {
    entries: ["vortex-a-steele", "spawnboy"],
    description: "Pushed to his absolute limits, Vortex could likely hold his own against a deity such as Spawnboy. Spawnboy is incredibly fast, but Vortex's Chronipulation allows him to bypass the conventional \"speed limit\" of reality, enabling him to match Spawnboy's pace. Though this would exhaust him quickly, Vortex would be able to successfully go head-to-head momentarily with them.\n\nDespite being able to equal the playing field in speed, Vortex has no means of actually harming an intangible deity. His efforts would be valiant, but all for naught as Spawnboy would inevitably tire Vortex out, or successfully make contact with his body using the Respawner."
  },
  {
    entries: ["rice-farmer", "ren-bytera"],
    description: "While Rice and Ren have near-matching physicals, Ren outclasses him by a long-shot when taking her augments into account. Even armed with a rake and given the element of surprise, Ren's Ion Shielding would easily prevent the rake from coming into contact with her body.\n\nRice would be able to do very little, even if he had a means of bypassing the shielding. Ren's Biograft Blade would make quick work of his limbs if he got too close, leaving Rice with essentially no options beyond running away-- but Ren would easily be able to match his pace."
  },
  {
    entries: ["spawnboy", "rice-farmer"],
    description: "Rice already performs poorly when in combat with standard Bloxians, so pitting him against a deity such as Spawnboy is remarkably overkill. So overkill, in fact, that I won't even humor your selection with a detailed description of how things go down. You probably already knew how they'd go down when you shoved both characters in here. Sicko."
  },
  {
    entries: ["bryck-manning", "caesar-bloxwright"],
    description: "Both Caesar and Bryck rely on the manipulation of gravity to outwit or overpower their opponents, however Caesar's ability is latent while Bryck's ability stems from the Gravity Coil in his possession. The two forces cancel each other out when used against one another, leading the fight between the two to be more about physical strength and endurance, rather than one ability over another.\n\nBryck has a tactical edge in the form of agility, as the Gravity Coil enables Bryck to alter his weight and reduce it, whereas Caesar's ability only enables him to intensify gravity. However, even performing deadly feats involving dive-bombing from the clouds into Caesar would prove futile at piercing his remarkable resistance to physical trauma."
  },
  {
    entries: ["bryck-manning", "nauli-parter"],
    description: "Bryck and Nauli both have notable edges against one another in combat. While Bryck has an edge in agility due to his ability to fly, hover, and quickly slam down on command, Nauli has no ranged means of injuring Bryck if he remains in the air, allowing him to swoop down and crash into Nauli rapidly.\n\nHowever, Nauli's ability, Pathokinesis, proves extremely effective against a fragile mind such as Bryck's. He'd be easy to manipulate, allowing Nauli to break his focus and prevent him from efficiently using the Gravity Coil properly, keeping him on the ground and allowing Nauli to go in for the kill."
  },
  {
    entries: ["bryck-manning", "vortex-a-steele"],
    description: "Vortex has many tactical advantages against Bryck, especially in a one-on-one combat situation. Despite Bryck's remarkable mobility and high-speed offensive options, he'd struggle heavily to hold his own against a time manipulator such as Vortex. When taking Vortex's arsenal of weapons into account, the outcome only looks more grim for Bryck.\n\nBryck effectively has no safe space to hide in, as Vortex's Mag-num would make quick work of Bryck if he chose to hover in the sky, and confronting Vortex physically would likely end with his Amplification Gauntlet in Bryck's stomach. Even fleeing would likely be in vain, as Vortex's precision can hit a target incredibly far away."
  },
  {
    entries: ["bryck-manning", "rice-farmer"],
    description: "Rice Farmer stands essentially no chance against Bryck in any respect, outclassed even if Bryck wasn't armed with the Gravity Coil. Rice may be able to hold off Bryck momentarily by aiming his Rake towards Bryck when he charges at Rice, but with no means of properly fighting back-- Rice would be fighting a losing battle."
  },
  {
    entries: ["bryck-manning", "ren-bytera"],
    description: "Bryck and Ren would struggle to injure one another, as Bryck primarily relies on taking advantage of opponents when they drop their defence-- yet Ren's Ion Shielding remains active constantly. Bryck could slam himself into the shield repeatedly in an effort to break it away, but he'd shock himself in the process and likely exhaust himself before he gets close.\n\nOn the other hand, Ren would struggle to strike an agile and mostly-airborne target such as Bryck, especially with her only weapon being the Biograft Blade. Waving it around aimlessly in an effort to strike him would likely prove futile."
  },
  {
    entries: ["bryck-manning", "spawnboy"],
    description: "Faced against a divine entity such as Spawnboy, the Gravity Coil would be a laughable means of defense to Spawnboy-- if he was even capable of laughing. The fight would be shortlived, as no amount of fleeing on Bryck's side would allow him to escape the incomprehensible speeds of which Spawnboy can achieve on a whim."
  }
];

export function getMatchupDescription(entryId1: string, entryId2: string): string | null {
  const matchup = customMatchups.find(m => 
    (m.entries[0] === entryId1 && m.entries[1] === entryId2) ||
    (m.entries[0] === entryId2 && m.entries[1] === entryId1)
  );
  
  return matchup?.description || null;
}