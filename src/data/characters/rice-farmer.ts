
import { WikiEntry } from "@/types/wiki-types";
import { createCharacterStats, createCombatStats } from "@/components/character/character-stat-chart";

export const riceFarmer: WikiEntry = {
  id: "rice-farmer",
  title: "Rice Farmer",
  description: "A gentle and hardworking deuteragonist who tends to the rice crops in the Farmer's Sanctuary. Known for his simple lifestyle and positive outlook on life.",
  preview: "A gentle and honorable civilian who lives a humble, pure lifestyle. Rice brings joy to those around him.",
  content: "",
  category: "character",
  subcategory: "neutral", // This maps to "Deuteragonist" in the UI
  imageUrl: "/lovable-uploads/3f29d119-0f68-49ce-a36a-34e84278eac2.png",
  lastUpdated: "2025-01-26",
  
  // Character-specific fields
  quote: {
    text: "Another beautiful day.",
    context: "Rice Farmer, contemplating life to himself as he watches the sun rise in the Farmer's Sanctuary."
  },
  species: "Robloxian",
  age: "54",
  alignment: "Lawful/Good",
  
  carouselImages: [
    {
      url: "/lovable-uploads/3f29d119-0f68-49ce-a36a-34e84278eac2.png",
      caption: "Rice Farmer with his trusty rake and signature cone hat, holding a flower gifted to him by Caesar."
    },
    {
      url: "/lovable-uploads/e8deb399-3e4e-4283-8aac-65e2a4d96724.png", 
      caption: "Rice Farmer trying (and struggling) to swing his plow at an unseen foe. It's the effort that counts, right?"
    },
    {
      url: "/lovable-uploads/eeca921f-560e-4b53-8f47-e337d67aa776.png",
      caption: "Rice, providing his teachings in agriculture to Caesar."
    },
    {
      url: "/lovable-uploads/aa0c5e75-1674-47b2-ac88-9de3df041ced.png",
      caption: "Rice, being poked fun at by his elder brother Tobias."
    },
    {
      url: "/lovable-uploads/c790c718-0697-4398-acf1-0bc613f63966.png",
      caption: "...Rice? Is everything alright?"
    }
  ],
  
  sections: {
    appearance: "Rice Farmer (often abbreviated to just 'Rice') is a short and blocky Robloxian. He has pale skin, a blue torso, and grey legs. He is always seen wearing a wooden-wicker cone-cap, and often carries a large rake hoisted on his back. He likes to chew on plants, and often has a piece of wheat or another plant in his mouth.",
    
    personality: [
      "Rice is a gentle, simplistic soul who loves nothing more than to commit to his honest work as a farmer. Easygoing and kind, Rice carries an aura of peace wherever he may be. He values all life and treats Bloxians equally and with respect, even if they do not treat him the same. His positive and passionate outlook towards life often rubs off on those he spends time around, charmed by his kind and sincere heart.",
      
      "Rice has a strong distaste for conflict and will actively avoid it whenever possible. He and his family are relatively defenseless, making Rice an easy mark for essentially any threat that may wish to do them harm. He believes that it's better to simply submit and comply when faced with antagonism, fearing the potential consequences if he tries to defend himself."
    ],
    
    lifestyle: [
      "Rice relishes in his humble and simplistic lifestyle, catering to his dedicated plot within the Farmer Sanctuary, a large farm owned and operated by a family of farmers-- including Rice. Naturally, Rice finds himself in the position of growing and maintaining the rice crops within the sanctuary, as well as harvesting them when the time comes. He is dedicated to his craft, and always gives his plants the utmost attention and care.",
      
      "Rice doesn't like to slack off if there's work to be done, and often assists the other members of the farmer family if he's exhausted his own quota for the day. He's happy to care for others and their menial tasks, helping them tend to gardens or assisting them in carrying things. He loves his family dearly, and wouldn't want them to overwork themselves-- even if Rice inadvertently overworks himself instead.",
      
      "Once Rice has officially run dry of work for the day, only then can he rest easy. He'll kick back and relax, enjoying leisurely reading while he sunbathes. He has amassed a remarkably large library of books, which he keeps within his room in the rice barn. Once he's done, it's off to bed. After all, a whole new day of farming is just around the corner! What kind of man would he be to keep it waiting?"
    ],
    
    history: [
      "Rice (originally named Ahlias) was born into the Farmer Sanctuary to a loving mother and father. From a young age, he was trained in the trade of agriculture, studying rigorously as he wished to appease his parents by being as helpful as he could. He'd always bumble around the farm, searching for his elder brothers and sisters to assist them. His dedication and ambition did not go unnoticed, and Ahlias was soon given his own plot of land to manage, one that grew rice crops.",
      
      "From then on, Ahlias always gave it his all and cared for the Farmer Sanctuary and his family as best he could, and for a time-- Life was good. But of course, such joy can only be short-lived in a cruel reality such as the Bloxiverse. Eventually, the Farmer Sanctuary was attacked by a group of nomads, who ransacked the Farmer Sanctuary for food and other goods, while destroying property in the process.",
      
      "The farming family fought valiantly, armed with various tools and supplies that they could scrounge together amidst the panic. But ultimately, they stood no chance against armed assailants. Those who tried to rebel or fight back were executed with haste, including his mother and father. Ahlias was moments from running after them, but his eldest brother Tobias understood the severity of the situation and held Ahlias down. Though their parents were murdered, Ahlias, Tobias, and a handful of other farmer family members managed to hide or otherwise survive the attack.",
      
      "Recovering after the attack was a long and taxing period, both mentally and physically. On top of a damaged and raided Sanctuary, the farmer family had lost many of their own to the conflict. Ahlias fell into a spiraling depressive episode, mentally locking him up for multiple years of his youth. Thankfully, Tobias and the others were able to help him recover from this poor state of mind, and with age came acceptance. To honor the legacy of the fallen, Ahlias adopted the name 'Rice' after his late mother's nickname, 'Ricey'. In honor of his father, he began to wear the same wooden-wicker cone-cap that his father once did."
    ],
    
    relationships: [
      "Caesar Bloxwright - Friend | During a recent attack on the Farmer Sanctuary at the hands of Bryck Manning, Caesar received the news and arrived at the Farmer Sanctuary in the nick of time, intervening and apprehending Bryck with help from Nauli. After Bryck's apprehension, Caesar ended up speaking with Rice and the two clicked. Rice has frequently met up with Caesar since, teaching Caesar how to manage a garden of his own, and providing him with moral support when needed.",
      
      "Farmer Family - Family | Rice is a beloved member of the farming family, and is now the second-eldest of the crowd. His brother Tobias remains as the oldest member in the family, aged 57."
    ],
    
    combat: [
      "Rice has no combat experience, leaving him mostly helpless when presented with even the most minor of threats. He may not have outstanding physical strength, but Rice is known to be remarkably resourceful; a skillset acquired naturally after spending long enough within the Farmer Sanctuary.",
      
      "When forced into a combative situation that Rice simply cannot avoid, he has a tendency to fight with whatever he can get his hands on in the heat of the moment, making his rake a common weapon of choice."
    ],
    
    
    trivia: [
      "Caesar gifted Rice a flower he had grown from his garden, a charm that Rice often carries on his person as a good luck charm.",
      "Rice is a vegetarian, aside from his love for chicken.",
      "Rice Farmer is inspired by an old Roblox outfit I had made back in 2016! It was later freshened up to fit the modern standards, and turned into an OC to be inserted into The Lore."
    ]
  },
  
  relatedEntries: ["caesar-bloxwright"],
  
  stats: createCharacterStats("F", "F", "F", "F"),
  
  combatStyles: [
    {
      id: "improvised",
      label: "Improvised Fighting",
      description: [
        "Rice has no combat experience, leaving him mostly helpless when presented with even the most minor of threats. He may not have outstanding physical strength, but Rice is known to be remarkably resourceful; a skillset acquired naturally after spending long enough within the Farmer Sanctuary.",
        
        "When forced into a combative situation that Rice simply cannot avoid, he has a tendency to fight with whatever he can get his hands on in the heat of the moment, making his rake a common weapon of choice."
      ],
      combatStats: createCombatStats("F", "F", "E", "E", "C")
    }
  ]
};
