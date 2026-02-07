export interface BodyPart {
  id: string;
  name: string;
  description: string;
  function: string;
  r15R6Differences?: string;
  lore?: string;
  position: { x: number; y: number; width: number; height: number };
}

export interface CoreData {
  id: string;
  position: { x: number; y: number; radius: number };
  description: string;
  function: string;
  lore: string;
}

export interface BodyType {
  type: 'r15' | 'r6';
  parts: BodyPart[];
  core: CoreData;
}

// R15 Body Parts (15 pieces) - Accurate to reference image
// Coordinate system: 0-100 width, 0-100 height
const r15Parts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    description: 'The cranial structure of a Bloxian, containing sensory organs and the primary processing unit.',
    function: 'Houses the eyes, ears, and primary cognitive functions. The head is the center of perception and decision-making for a Bloxian.',
    r15R6Differences: 'In R15, the head is a separate piece that can move independently from the torso, allowing for more expressive animations.',
    lore: 'The head is considered the window to a Bloxian\'s Core, as facial expressions often reflect the state of their inner being.',
    position: { x: 42, y: 2, width: 16, height: 14 } // Rounded rectangle, centered
  },
  {
    id: 'torso',
    name: 'Torso',
    description: 'The main body structure of a Bloxian, connecting the head to the lower body and arms.',
    function: 'Provides structural support for the arms and head. Contains the Core housing.',
    r15R6Differences: 'R15 has a single large torso piece, wider than it is tall, positioned directly below the head.',
    lore: 'The torso is where most Bloxians feel the strongest connection to their Core, as it\'s closest to the heart of their being.',
    position: { x: 35, y: 16, width: 30, height: 18 } // Large rectangle, wider than tall
  },
  {
    id: 'leftUpperArm',
    name: 'Left Upper Arm',
    description: 'The upper segment of the left arm, connecting the shoulder to the elbow.',
    function: 'Provides range of motion for the left arm, allowing for lifting and reaching actions.',
    r15R6Differences: 'R15 divides arms into upper and lower segments, creating more realistic arm movement.',
    lore: 'The left side is often associated with receiving and intuition in Bloxian culture.',
    position: { x: 20, y: 16, width: 10, height: 16 } // Vertical, attached to upper left of torso
  },
  {
    id: 'leftLowerArm',
    name: 'Left Lower Arm',
    description: 'The lower segment of the left arm, connecting the elbow to the hand.',
    function: 'Enables fine motor control and precise hand movements.',
    r15R6Differences: 'Separate from the upper arm in R15, allowing for independent elbow movement.',
    lore: 'Lower arms are where Bloxians channel their creative energy into physical action.',
    position: { x: 18, y: 32, width: 8, height: 14 } // Smaller, below upper arm
  },
  {
    id: 'leftHand',
    name: 'Left Hand',
    description: 'The left hand, used for manipulation and interaction with the world.',
    function: 'Primary tool for interaction, allowing Bloxians to grasp, hold, and manipulate objects.',
    r15R6Differences: 'R15 includes separate hand pieces, enabling more detailed hand animations and gestures.',
    lore: 'Hands are considered extensions of the Core\'s will, translating intention into action.',
    position: { x: 16, y: 46, width: 6, height: 8 } // Small at end of arm
  },
  {
    id: 'rightUpperArm',
    name: 'Right Upper Arm',
    description: 'The upper segment of the right arm, connecting the shoulder to the elbow.',
    function: 'Provides range of motion for the right arm, typically the dominant side.',
    r15R6Differences: 'R15 divides arms into upper and lower segments for more natural movement.',
    lore: 'The right side is often associated with action and giving in Bloxian culture.',
    position: { x: 70, y: 16, width: 10, height: 16 } // Vertical, attached to upper right of torso, symmetrical
  },
  {
    id: 'rightLowerArm',
    name: 'Right Lower Arm',
    description: 'The lower segment of the right arm, connecting the elbow to the hand.',
    function: 'Enables fine motor control and precise hand movements on the dominant side.',
    r15R6Differences: 'Separate from the upper arm in R15, allowing for independent elbow movement.',
    lore: 'The right lower arm is where most Bloxians express their primary actions and intentions.',
    position: { x: 74, y: 32, width: 8, height: 14 } // Smaller, below upper arm, symmetrical
  },
  {
    id: 'rightHand',
    name: 'Right Hand',
    description: 'The right hand, typically the dominant hand for most Bloxians.',
    function: 'Primary tool for interaction and manipulation, often more dexterous than the left.',
    r15R6Differences: 'R15 includes separate hand pieces for more detailed animations.',
    lore: 'The right hand is seen as the instrument of a Bloxian\'s will, carrying out their Core\'s desires.',
    position: { x: 78, y: 46, width: 6, height: 8 } // Small at end of arm, symmetrical
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    description: 'The pelvis/waist, connecting the torso to the legs.',
    function: 'Provides the base structure for leg attachment.',
    r15R6Differences: 'R15 has a separate pelvis piece, a thin horizontal rectangle below the torso.',
    lore: 'The pelvis represents stability and grounding, anchoring the Bloxian to the physical world.',
    position: { x: 35, y: 34, width: 30, height: 4 } // Thin horizontal, spanning torso width
  },
  {
    id: 'leftUpperLeg',
    name: 'Left Upper Leg',
    description: 'The upper segment of the left leg, connecting the hip to the knee.',
    function: 'Provides support and mobility, enabling walking, running, and jumping.',
    r15R6Differences: 'R15 divides legs into upper and lower segments for more realistic movement.',
    lore: 'Legs represent a Bloxian\'s connection to the ground and their ability to move through the world.',
    position: { x: 38, y: 38, width: 9, height: 18 } // Vertical, below pelvis, left side
  },
  {
    id: 'leftLowerLeg',
    name: 'Left Lower Leg',
    description: 'The lower segment of the left leg, connecting the knee to the ankle.',
    function: 'Enables foot movement and provides additional support for locomotion.',
    r15R6Differences: 'Separate from the upper leg in R15, allowing for knee bending animations.',
    lore: 'Lower legs are where Bloxians ground themselves, connecting their Core to the earth.',
    position: { x: 38, y: 56, width: 8, height: 16 } // Smaller, below upper leg
  },
  {
    id: 'leftFoot',
    name: 'Left Foot',
    description: 'The left foot, providing the base of support and balance.',
    function: 'Primary contact point with the ground, enabling balance, walking, and standing.',
    r15R6Differences: 'R15 includes separate foot pieces, allowing for more natural foot placement and animation.',
    lore: 'Feet are considered the foundation of a Bloxian\'s physical presence, grounding their Core in reality.',
    position: { x: 37, y: 72, width: 7, height: 6 } // Small at bottom
  },
  {
    id: 'rightUpperLeg',
    name: 'Right Upper Leg',
    description: 'The upper segment of the right leg, connecting the hip to the knee.',
    function: 'Provides support and mobility, working in tandem with the left leg.',
    r15R6Differences: 'R15 divides legs into multiple segments for more realistic movement.',
    lore: 'The right leg often carries more weight in movement, representing action and forward momentum.',
    position: { x: 53, y: 38, width: 9, height: 18 } // Vertical, below pelvis, right side, symmetrical
  },
  {
    id: 'rightLowerLeg',
    name: 'Right Lower Leg',
    description: 'The lower segment of the right leg, connecting the knee to the ankle.',
    function: 'Enables foot movement and provides additional support for locomotion.',
    r15R6Differences: 'Separate from the upper leg in R15, allowing for knee bending animations.',
    lore: 'Lower legs ground the Bloxian, connecting their Core\'s energy to the physical world.',
    position: { x: 54, y: 56, width: 8, height: 16 } // Smaller, below upper leg, symmetrical
  },
  {
    id: 'rightFoot',
    name: 'Right Foot',
    description: 'The right foot, providing the base of support and balance.',
    function: 'Primary contact point with the ground, enabling balance and movement.',
    r15R6Differences: 'R15 includes separate foot pieces for more natural foot placement.',
    lore: 'Feet anchor a Bloxian to the world, providing the foundation for all their actions.',
    position: { x: 56, y: 72, width: 7, height: 6 } // Small at bottom, symmetrical
  }
];

