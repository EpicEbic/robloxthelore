
import { WikiEntry } from "@/types/wiki-types";

export const bloxyCola: WikiEntry = {
  id: "bloxy-cola",
  title: "Bloxy Cola",
  description: "A fizzy, refreshing beverage created by Blox Co. that has become the most popular drink in the Bloxiverse.",
  content: "",
  category: "equipment",
  subcategory: "standard",
  lastUpdated: "2025-12-21",
  imageUrl: "/images/bloxy-cola-can-1.png",
  
  carouselImages: [
    {
      url: "/images/bloxy-cola-can-1.png",
      caption: "Blox your thirst with the refreshing taste of Bloxy Cola, the most-popular drink in the Bloxiverse!"
    },
    {
      url: "/images/bloxycolacan-2.png",
      caption: "The iconic brownish-orange can design of Bloxy Cola, featuring the classic logo and Builderman's depiction."
    },
    {
      url: "/images/bloxycolabottle-1.png", 
      caption: "A rare glass bottle of Bloxy Cola, with its slimmed-down label design perfectly fitted to the bottle's elegant shape."
    }
  ],
  
  quote: {
    text: "Blox your thirst with the refreshing taste of Bloxy Cola, the most-popular drink in the Bloxiverse!",
    context: "One of the many commercials for Bloxy Cola"
  },
  
  sections: {
    appearance: [
      {
        id: "can",
        label: "Can",
        description: [
          "Bloxy Cola is most often found in brownish-orange cans. The label typically displays the phrase \"Bloxy Cola\" somewhere, and certain cans also display a depiction of a younger Builderman. Canned Bloxy Cola is usually sold either in packs of one and six."
        ],
        images: [
          {
            url: "/images/bloxy-cola-can-1.png",
            caption: "A standard can of the beloved Bloxy Cola."
          },
          {
            url: "/images/bloxy-cola-can-2.png",
            caption: "A case of Bloxy Cola cans, perfect for sharing!"
          }
        ]
      },
      {
        id: "bottle",
        label: "Bottle", 
        description: [
          "Glass bottles of Bloxy Cola are rare, but not unheard of. They have a similar label to the ones seen on their canned cousins, though slimmed down to match the physique of the bottle. Bottled Bloxy Cola is only sold as an individual unit, never seen in packs or cases."
        ],
        images: [
          {
            url: "/images/bloxy-cola-bottle-1.png",
            caption: "A glass bottle of Bloxy Cola. Some people swear it tastes better out of a bottle, compared to a can."
          }
        ]
      }
    ],
    generalInformation: [
      "The Bloxy Cola soda is a delicious beverage created and shipped by Blox Co., renowned universally for its cheap price and delicious flavor. Many Bloxians describe it as a mix between typical cola, with a hint of root beer. A splash of vanilla can be tasted, especially when the drink has first been chilled before consumption."
    ],
    functionality: [
      "The Bloxy Cola is designed to quench your thirst on a hot day, or give you a splash of flavor when water simply isn't cutting it. The high sugar content, when paired with the handful of chemicals used to create the Bloxy Cola's signature taste, cause those who drink it to become temporarily invigorated, and even restored to health by the drink. The specific formula used when crafting the beverage is unknown, and attempts to study and explain this phenomenon have failed thus far.",
      "Whether these anomalous effects are physical or nothing more than a mere placebo is unknown."
    ],
    timeline: [
      {
        id: "inception",
        label: "Inception",
        description: [
          "The Bloxy Cola was among the first products to be produced by Blox Co., with a formula created by Mr. Bloxton himself. It was released before Blox Co. had become a properly-established company, aimed at bringing in a small amount of funds to help kickstart the business. Very shortly after launch, the Bloxy Cola immediately picked up traction and popularity grew extremely quickly. Blox Co. was singlehandedly brought to an enterprise-level status through the beverage alone, establishing a large presence for both the Bloxy Cola— and by extension— Blox Co. as a whole."
        ]
      },
      {
        id: "present-day",
        label: "Present Day",
        description: [
          "Nowadays, the Bloxy Cola is sold commercially at just about any vendor and convenience store that can be found in the Bloxiverse. Even in the farthest reaches of locations like the Midzone and Outer Circle, the beverage finds a way to make itself available for purchase. Blox Co. has since expanded their operations ten-fold to account for the insane demand the product has, with entire worlds dedicated exclusively to the mass production of Bloxy Cola alone.",
          "The factories are entirely automated aside from select workers, specialized elites within Blox Co.'s employee hierarchy. Only Mr. Bloxton and his elites are aware of the recipe for the Bloxy Cola. This entire time, the recipe has remained a trade secret of Blox Co., although it is debatable whether that is due to the fear of any repercussions, or due to the raw loyalty of the elites."
        ]
      }
    ],
    trivia: [
      "Bloxy Cola is Caesar Bloxwright's favorite beverage!",
      "The Bloxy Cola's healing properties is based off of an old functionality for the gear, where sipping the drink would heal the player for 5 health each time.",
      "The Bloxy Cola is based off of a Roblox gear of the same name."
    ]
  }
};
