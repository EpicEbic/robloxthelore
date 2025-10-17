// Battle outcome verdicts for character matchups
export interface Verdict {
  entries: [string, string]; // IDs of the two entries
  winner: string | null; // ID of winner, or null for tie
  confidence: "Low" | "Medium" | "High"; // Confidence level in the verdict
  explanation: string;
}

export const verdicts: Verdict[] = [
  {
    entries: ["the-reckoner", "builderman"],
    winner: null, // Tie
    confidence: "Medium",
    explanation: "An eternal stalemate between ultimate destruction and creation. Neither can permanently overcome the other's fundamental nature."
  },
  {
    entries: ["spawnboy", "the-breadwinner"],
    winner: "spawnboy",
    confidence: "High", 
    explanation: "Spawnboy's infinite respawn ability eventually outlasts The Breadwinner's finite stamina and resources."
  },
  {
    entries: ["caesar-bloxwright", "nauli-parter"],
    winner: "caesar-bloxwright",
    confidence: "High",
    explanation: "Caesar's superior offensive and defensive powers far outweigh Nauli's advantage in agility. Though she'd be hard to strike, even one solid hit would likely be enough to put Nauli out of commission, ending the fight."
  },
  {
    entries: ["vortex-a-steele", "nauli-parter"],
    winner: "vortex-a-steele",
    confidence: "High",
    explanation: "Vortex's Chronipulation and weaponry far surpass Nauli's Pathokinesis or agility. It'd be a game of cat-and-mouse until Nauli is eventually caught and eliminated."
  },
  {
    entries: ["caesar-bloxwright", "rice-farmer"],
    winner: "caesar-bloxwright",
    confidence: "High",
    explanation: "Caesar outclasses Rice in every possible aspect. It wouldn't be a fight between the two, it'd be a one-sided massacre against Caesar's victim."
  },
  {
    entries: ["nauli-parter", "rice-farmer"],
    winner: "nauli-parter",
    confidence: "High",
    explanation: "Even without the use of Pathokinesis, her superior statistics enable her to strategically turn Rice's innards into outtards."
  },
  {
    entries: ["rice-farmer", "vortex-a-steele"],
    winner: "vortex-a-steele",
    confidence: "High",
    explanation: "Rice would be arguably the easiest victim Vortex has killed by far. In a likely scenario, Rice would have a bullet in his skull before he could even process that Vortex is after him."
  },
  {
    entries: ["the-reckoner", "caesar-bloxwright"],
    winner: "the-reckoner",
    confidence: "High",
    explanation: "The Reckoner's omnipotent-level reality manipulation completely outclasses Caesar's electrogravitic abilities."
  },
  {
    entries: ["the-reckoner", "vortex-a-steele"],
    winner: "the-reckoner",
    confidence: "High",
    explanation: "Time manipulation is insignificant against someone who can alter the fundamental laws of reality itself."
  },
  {
    entries: ["caesar-bloxwright", "vortex-a-steele"],
    winner: null,
    confidence: "Medium",
    explanation: "Though Vortex has a wide variety of advantages over Caesar, the pair mostly cancel out the benefits of one another, likely leading to a tie."
  },
  {
    entries: ["caesar-bloxwright", "ren-bytera"],
    winner: "caesar-bloxwright",
    confidence: "High",
    explanation: "Though Ren is surprisingly capable of holding her own against a titan such as Caesar, she'd inevitably run dry of tricks up her sleeve and would quickly be put down by Caesar."
  },
  {
    entries: ["caesar-bloxwright", "spawnboy"],
    winner: "spawnboy",
    confidence: "High",
    explanation: "Though Caesar would fight with remarkable dignity and honor, Spawnboy would be quick to put his soul to rest for good. Caesar simply can't fight what he can't hit."
  },
  {
    entries: ["nauli-parter", "ren-bytera"],
    winner: "nauli-parter",
    confidence: "Medium",
    explanation: "Though Ren would be able to stall for a lengthy duration, her Ion Shielding can only remain active so long as she has the stamina to do so. After wearing her down, Nauli would easily be able to go in for the kill, effortlessly evading the Biograft Blade."
  },
  {
    entries: ["nauli-parter", "spawnboy"],
    winner: "spawnboy",
    confidence: "High",
    explanation: "Nauli would have her soul put to rest fairly quickly, at most delaying the inevitable with her precision and reflexes."
  },
  {
    entries: ["ren-bytera", "vortex-a-steele"],
    winner: "vortex-a-steele",
    confidence: "High",
    explanation: "Though Ren would be able to temporarily hold off Vortex's assault, her shielding can only last for so long. Inevitably, Vortex would reach Ren and eliminate his target."
  },
  {
    entries: ["vortex-a-steele", "spawnboy"],
    winner: "spawnboy",
    confidence: "High",
    explanation: "Vortex's efforts would allow him to prolong the inevitable for much longer than most Bloxians who face off with a deity, but fate will inevitably see to his soul being reaped by Spawnboy in the end."
  },
  {
    entries: ["ren-bytera", "rice-farmer"],
    winner: "ren-bytera",
    confidence: "High",
    explanation: "Rice would fare poorly against an augmented Bloxian such as Ren, and would quickly be diced by Ren's Biograft Blade if she doesn't capture and conduct horrible experiments on him first."
  },
  {
    entries: ["spawnboy", "rice-farmer"],
    winner: "spawnboy",
    confidence: "High",
    explanation: "Take A Wild Guess. It takes around half of a braincell to process who would likely win between Rice and Spawnboy. Think real hard on this."
  },
  {
    entries: ["bryck-manning", "caesar-bloxwright"],
    winner: "caesar-bloxwright",
    confidence: "High",
    explanation: "Caesar outclasses Bryck both in physical strength and in durability, leaving Bryck with very few options to bring harm to Caesar. In the end, Bryck would ultimately succumb to Caesar's strength and ability."
  },
  {
    entries: ["bryck-manning", "nauli-parter"],
    winner: "nauli-parter",
    confidence: "Medium",
    explanation: "Though Nauli would have to manage her stamina and remain attentive to Bryck's aerial assault, she could eventually overwhelm Bryck mentally and prevent him from using his one and only means of combat. He'd be a sitting duck after that, and Nauli would fairly easily finish the job from there."
  },
  {
    entries: ["bryck-manning", "vortex-a-steele"],
    winner: "vortex-a-steele",
    confidence: "High",
    explanation: "Bryck's options are far too limited to hold a candle to Vortex's versatility and arsenal of weapons, making it more of a survival challenge for Bryck than a real fight. With minimal effort, Vortex would end the forgettable encounter with merely a few bullets."
  },
  {
    entries: ["bryck-manning", "rice-farmer"],
    winner: "bryck-manning",
    confidence: "High",
    explanation: "Rice would go on to be one of the many forgettable victims of Bryck's countless assaults on innocents, likely executed and/or pillaged of any food."
  },
  {
    entries: ["bryck-manning", "ren-bytera"],
    winner: null,
    confidence: "Low",
    explanation: "The two would likely end up arguing verbally for a while, as both parties try in vain to harm one another. In the end, they'd give up after becoming exhausted and just go home a little annoyed."
  },
  {
    entries: ["bryck-manning", "spawnboy"],
    winner: "spawnboy",
    confidence: "High",
    explanation: "Ultimately, Bryck would come to have his soul reaped by Spawnboy just as many others who faced Spawnboy went on to experience."
  }
];

export function getVerdict(entryId1: string, entryId2: string): Verdict | null {
  return verdicts.find(v => 
    (v.entries[0] === entryId1 && v.entries[1] === entryId2) ||
    (v.entries[0] === entryId2 && v.entries[1] === entryId1)
  ) || null;
}