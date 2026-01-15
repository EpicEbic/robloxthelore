export interface BloxiverseSegment {
  id: string;
  title: string;
  briefDescription: string;
  startRadius: number;
  endRadius: number;
  color: string;
}

export const BLOXIVERSE_SEGMENTS: BloxiverseSegment[] = [
  {
    id: 'the-heart',
    title: 'The Heart',
    briefDescription: 'The Heart is a celestial mass created by Roblox to fuel the Bloxiverse in his absence. It is raw and unbridaled potential, connected to each and every World and Bloxian that exists or will exist. It holds reality itself together, which would quickly collapse if something ever were to happen to it.',
    startRadius: 0,
    endRadius: 480,
    color: '#ffffff',
  },
  {
    id: 'the-inner-circle',
    title: 'The Inner Circle',
    briefDescription: 'The Inner Ring is a prestigous and highly-secure segment of the Bloxiverse, inhabited by powerful Bloxians and factions. It is heavily guarded as it directly surrounds the Heart, and has the densest population due to it being the smallest segment of the Bloxiverse.',
    startRadius: 480,
    endRadius: 1280,
    color: '#93c5fd', // Light Blue
  },
  {
    id: 'the-midzone',
    title: 'The Midzone',
    briefDescription: 'The Midzone is a relatively-civilized segment resting just beyond the Inner Circle. Most Bloxians have established worlds on the border between the Midzone and the Inner Circle, as it is the closest to protection and has allowed for tightly-knit communities to form.\n\nThe farther you travel out from the Midzone\'s border, the more scarce Worlds tend to become.',
    startRadius: 1280,
    endRadius: 2400,
    color: '#7c3aed', // Darker Blue Turning Purple
  },
  {
    id: 'the-outer-circle',
    title: 'The Outer Circle',
    briefDescription: 'The Outer Circle is a dividing point between civilization and anarchy. It is mostly empty and devoid of major groups or factions. The Heart\'s natural light begins to dim when travelling this far out, causing it to become darker overall.',
    startRadius: 2400,
    endRadius: 3600,
    color: '#ec4899', // Pink
  },
  {
    id: 'the-banlands',
    title: 'The Banlands',
    briefDescription: 'The Banlands are a notoriously dangerous area, housing countless exiled criminals left to rot and bicker amongst themselves. The Heart\'s light tints into a deep crimson color as the rays are spread thin, leaving the Banlands obscured in a sea of red shadows.',
    startRadius: 3600,
    endRadius: 4800,
    color: '#ef4444', // Red
  },
  {
    id: 'the-void',
    title: 'The Void',
    briefDescription: 'The Void is a large expanse of nothingness, untouched by the rays of light given off by the Heart. Coated in darkness, it takes significant skill to navigate such an empty and aimless space...\n\n...but why would you want to enter the Void anyways?',
    startRadius: 4800,
    endRadius: 6200,
    color: '#4b5563', // Darker Grey
  },
  {
    id: 'the-null-boundary',
    title: 'The Null Boundary',
    briefDescription: 'A barrier at the edge of reality itself, dividing the Bloxiverse from the Null Zone which lies on the other side. It is unknown what happens if someone were to pass beyond this boundary, but it\'s probably best not to do such a thing under any circumstances.',
    startRadius: 6200,
    endRadius: 6520,
    color: '#9ca3af', // Lighter Grey
  },
  {
    id: 'the-null-zone',
    title: 'The Null Zone',
    briefDescription: 'NULL // NULL // NULL - SEGMENT DOES NOT EXIST. SEGMENT CANNOT EXIST. - NULL // NULL // NULL',
    startRadius: 6520,
    endRadius: 8000,
    color: 'transparent', // Transparent/No Gradient
  },
];