// R6 Body Parts (6 pieces) - Accurate to reference image
// Coordinate system: 0-100 width, 0-100 height
const r6Parts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    description: 'The cranial structure of a Bloxian, containing sensory organs and the primary processing unit.',
    function: 'Houses the eyes, ears, and primary cognitive functions. The head is the center of perception and decision-making for a Bloxian.',
    r15R6Differences: 'In R6, the head is simpler and moves as a single unit with the torso, creating a more classic Roblox appearance.',
    lore: 'The head is considered the window to a Bloxian\'s Core, as facial expressions often reflect the state of their inner being.',
    position: { x: 42, y: 2, width: 16, height: 14 } // Rounded rectangle, centered
  },
  {
    id: 'torso',
    name: 'Torso',
    description: 'The main body structure of a Bloxian, housing the Core and connecting all limbs.',
    function: 'Central structure that supports the head, arms, and legs. Contains the Core, the heart and soul of every Bloxian.',
    r15R6Differences: 'R6 uses a single unified torso piece, creating a simpler, more blocky appearance compared to R15\'s segmented design.',
    lore: 'The torso is the most sacred part of a Bloxian, as it houses their Core—the essence of their being and consciousness.',
    position: { x: 35, y: 16, width: 30, height: 22 } // Large rectangle, wider than tall
  },
  {
    id: 'leftArm',
    name: 'Left Arm',
    description: 'The complete left arm, from shoulder to hand.',
    function: 'Provides range of motion and manipulation capabilities on the left side.',
    r15R6Differences: 'R6 uses a single arm piece, while R15 divides it into upper arm, lower arm, and hand segments.',
    lore: 'The left side is often associated with receiving and intuition in Bloxian culture.',
    position: { x: 20, y: 16, width: 10, height: 22 } // Vertical, top edge aligned with torso top, same height as torso
  },
  {
    id: 'rightArm',
    name: 'Right Arm',
    description: 'The complete right arm, from shoulder to hand.',
    function: 'Provides range of motion and manipulation capabilities, typically the dominant side.',
    r15R6Differences: 'R6 uses a single arm piece, creating a simpler but less flexible design than R15.',
    lore: 'The right side is often associated with action and giving in Bloxian culture.',
    position: { x: 70, y: 16, width: 10, height: 22 } // Vertical, top edge aligned with torso top, symmetrical
  },
  {
    id: 'leftLeg',
    name: 'Left Leg',
    description: 'The complete left leg, from hip to foot.',
    function: 'Provides support and mobility, enabling walking, running, and jumping.',
    r15R6Differences: 'R6 uses a single leg piece, while R15 divides it into upper leg, lower leg, and foot segments.',
    lore: 'Legs represent a Bloxian\'s connection to the ground and their ability to move through the world.',
    position: { x: 38, y: 38, width: 9, height: 28 } // Vertical, below torso, slightly taller than arms, gap between legs
  },
  {
    id: 'rightLeg',
    name: 'Right Leg',
    description: 'The complete right leg, from hip to foot.',
    function: 'Provides support and mobility, working in tandem with the left leg.',
    r15R6Differences: 'R6 uses a single leg piece, creating a simpler but less detailed design than R15.',
    lore: 'The right leg often carries more weight in movement, representing action and forward momentum.',
    position: { x: 53, y: 38, width: 9, height: 28 } // Vertical, below torso, symmetrical, gap between legs
  }
];

