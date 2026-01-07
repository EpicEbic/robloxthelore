import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TimelineAct = {
  title: string;
  content: string;
};

type TimelineChapter = {
  title: string;
  summary: string;
  chapter: string;
  date?: string;
  description?: string;
  narration?: string;
  acts?: TimelineAct[];
};

type TimelinePart = {
  part: string;
  description?: string;
  chapters: TimelineChapter[];
};

const parts: TimelinePart[] = [
  {
    part: "Part 1",
    description: "Foundations and first conflicts.",
    chapters: [
      {
        chapter: "Chapter 1",
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
      },
      {
        chapter: "Chapter 2",
        title: "Time's Up",
        summary: "Caesar and Nauli part ways on their own missions for the day. Caesar goes grocery shopping (and totally doesn't get ambushed) while Nauli meets an old friend to run diagnostics on Bryck's device.",
        description: "Caesar and Nauli part ways on their own missions for the day. Caesar goes grocery shopping (and totally doesn't get ambushed) while Nauli meets an old friend to run diagnostics on Bryck's device.",
        acts: [
          {
            title: "Act I: Too Quiet",
            content: `Morning dawned on the island once again as sunlight scattered throughout the trees, spreading across the pathways and grass. The lamps still burned low from the night before, their dying flames overwhelmed by the sun's light. The fences held. The soil was undisturbed. By every visible measure, Caesar's island remained exactly as he had left it.

All was as it should be.

Caesar awoke earlier than usual, faintly restless from the night before. The fight with Bryck had been simple enough, but he felt ill from doing such a thing without so much as a snack beforehand. Even so, hunger was not the only thing on his mind. The events of the previous day felt too random. Bryck had been apprehended, the situation resolved—and yet?

He felt as though there was a loose end somewhere. A quiet uncertainty that Bryck, and the strange spring he carried, would only invite further trouble.

Caesar swallowed the thought and emerged from his cabin. Grabbing the checklist, he began his rounds, settling into the same routine he followed each morning. Lamp oil was restocked. Supports were tested. Garden beds were watered. Each task was completed smoothly, familiar motions reinforcing his sense of order. Everything was in place. Caesar nodded to himself and continued onward.

As he passed Nauli's tent, he chose to let her sleep this time. He still felt mildly guilty for waking her the morning before, and he did not truly need her to make breakfast; she simply did it better than he ever could. He continued toward the garden instead, pulling a few carrots and potatoes from the soil to boil once he returned.

When he reached the porch, something caught his eye.

A faint shimmer of blue near the corner of his front door.

Caesar slowed, narrowing his eyes as he stepped closer. Recognition settled in as his stomach dropped. The spring Bryck had used lay draped over the arm of his couch, its surface gleaming softly in the morning light.

The cabin door stood ajar.

For a brief moment, his body reacted before his mind could intervene. A sheen of blue light flickered beneath his eyes as instinct urged him to draw upon the Flow. He resisted it. Fear alone was not justification for such forces. Steadying his breathing, Caesar advanced carefully, questions circling his thoughts—who had entered his home, and how the coil had come to rest inside?

Then a scent reached him.

Stew.

The tension eased slightly as the implication became clear. Caesar stepped inside, his attention shifting into the kitchen.

Nauli was already awake, standing at the stove and tending to a pot of broth, steam rising slowly into the ceiling. She turned towards Caesar with a smile and a wave. Caesar gave a deep sigh as his nerves began to calm, placing the vegetables he carried on the countertop. His eyes trailed toward the coil. Up close, it appeared smaller than he remembered. Compact and simple. Deceptively ordinary. There was no immediate pressure emanating from it, no sign that it was more than it seemed.

Whatever it was, it remained dormant. More than anything, that only served to unsettle him further.

Nauli showed no signs of distress or concern. Her focus remained divided between the simmering pot and the spring, her posture relaxed but attentive. She did not seem bothered, leaving the device aimlessly on the couch. Her attitude suggested she had already assessed it personally and must have found it to pose no immediate threat.

Caesar pulled his mind back to breakfast as Nauli poured two bowls of stew for each of them. A delicious mix of carrots, mushrooms, celery, and chicken. It was simmered to perfection as usual; Nauli rarely produced a meal difficult to swallow. Caesar had always admired her cooking prowess, perhaps due to burning most things he tried to make himself.

Just the two of them, the quiet, and a good meal. For now, that was enough.

As they ate, Nauli turned their conversation towards the coil. She wished to bring it to a friend, a scientist by the name of Ren. Nauli explained that if anybody could figure out exactly what the device was and how it worked, it would be her. Caesar hesitated for a moment, voicing his worries that carrying such a thing might draw unwanted attention. He feared that Nauli might end up helpless in a tight situation.

Nauli held back the urge to slap Caesar for calling her helpless, scolding him for not placing his trust in her. Besides, as far as they knew, nobody was even aware that either of them possessed the device. Caesar reluctantly agreed, biting his tongue.

Caesar went over to the sink, washing his hands as his empty bowl was placed inside. Nauli's attention briefly turned toward the bounty they had yet to spend. The Robux remained untouched, an afterthought until now. She explained that they had earned a few extra comforts—snacks at the very least. Some spices, too.

Caesar considered declining, finding the idea of reading in his room more appealing. This idea lasted only until Nauli proposed a specific addition—something familiar, totally unnecessary, and difficult for Caesar to refuse. A case of Bloxy Cola.

The matter was settled rather quickly after that, as the two parted ways.

Nauli left first, carrying the coil within a concealed bag. She stepped beyond the boundary and disappeared into the Miasma, bound for Ren's homeworld. Caesar watched until she was gone before turning back toward the path leading away from home.

He set out for supplies, crossing the threshold and leaving his island behind.

Unbeknownst to him, something else had taken notice of Caesar's departure, as though waiting to find a moment alone.`
          },
          {
            title: "Act II: Actions and Consequences",
            content: `Caesar arrived within the Town of Robloxia, a World that was alive in a way that few others ever were.

Suburban districts sprawled and stretched outwards, streets lined with storefronts and homes packed closely together. Civilians bickered with one another as they walked and went about their daily lives. Caesar felt a strong contrast to his own island, this place felt distant from the Miasma and insanity outside. A world insulated by routines and familiarity.

After a bit of walking, Caesar entered the central mall.

Rows of shops branched outward in all directions, their flashy signs and display windows enticing him to enter. He leisurely strolled from store to store, fingers brushing along the shelves as he browsed. The Robux Nauli had spared him was light in his pocket, but the amount of freedom it afforded him was unfamiliar. Simple choices lingered longer than he expected.

Caesar spent far too much time looking at the spices.

Glass jars and paper packets lined entire aisles of a particular herbal store, each offering distinct and unique flavors the vegetables in his home gardens could never provide. He found himself lost in the flavors, time slipping past him unnoticed. Though somewhere near, he felt a faint unease settling at the back of his mind; a sense that something wasn't quite right.

Caesar dismissed it.

Nauli's journey occupied his mind instead, concern rippling through his thoughts. He continued on despite it all, eventually arriving at a refrigerated display stacked high with Bloxy Cola. His indecision returned in full, he was a connoisseur and could not make a choice lightly. Cans were cheaper, lighter, and easier to carry. But the glass bottles? He could swear they were undeniably better, a fresher flavor and smoother fizz. He weighed the options carefully, as though the fate of the universe depended on his answer.

After spending more time on his choice than he felt comfortable admitting, Caesar chose glass bottles and left the mall after making his purchase. But as he made his way to the boundary of Robloxia, that same feeling from earlier had returned.

Something was following him.

Not closely, not openly. It was just enough to feel when he stopped walking, a sensation that faded the very moment he tried to focus on it. Caesar tightened his grip on the grocery bag instinctively, pressing forward and exiting into the Miasma once more.

Far from Robloxia, Nauli arrived at a world that seemed long-since abandoned.

A facility, quiet and broken. Worn metal twisted outwards as shattered concrete lined the walls. The structure was collapsing inward, as though crushed by force rather than time. There were no signs of life anywhere-- beyond the grass, blankets of moss, and trees. 

Nauli entered the ruins, clearly guided by memory rather than sight. She quickly located a hatch, embedded deep within the wreckage. It clearly wasn't moved often, a thin sheen of dust covering its surface. The trapdoor creaked as Nauli slowly opened it, revealing a ladder descending into the dark. A hidden passageway lay below the surface, untouched by whatever devastation had struck the upper facility.

Nauli descended into the passage, emerging into a laboratory beneath the earth.

The underground space was dense with machines, cables running along the walls and ceilings. Contraptions and tools hung messily from the ceiling or lay strewn across the floor; she struggled not to trip. 

Nauli called out for the sole resident, Ren.

As though intentionally acting dramatic, Ren emerged from a dark corner, flaring her lab coat dramatically.

Ren stood amid the glow of monitors and instrument lights, half-occupied by a tablet in her hand. The lab responded to her presence as if tuned specifically to her movements. There was no surprise in her face or posture when she noticed Nauli, only recognition.

The two had crossed paths many times before, often under circumstances less comfortable than this. Ren was a scientist by trade, but a dangerous curiosity had long-since pushed her beyond the boundaries of conventional research. Experimentation came easily to her, as did swallowing what little morals she upheld.

Despite it all, Nauli trusted her.

Not because Ren was tough or a good friend, but because she was thorough.

After the formalities were out of the way, Nauli retrieved the coil and carefully placed it into Ren's hand. Its weight was unremarkable despite the unease that came with its presence. Ren examined it briefly, her curiosity piqued as Nauli went over what little she and Caesar understood about the device.

With all of the information she required, Ren got to work as the machines in her laboratory began to power up.

Back within the Miasma, Caesar had nearly reached the threshold separating him from home, when without warning that same sensation came striking back.

This time, it no longer cared to remain subtle, as something struck him at impossible speeds. The force sent him spiraling off-course, the bag of groceries slipping from his grasp as the impact carried both Caesar and his unseen attacker through the Miasma.

They crashed into a world below.

The land was open and wild, dominated by jagged mountains and open plains that were untouched by civilization. Caesar barely had time to gather his bearings before the assault resumed, impacts came in from every direction, rapid and relentless. Each strike landed before he could properly react. He raised his arms instinctively, the Flow answering before he could even call upon it.

Energy constructs formed around his body, plating his torso and limbs to withstand the assault. Blows continued to land, cracking against the surface and forcing him to reinforce it repeatedly. Caesar swung wildly, striking only the empty air and fading afterimages as his attacker moved faster than his sight could track, and his arms could move.

Back in Ren's laboratory, the machines inspecting the coil had started to reach their limit.

Machines flickered red, whirring and straining as though struggling to comprehend an answer to the analysis. The scan concluded abruptly, a transcript printing from the terminal with unusual urgency. Ren quickly pulled the coil from its suspension, her attention turning towards the information spilling across the transcript. What she saw caused her studious composure to falter.

The spring was no ordinary device.

It was the Gravity Coil; one of the three Coils of Power. A legendary artifact, unique and irreplaceable, each of its kind bound to a fundamental law of reality itself. Everything about this discovery was both exciting and staggering. Such objects were never meant to fall into unknown hands, much less circulate freely across the Bloxiverse. This alone had worrying implications; were the other Power Coils simply out there?

Nauli accepted the weight of this knowledge, trusting that she could keep it safe and hidden better than most.

Payment was exchanged quickly, as the coil was returned to Nauli's own care. She left the laboratory urgently, ascending to the surface and leaving the ruined world behind. The Miasma usurped her as she began the journey home, the Gravity Coil tightly wrapped within a cloth bag.

Far away, Caesar's armor began to fracture from the sustained damage.

Gunfire suddenly erupted from afar, projectiles slamming into his defenses with enough force to embed themselves within his armor. He struggled to maintain control, the Flow surging in response to the increasing pressure. As Caesar went to further reinforce his armor, a charged bullet completely blew through his defenses, embedding itself in his shoulder.

Pain forced him to his knees.

Only then did the attacker finally reveal himself, stepping into view with clear agitation in the way he moved. Dark clothing bound tightly to his yellow skin, straps and buckles securing his clothing and providing holsters for an alien-like revolver in his hand. Glasses obscured his eyes, but it was easy to tell that the expression on his face was one of anger.

The man's words cut deeper than the bullet in his shoulder, his tone laced with something between disappointment and derision. He had expected more. The implication hung in the air, unspoken but clear—that Caesar's reputation had been overstated, that the stories of his strength were nothing more than exaggeration.

Something inside of him snapped.

The Flow surged out, uncontrolled and unrestrained. Sparks and lines of plasma ripped through the ground as gravity warped violently around him. His hair flickered blue from the overwhelming energy, as he rose to his feet. Caesar unleashed a pulse that seized everything within its reach. The world seemed to freeze, the hunter and their surroundings lifted helplessly into the air as stasis took hold.

Caesar slammed the man downwards, again and again. He dragged him across the land, before launching him into the mountainside with devastating force. The man collided with stone, shattering it on contact. Blood spilled from his mouth as he struggled to remain conscious, his body failing to respond as easily as it once had.

Still, the fight was not over.

Just as Caesar began to approach, the man vanished in a flash of violet and reappeared behind him, striking Caesar's head with everything he had left. The blow landed cleanly, but Caesar did not fall. He turned slowly, fury burning through the haze of pain. He grabbed the neck of the man without hesitation.

This time, there would be no escape.

The Flow erupted from his grasp, forming a plasmatic tether to the man. Caesar hurled him skyward before violently ripping the tether downwards, snapping the man downwards at crushing speeds. Caesar struck once more, sending his body skidding lifelessly across the terrain and into a tree. The fight was decided there.

Caesar collapsed to the ground, his breath ragged, blood soaking into the fabric of his coat. The Flow slowly receded as his heartbeat steadied, binding the unconscious man where he lay.

He would wait for him to wake up.

Elsewhere, Nauli emerged from the Miasma within Caesar's island.`
          },
          {
            title: "Act III: A Settled Score",
            content: `The island greeted Nauli with its familiar stillness.

Morning had long since passed, and the light of the sun rested on the horizon. She walked along the pathway towards the cabin, her thoughts focused on the Gravity Coil. Knowing what she knew now, it suddenly felt a little heavier within her grasp. She had to let Caesar know about the discoveries she had made.

Yet he was nowhere to be found.

Nauli checked the cabin first, then the surrounding paths. Even calling out his name, she was only met with silence. She dismissed the natural worries that followed, knowing Caesar enough to assume that he probably got caught up making choices that didn't matter at the store.

Even so, her unease lingered.

Nauli decided to find a spot for the Gravity Coil in the meantime, eventually descending into the cellar in Caesar's cabin, hidden beneath a rug by his front door. Nauli already had to endure one underground chamber today, so she felt less claustrophobic the second time around.

Nauli placed the coil behind a few boxes, and left the cellar feeling confident about her choice of hiding place.

Far from the safety of the island, Caesar's bound assailant stirred awake.

His consciousness returned slowly, the physical binds and pain anchoring him to the world as he found himself immobilized against a tree. Across from him, Caesar rested in silence, leaning against a large boulder. Blood seeped from the wound at his shoulder, though it had begun to slow down.

The man's fury surfaced first.

Resentment followed soon afterwards, sharp and fueled by the humiliation of defeat. He spoke of his contracts and reputation, lives measured by successful hunts and maintained records. Failure, to him, was much more than an inconvenience. It was a stain.

Caesar listened quietly. Attentively.

When the outburst finally spent itself, he spoke calmly to the man, explaining that the conflict had never been about the reward or glory. The bounty had been accidental, an afterthought to the lives that were at risk. Caesar offered what remained of the funds to the man, acknowledging the misunderstanding and attempting to make amends.

The hunter faltered, unsure what to say or do.

He was suspicious at first, but his exhaustion helped to mellow him out. Caesar's sincerity was difficult to ignore, and gradually that anger gave way to something quieter. He admitted the truth to Caesar; bounties mean survival, and his hostility had been provoked far too easily.

With those words, the bindings holding the hunter dissolved into energy, returning to Caesar.

For a moment, the hunter considered striking Caesar while he was vulnerable. The opportunity was there. Yet, the impulse faded just as quickly. Instead of raising his hand to strike, he extended it out to help Caesar to his feet. He introduced himself as Vortex, a bounty hunter affiliated with the Hunter Association. 

The exchange was brief, but heartfelt.

With a final nod goodbye, Vortex vanished into a flash of violet light, leaving the clearing as empty as it had been before the fight began.

Caesar stayed back for a short while after that, steadying his breath and tending to his wound as best he could. When he felt ready, he returned to the Miasma and began the slow journey home.

By the time he made it back and crossed the boundary to his world, night had settled over the island.

Nauli was on her feet the moment she laid eyes on him, alarm overtaking her composure as she rushed to his aid. His injuries were obvious, exhaustion plastered on his face. She guided him inside without hesitation, tending to him with a quiet urgency and insisting he rest.

Only once he was settled into bed did Caesar recount what had happened. The ambush, the hunter, and the misunderstandings. He chose to omit the detail that he lost control of his powers for a time. Nauli listened closely, relieved that in the end he was okay.

Caesar asked about her own journey, and what had come of her time with Ren.

Nauli's expression showed hesitation, but she decided that it was best explained after Caesar had some time to recover from what had happened. She decided to stay and sleep on the couch that night, so Caesar could easily reach her if something was needed. The island grew quiet once more.

Somewhere far away, a bag of groceries drifted weightlessly throughout the Miasma, forgotten in the chaos. The small comforts it carried would never reach their destination.`
          }
        ]
      }
    ]
  }
];

