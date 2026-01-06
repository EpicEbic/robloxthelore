import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type TimelineAct = {
  title: string;
  content: string;
};

type TimelineEpisode = {
  title: string;
  summary: string;
  episode: string;
  date?: string;
  description?: string;
  narration?: string;
  acts?: TimelineAct[];
};

type TimelineSeason = {
  season: string;
  description?: string;
  episodes: TimelineEpisode[];
};

const seasons: TimelineSeason[] = [
  {
    season: "Season 1",
    description: "Foundations and first conflicts.",
    episodes: [
      {
        episode: "Episode 1",
        title: "Gravity of the Situation",
        summary: "Caesar and Nauli have their morning interrupted by Bryck Manning, who is ransacking the Farmer Sanctuary.",
        description: "Caesar and Nauli have their morning interrupted by Bryck Manning, who is ransacking the Farmer Sanctuary.",
        acts: [
          {
            title: "Act I: Island of Tranquility",
            content: `The Bloxiverse has never been whole. It is a layered mess of worlds stacked upon worlds, adrift throughout the Miasma. Parts of life thrive within its many lands, while others struggle to endure the hardships of survival. Some march on simply because they refuse to disappear. Nothing is certain in a world abandoned by its own creator.

Caesar's island was a reprieve from this harsh reality.

The sun rose into the sky, light creeping through the cracks of the blinds as Caesar sat at his desk, a weathered book open halfway in his hands. He read not to soothe his nerves or to learn, but out of habit; Records of places and people that had long since eroded, names that had once mattered. The quiet suited him. It always had.

Caesar shut the book, dust scattering in the light. The island demanded his attention.

He emerged from his cabin and took a deep breath of the crisp morning air, snatching a checklist hanging from a post on the porch. Stepping down into the grass and onto the gravel path, he began his rounds. Oil lamps lined the pathway, each one checked and refilled, their glass chimneys cleaned of soot. Gardens were watered and their fences tested for stability, wooden posts pressed and reinforced where the soil had loosened. Caesar worked carefully, with loving eyes. No detail was overlooked.

Making his way along the winding paths, he passed a tent nestled just before the island's edge; Nauli's.

Caesar called out, and Nauli emerged moments later. She was half-dressed and had clearly woken moments ago by his voice, though he chose to pretend he hadn't noticed. He asked her to join him for the day—and, more importantly, to make breakfast. He had worked up quite an appetite, and while he was confident in growing ingredients, their preparation was another matter entirely.

Nauli reluctantly agreed and retreated into her tent to change. When she returned, the two walked the remainder of the island's perimeter together.

The path circled their home completely, tracing the boundary that separated safety from the Miasma beyond. By the time they reached the cabin again, Caesar felt the island was well cared for. They entered together, Caesar settling onto the couch while Nauli went into the kitchen to cook. The soft clatter of cookware filled the room as Caesar mindlessly flipped through channels. They spoke casually across the space, exchanging idle thoughts as if the day would remain kind and uneventful.

It did not.

Just as Nauli returned with sandwiches in hand, Caesar happened upon a broadcast. A world was in crisis; The Farmer Sanctuary. Its fields were dented and misshapen, barns broken inward as civilians scattered in a panic. A single figure stood at the center of it all, laughing as he admired his work.

Bryck Manning.

He appeared to be assaulting the sanctuary purely for fun, causing destruction simply because he could.

Caesar's hand stilled on the remote as he read the coordinates. That world was close; Too close.

Nauli voiced her hesitation quietly, disappointed that a day which had begun so peacefully would turn into yet another fight. Caesar did not argue, only pointing out the obvious: if they chose to do nothing when they had the power to stop it, others would pay the price.

Breakfast was, reluctantly, left untouched.

They left the cabin and walked to the island's edge, stepping forward together through the unseen barrier that marked the end of Caesar's world. The Miasma surrounded them, the island vanishing behind their backs as they set out for the sanctuary.`
          },
          {
            title: "Act II: Attack on the Farmer Sanctuary",
            content: `Within the sanctuary, chaos riddled the rolling hills and open plains, the huts and barns alike.

Bryck crashed from place to place on his rampage, tackling anyone who got in the way of his amusement. A few were struck down for daring to resist. Some managed to hold their own briefly—one particularly large farmer even tackled and pinned Bryck for a short time—but none could end the assault.

One farmer stood out amid the panic, a Rice Farmer.

The Rice Farmer did not try to fight Bryck. He knew he had no chance in direct combat. Instead, he focused on others, pulling them from danger and ushering them toward shelter. Again and again, he placed himself in harm's way—not to confront the threat, but to deny it any further victims.

As the sanctuary began to clear, Bryck quickly noticed a lack of play-things. It did not take long for him to find the culprit.

His arm rose to strike Rice, and the air seemed to stand still. Rice braced himself for the worst.

Before the blow could land, Caesar and Nauli arrived, gathering Bryck's attention just moments before he had struck Rice.

Nauli immediately broke away to assist the shaken farmers while Caesar confronted Bryck directly. He attempted to reason with him, explaining that violence solved nothing, that whatever drove Bryck could be addressed without further bloodshed.

Bryck listened only long enough to scoff.

He belittled Caesar's privilege, sneering at how security and happiness seemed to come so easily to him; These things Bryck claimed were forever out of reach.

Then Bryck lunged.

Caesar did not reach for his powers. He used his natural strength, striking and grappling where he could, redirecting momentum as Bryck hurled himself with unnatural forces. Caesar's larger stature proved valuable; Bryck could do little more than knock him off-balance. The longer the fight dragged on, the more frustrated Bryck became, disturbed by Caesar's ability to endure.

As Nauli finished evacuating the last of the farmers alongside Rice, she turned her attention back to the battle. Reaching into Bryck's mind, she analyzed both his thoughts and his body. The source of his power became clear; A mysterious blue spring tightly coiled around his arm.

She relayed this information to Caesar telepathically, warning him that Bryck would not surrender while the coil remained on his arm. She admired Caesar's restraint towards using his powers, but made it clear that removing the device would likely require the use of his abilities. Reluctantly, Caesar agreed.

A flicker of sapphire lit up beneath the shadows of his brow as he began to channel the Flow.

Gravity folded inward around him, compressing the space Bryck occupied and forcing him toward the ground. Bryck was flattened against the dirt, pressed deeper as the force intensified. For a moment, it worked.

Then the coil flared.

Bryck shed his weight entirely, slipping free of the compression and slamming into Caesar with renewed force. One blow drove Caesar to his knee. Gritting his teeth, he unleashed a flexible construct of hardened light that lashed outward like a whip.

Bryck dodged at first, but the pressure mounted. His movements grew frantic.

Nauli seized the opportunity.

Bryck's mind flooded with static as his resolve faltered. His vision blurred as he struggled against the force scrambling his thoughts. The coil flickered with hesitation, becoming unstable without a clear subconscious to guide it.

It misfired.

Bryck's weight surged suddenly, slamming him into the ground. He writhed and flailed, desperately trying to regain control, but his fogged mind failed him. Caesar lunged forward, pinning Bryck down and gripping the coil as Nauli continued to suppress his thoughts.

With a final wrench, Caesar tore the coil free.

The moment it left Bryck's arm, his power vanished. Caesar released him physically, but gravity held Bryck firmly in place. He seethed beneath a weight he could no longer command.

The farmers were safe.`
          },
          {
            title: "Act III: Unseen Spoils",
            content: `The terror was over. Bryck was apprehended, and the farmers slowly began to gather.

Rice Farmer emerged from the crowd, thanking Caesar and Nauli deeply for their intervention. Caesar spoke with him briefly while Nauli approached Bryck to question him. He quickly launched into a rant about mistreatment and injustice, cut short as she hushed him and bound his limbs. After the destruction he had caused, she had no interest in hearing excuses.

By the time Nauli returned, dragging the bound Bryck behind her, Caesar and Rice had finished their conversation. Caesar hoisted Bryck over his shoulder, and the two departed the sanctuary, entering the Miasma in search of a facility capable of handling him.

Bryck ranted for most of the journey, met only with silence.

They eventually arrived at the Hunter Association, a large facility tasked with processing and imprisoning criminals until judgment could be passed. Bryck was handed over without hesitation.

As Caesar and Nauli turned to leave, an associate stopped them and revealed that Bryck had amassed a small bounty from his actions across the Bloxiverse. Caesar attempted to decline, not wanting to appear motivated by money, but Nauli quickly cut him off and accepted the Robux on their behalf.

They returned home as night settled over the island.

At the crossroads, Caesar noticed a bag Nauli carried—one she had not possessed during the fight. When he asked about it, she revealed the contents: the coil Bryck had used.

Caesar questioned why it had not been surrendered with Bryck. Nauli simply replied that Bryck was the Association's problem. The spring was not.

Caesar nodded and wished her goodnight, returning to his cabin as Nauli headed back to her tent.

It would seem all was settled, but this was untrue.

Within the Hunter Association's holding facility, two shadowed figures spoke outside Bryck's cell. One demanded to know who had interfered with his contract. The other reminded him of client confidentiality.

The first scoffed, prepared to leave, when a voice echoed from within the cell.

Bryck knew exactly who.`
          }
        ]
      }
    ]
  }
];