// Core Data - Different positions for R15 and R6
const r15CoreData: CoreData = {
  id: 'core',
  position: { x: 50, y: 22, radius: 3.5 }, // Upper portion of torso (y: 16 + height/4 = 16 + 18/4 ≈ 20.5, but visually upper)
  description: 'The Core is the heart and soul of every Bloxian, a small but powerful energy source located in the upper portion of the torso.',
  function: 'The Core is the source of a Bloxian\'s consciousness, life force, and connection to the Bloxiverse. It is what makes a Bloxian truly alive and aware.',
  lore: 'The Core is the most mysterious and important part of a Bloxian. It is said that when a Bloxian\'s Core is damaged or destroyed, they cease to exist entirely. The Core pulses with the rhythm of life itself, and its glow reflects the Bloxian\'s emotional and physical state. Some believe the Core contains fragments of the Bloxiverse itself, connecting each Bloxian to the greater cosmic order.'
};

const r6CoreData: CoreData = {
  id: 'core',
  position: { x: 50, y: 27, radius: 3.5 }, // Middle of torso (y: 16 + height/2 = 16 + 22/2 = 27)
  description: 'The Core is the heart and soul of every Bloxian, a small but powerful energy source located in the center of the torso.',
  function: 'The Core is the source of a Bloxian\'s consciousness, life force, and connection to the Bloxiverse. It is what makes a Bloxian truly alive and aware.',
  lore: 'The Core is the most mysterious and important part of a Bloxian. It is said that when a Bloxian\'s Core is damaged or destroyed, they cease to exist entirely. The Core pulses with the rhythm of life itself, and its glow reflects the Bloxian\'s emotional and physical state. Some believe the Core contains fragments of the Bloxiverse itself, connecting each Bloxian to the greater cosmic order.'
};

export const R15_BODY_TYPE: BodyType = {
  type: 'r15',
  parts: r15Parts,
  core: r15CoreData
};

export const R6_BODY_TYPE: BodyType = {
  type: 'r6',
  parts: r6Parts,
  core: r6CoreData
};