export default function PlotTimelinePage() {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            The Lore&apos;s Timeline
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            View a detailed breakdown of each part and chapter for The Lore! Follow the story as it unfolds across the Bloxiverse.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          <Accordion type="multiple" className="space-y-6">
            {parts.map((part, pIdx) => (
              <motion.div
                key={part.part}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: pIdx * 0.1 }}
              >
                <Card className="rounded-2xl shadow-xl border-2 backdrop-blur-sm overflow-hidden bg-card/95">
                  <AccordionItem value={part.part} className="border-0">
                    <CardHeader className="pb-4">
                      <AccordionTrigger className="hover:no-underline p-0">
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Badge variant="secondary" className="px-3 py-1.5 bg-primary/20 text-primary border-primary/30 font-bold text-sm flex-shrink-0">
                              {part.part}
                            </Badge>
                            {part.description && (
                              <span className="text-sm text-muted-foreground truncate">{part.description}</span>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-2">
                        <Accordion type="multiple" className="space-y-4">
                          {part.chapters.map((ch, cIdx) => (
                            <motion.div
                              key={`${part.part}-${ch.chapter}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: cIdx * 0.05 }}
                            >
                              <Card className="rounded-xl border-2 border-zinc-300/50 bg-zinc-800/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
                                <AccordionItem
                                  value={`${part.part}-${ch.chapter}`}
                                  className="border-0"
                                >
                                  <AccordionTrigger className="px-5 py-4 hover:bg-primary/5 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3 flex-wrap w-full text-left">
                                      <div className="w-8 h-8 rounded-lg bg-zinc-700/60 border border-zinc-300/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-zinc-300">{cIdx + 1}</span>
                                      </div>
                                      <Badge variant="outline" className="px-2.5 py-1 text-xs font-semibold border-zinc-300/50 bg-background/50 text-zinc-300">
                                        {ch.chapter}
                                      </Badge>
                                      <span className="font-semibold text-base flex-1">{ch.title}</span>
                                      {ch.date && (
                                        <span className="text-xs text-muted-foreground bg-muted/70 px-2.5 py-1 rounded-md border border-border/50">
                                          {ch.date}
                                        </span>
                                      )}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="px-5 pb-5 pt-3">
                                    {ch.description && (
                                      <div className="mb-5 pb-4 border-b border-border/40">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                          {ch.description}
                                        </p>
                                      </div>
                                    )}
                                    {ch.acts && ch.acts.length > 0 ? (
                                      <div className="space-y-4">
                                        {ch.acts.map((act, aIdx) => (
                                          <motion.div
                                            key={`${part.part}-${ch.chapter}-act-${aIdx}`}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: aIdx * 0.05 }}
                                            className="rounded-lg border-2 border-zinc-300/30 bg-card/70 backdrop-blur-sm p-5 shadow-md hover:shadow-lg transition-all duration-200"
                                          >
                                            <div className="flex items-center gap-3 mb-4">
                                              <div className="w-1.5 h-8 bg-gradient-to-b from-zinc-300/60 to-zinc-400/30 rounded-full flex-shrink-0"></div>
                                              <h4 className="text-base font-semibold text-foreground">{act.title}</h4>
                                            </div>
                                            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-5">
                                              {act.content}
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : ch.narration ? (
                                      <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-lg border-2 border-border/40 bg-card/70 backdrop-blur-sm p-4 text-sm text-muted-foreground leading-relaxed shadow-sm"
                                      >
                                        {ch.narration}
                                      </motion.div>
                                    ) : null}
                                  </AccordionContent>
                                </AccordionItem>
                              </Card>
                            </motion.div>
                          ))}
                        </Accordion>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

