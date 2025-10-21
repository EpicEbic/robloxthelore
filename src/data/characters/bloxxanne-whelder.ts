import { WikiEntry } from "@/types/wiki-types";

const bloxxanneWhelder: WikiEntry = {
  id: "bloxxanne-whelder",
  title: "Bloxxanne Whelder",
  description: "Builderman's right hand and the Buildermen's head engineer. A passionate and energetic tinkerer, Bloxxanne finds her joy in making the world a better place, one invention at a time.",
  preview: "An engineer and right-hand-man for Builderman, Bloxxanne's ingenuity and resourcefulness is unmatched.",
  content: `
Bloxxanne Whelder is the head engineer of the Buildermen, serving as Builderman's right hand and a cornerstone of creativity within the organization. Known for her vibrant personality and precision, her dedication to infrastructural advancement is unmatched. From elevators to hydraulic security doors, much of the Buildermen HQ owes its existence to her relentless work ethic.

She is a public face of the Buildermen but prefers the solace of her workshop, tinkering and inventing new wonders. Despite occasional bouts of jealousy, especially when others outperform her, Bloxxanne pushes herself ever forward, never settling for yesterday's achievements.

Bloxxanne works tirelessly alongside Builderman—a relationship built on deep mutual respect and perhaps something more—and remains the heart behind the Buildermen's most ambitious projects.
  `.trim(),
  category: "character",
  subcategory: "neutral", // Deuteragonist/Deuteragonist-aligned
  imageUrl: "/lovable-uploads/3ea92f5c-1d6f-4cff-b39a-a2b6f7e1ae5d.png",
  lastUpdated: new Date().toISOString().split('T')[0],
  quote: {
    text: "You're 'da boss, boss! I'll get on it right away!",
    context: "Bloxxanne, confirming Builderman's request for a new project."
  },
  species: "Robloxian",
  age: "35",
  alignment: "Lawful / Good",
  carouselImages: [
    {
      url: "/lovable-uploads/3ea92f5c-1d6f-4cff-b39a-a2b6f7e1ae5d.png",
      caption: "Bloxxanne, striking a pose with her trusty hammer in hand."
    },
    {
      url: "/lovable-uploads/dcf992da-11a2-4df9-a035-7f6b487a8495.png",
      caption: "Bloxxanne is welding two pieces of metal together. I guess you could say she's a Whelder... welding? Eh? Eehhh??"
    }
  ],
  sections: {
    appearance: [
      {
        id: "work-uniform",
        label: "Work Uniform",
        description: `
Bloxxanne is a taller, slim-built Robloxian with ginger-colored hair. Her work uniform is primarily black and orange, made up of a black undershirt and orange overalls. She has a black hat, which has been strapped with golden goggles that has the Buildermen logo in place of a right lens. She has a utility belt, which she often keeps her hammer strapped to.
        `.trim(),
        images: [
          {
            url: "/lovable-uploads/3ea92f5c-1d6f-4cff-b39a-a2b6f7e1ae5d.png",
            caption: "Bloxxanne in her work uniform, ready for the next project."
          },
          {
            url: "/lovable-uploads/dcf992da-11a2-4df9-a035-7f6b487a8495.png",
            caption: "Bloxxanne demonstrating her welding skills at the workshop."
          }
        ]
      }
    ],
    personality: [
      `
Bloxxanne is quite the go-getter, full of energy and eager to do a job well done and please others—especially her superiors. Operating as Builderman's right hand, Bloxxanne is somewhat of a public figure and has to act as a people-pleaser when around strangers and figures of importance. Although Bloxxanne doesn't mind appearing in public (as it makes Builderman's life easier), she'd much rather be back at her workshop, where she loves to tinker and invent for the sake of the Buildermen. She finds solace and a sense of completion through her work, always believing it to be her true calling.
      `,
      `
Bloxxanne can be quick to grow jealous when others around her perform well in her field, especially if they outperform her. She has a rooted fear that she may be easily replaceable, especially with other promising faces in her industry, and in industries similar to her own.
      `,
      `
Of course, Builderman is far too smitten with Bloxxanne to even remotely consider replacing her, but she is oblivious to this, and he is far too shy to speak up about his feelings.
      `
    ],
    lifestyle: [
      `
Bloxxanne is a dedicated engineer, working as a head director for the Buildermen, a faction dedicated to the distribution of important resources to Bloxians in need. She is a tinkerer and inventor, a woman responsible for much of the infrastructure found in the Buildermen Headquarters, such as their elevators and hydraulic security doors. Bloxxanne primarily works alongside Builderman, serving as his right hand in the Buildermen operations, as well as being a close friend. She has unending amounts of admiration for Builderman and his powers, fascinated by his ability to create essentially anything in seconds, even objects that could normally take Bloxxanne months or years to develop. Despite this, she doesn't feel useless to Builderman, knowing that even if her potential isn't as high as his, extra hands never hurt to have.
      `,
      `
Bloxxanne lives in her workshop within the Buildermen Headquarters, given a suite that was constructed by Builderman. She spends a majority of her day within it, tinkering and experimenting freely. She has had ample time and resources to explore her craft, especially with a limitless surplus of parts and materials supplied by Builderman. She is constantly trying to outdo herself, in an effort to make each new invention greater than the last. It's this determination and ambition that make her such a valuable figure to have around, qualities Builderman has quickly fallen in love with.
      `
    ],
    relationships: [
      "Builderman - Close Friend / Boss | Builderman is Bloxxanne's boss and close friend. She works under the Buildermen (an organization he runs) as one of his most trusted executives, and a dearly close friend who she's been with as long as she can remember. They both care about one another very much, though Bloxxanne may have a bit of a crush.",
      "Ren Bytera - Mutual | Ren Bytera is admirable and respectable in Bloxxanne's eyes, if not a bit unethical. She believes Ren could apply her skillset to more humane practices, if she chose to. Bloxxanne finds distaste in Ren's willingness to throw away Bloxian lives for the sake of science, even if it's ultimately for a good cause."
    ],
    combat: [
      `
Bloxxanne has very little raw combat potential, as she's no stronger or more able-bodied than any other Bloxian. She has her ingenuity and intelligence, however, and she can be incredibly resourceful. She's quick to use whatever she can to fight back, no matter how impractical of a weapon it may end up being. The hammer she carries on her belt is often her go-to choice in such situations.
      `
    ],
    trivia: [
      "Bloxxanne's design (as well as her place of work, the Buildermen) directly takes from Builder's Club, an old subscription for Roblox that was later replaced by Roblox Premium.",
      "Bloxxanne's name was inspired by the real-life name 'Roxanne'. It is also a subtle nod to a song named 'Roxanne', sung by a band named 'The Police'."
    ]
  },
  relatedEntries: ["builderman", "ren-bytera"]
};

export { bloxxanneWhelder };
