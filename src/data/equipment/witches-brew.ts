
import { WikiEntry, EquipmentOverviewOption, EquipmentTimelineOption } from "@/types/wiki-types";

export const witchesBrew: WikiEntry = {
  id: "witches-brew",
  title: "Witches Brew",
  description: "A fizzy, lemon-lime delight. Though it has concerning side effects...",
  content: "",
  category: "equipment",
  subcategory: "standard",
  lastUpdated: "2025-01-26",
  imageUrl: "/images/witches-brew-can-1.png",
  
  carouselImages: [
    {
      url: "/images/witches-brew-can-1.png",
      caption: "A standard can of the Witches Brew."
    },
    {
      url: "/images/witches-brew-can-2.png",
      caption: "A \"cauldron\" of Witches Brew. The cauldron is made of cardboard, and the \"liquid\" inside is merely painted."
    },
    {
      url: "/images/witches-brew-bottle-1.png",
      caption: "A glass bottle of Witches Brew. Some Bloxians claim it tastes smoother out of a bottle, when compared to a can."
    }
  ],
  
  quote: {
    text: "A savior in a can for when you need to take a load off, just try not to drink too much.",
    context: "A stranger, commenting on the side effects of the Witches Brew"
  },
  
  sections: {
    appearance: [
      {
        id: "can",
        label: "Can",
        description: [
          "Witches Brew is typically packaged in greenish-yellow cans, sold either as a single unit or occasionally packaged into a \"cauldron bundle\" for group sessions. They have simplistic labels, with large yellow text that says \"Witches Brew\", often accompanied by a witch hat."
        ],
        images: [
          {
            url: "/images/witches-brew-can-1.png",
            caption: "A standard can of the Witches Brew."
          },
          {
            url: "/images/witches-brew-can-2.png",
            caption: "A \"cauldron\" of Witches Brew. The cauldron is made of cardboard, and the \"liquid\" inside is merely painted."
          }
        ]
      },
      {
        id: "bottle",
        label: "Bottle",
        description: [
          "It's not often you'll see a glass bottle of the Witches Brew, but they're not impossible to find. They have similar, slimmed labels compared to what you'd see on a can. Witches Brew bottles are only ever sold as individual units, never seen in any packs or cases."
        ],
        images: [
          {
            url: "/images/witches-brew-bottle-1.png",
            caption: "A glass bottle of Witches Brew. Some Bloxians claim it tastes smoother out of a bottle, when compared to a can."
          }
        ]
      }
    ],
    generalInformation: [
      "The Witches Brew is a tasty seltzer crafted and shipped by Blox Co., made famous by the delicious lemon-lime flavor, and the unique side effects that come with consumption. Uniquely, although the Witches Brew is labelled as \"lemon-lime\" on most cans, some Bloxians report it being entirely tasteless, equivalent to that of water."
    ],
    functionality: [
      "The Witches Brew is mostly designed for thirst-quenching, though it has been marketed as a remedy for stress due to the unique side effects caused by drinking it. Many who consume it become lightheaded and loose, akin to being drunk but without the downsides of alcohol. It can be addictive in large quantities, and may impair a Bloxian's senses in the long-term.",
      "Despite the obviously-harmful effects of long-term consumption, all ages are free to purchase and drink Witches Brew."
    ],
    timeline: [
      {
        id: "inception",
        label: "Inception",
        description: [
          "The Witches Brew was the second product to be produced by Blox Co., following the success of their first product, the Bloxy Cola. Unlike the Bloxy Cola, Mr. Bloxton had no hand in the creation of the Witches Brew beyond approving it for the market. It initially released to a mediocre response, as little could be done to compare to the hype behind the Bloxy Cola. But with time, people who consumed it quickly began to realize how good they felt afterwards."
        ]
      },
      {
        id: "addiction",
        label: "Addiction",
        description: [
          "The demand for Witches Brew quickly grew out of control as word got around that you could \"feel really good\" if you drank it, leading to new factories and further expansions of the Blox Co. factories. At the same time, backlash rang out by many who believed that the drink could prove to be harmful to existing societies. Blox Co. made no statements on the matter, and eventually protesters got bored of protesting.",
          "Even now, the Witches Brew is commercially available at many stores, sold indiscriminately to adults and children alike. Blox Co. was happy to turn a blind eye in the face of profit, even going as far as to release commercials praising the Witches Brew as a remedy for stress and anxiety."
        ]
      }
    ],
    trivia: [
      "The Witches Brew is Vortex A. Steele's favorite beverage!",
      "Nauli Parter detests the Witches Brew.",
      "The lightheadedness / drunk effect caused by the Witches Brew is based off of an old functionality for the gear, where drinking it would temporarily enlarge the player's head.",
      "The Witches Brew is based off of a Roblox gear of the same name."
    ]
  }
};