export default function PlotTimelinePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow / grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.04),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_25%)]" />

      <div className="container mx-auto px-4 py-10 space-y-8 relative z-10">
        <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">The Lore&apos;s Timeline</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          View a detailed breakdown of each season and episode for The Lore!
        </p>
        </div>

        <Card className="border-primary/20 shadow-2xl shadow-primary/10 bg-card/95 backdrop-blur">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-2xl font-semibold">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-4">
              {seasons.map((season, sIdx) => (
                <AccordionItem
                  key={season.season}
                  value={season.season}
                  className="border border-border/60 rounded-lg px-3 bg-card/70 shadow-sm"
                >
                  <AccordionTrigger className="py-3 text-left text-lg font-semibold">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm shadow">
                        {season.season}
                      </div>
                      {season.description && (
                        <span className="text-sm text-muted-foreground">{season.description}</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Accordion type="multiple" className="space-y-2">
                      {season.episodes.map((ep, eIdx) => (
                        <AccordionItem
                          key={`${season.season}-${ep.episode}`}
                          value={`${season.season}-${ep.episode}`}
                          className="border border-border/40 rounded-md bg-card/60"
                        >
                          <AccordionTrigger className="py-2 px-3 text-left hover:bg-primary/5 rounded-md">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="px-2 py-0.5 rounded-full border text-xs">
                                {ep.episode}
                              </div>
                              <span className="font-semibold text-sm">{ep.title}</span>
                              {ep.date && <span className="text-xs text-muted-foreground">{ep.date}</span>}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-3 px-3 space-y-3">
                            {ep.description && (
                              <p className="text-sm text-foreground font-medium">{ep.description}</p>
                            )}
                            {ep.acts && ep.acts.length > 0 ? (
                              <div className="space-y-4">
                                {ep.acts.map((act, aIdx) => (
                                  <motion.div
                                    key={`${season.season}-${ep.episode}-act-${aIdx}`}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.05 + eIdx * 0.02 + sIdx * 0.05 + aIdx * 0.03 }}
                                    className="rounded-md border border-border/40 bg-card/80 p-4 shadow-inner"
                                  >
                                    <h4 className="text-sm font-semibold text-foreground mb-2">{act.title}</h4>
                                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                      {act.content}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : ep.narration ? (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.05 + eIdx * 0.02 + sIdx * 0.05 }}
                                className="rounded-md border border-border/40 bg-card/80 p-3 text-sm text-muted-foreground leading-relaxed shadow-inner"
                              >
                                {ep.narration}
                              </motion.div>
                            ) : null}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

