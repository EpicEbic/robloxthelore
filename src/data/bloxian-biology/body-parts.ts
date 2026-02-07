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
  name: string;
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

// ============================================================
// R15 Body Type — 15 pieces
// Coordinate system: viewBox 0 0 120 160
// All values are carefully symmetric around centerX = 60
// ============================================================

const TORSO_W = 40;
const TORSO_H = 32;
const TORSO_X = 60 - TORSO_W / 2; // 40
const HEAD_W = 18;
const HEAD_H = 16;
const HEAD_X = 60 - HEAD_W / 2;
const HEAD_Y = 2;
const HEAD_GAP = 2;
const TORSO_Y = HEAD_Y + HEAD_H + HEAD_GAP; // 20

const PELVIS_H = 6;
const PELVIS_Y = TORSO_Y + TORSO_H; // 52

// Legs fill pelvis width: 2 * LEG_W + LEG_GAP = TORSO_W
const SEG_GAP = 1; // gap between limb segments
const LEG_GAP = 2; // gap between left and right leg
const LEG_W = (TORSO_W - LEG_GAP) / 2; // 19
const UPPER_LEG_H = 20;
const LOWER_LEG_H = 18;
const FOOT_H = 5;
const FOOT_W = LEG_W;

// Arms same thickness as legs
const ARM_W = LEG_W; // 19
const ARM_GAP = 2; // gap between arm and torso
// Arms must not extend past pelvis bottom: total arm ≤ TORSO_H + PELVIS_H = 38
// 3 segments + 2 gaps: upper + lower + hand + 2*SEG_GAP ≤ 38
const UPPER_ARM_H = 17;
const LOWER_ARM_H = 14;
const HAND_H = 5;
// Total: 17 + 1 + 14 + 1 + 5 = 38 ✓

const LEFT_ARM_X = TORSO_X - ARM_W - ARM_GAP;
const RIGHT_ARM_X = TORSO_X + TORSO_W + ARM_GAP;

const LEFT_LEG_X = 60 - LEG_GAP / 2 - LEG_W;
const RIGHT_LEG_X = 60 + LEG_GAP / 2;
const LEG_Y = PELVIS_Y + PELVIS_H;

const r15Parts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    description: 'The cranial structure of a Bloxian, containing sensory organs and the primary processing unit.',
    function: 'Houses the eyes, ears, and primary cognitive functions. The head is the center of perception and decision-making for a Bloxian.',
    r15R6Differences: 'In R15, the head is a separate piece that can move independently from the torso, allowing for more expressive animations.',
    lore: 'The head is considered the window to a Bloxian\'s Core, as facial expressions often reflect the state of their inner being.',
    position: { x: HEAD_X, y: HEAD_Y, width: HEAD_W, height: HEAD_H }
  },
  {
    id: 'torso',
    name: 'Torso',
    description: 'The main body structure of a Bloxian, connecting the head to the lower body and arms.',
    function: 'Provides structural support for the arms and head. Contains the Core housing.',
    r15R6Differences: 'R15 has a single large torso piece, wider than it is tall, positioned directly below the head.',
    lore: 'The torso is where most Bloxians feel the strongest connection to their Core, as it\'s closest to the heart of their being.',
    position: { x: TORSO_X, y: TORSO_Y, width: TORSO_W, height: TORSO_H }
  },
  {
    id: 'leftUpperArm',
    name: 'Left Upper Arm',
    description: 'The upper segment of the left arm, connecting the shoulder to the elbow.',
    function: 'Provides range of motion for the left arm, allowing for lifting and reaching actions.',
    r15R6Differences: 'R15 divides arms into upper and lower segments, creating more realistic arm movement.',
    lore: 'The left side is often associated with receiving and intuition in Bloxian culture.',
    position: { x: LEFT_ARM_X, y: TORSO_Y, width: ARM_W, height: UPPER_ARM_H }  // upper arm flush with torso top
  },
  {
    id: 'leftLowerArm',
    name: 'Left Lower Arm',
    description: 'The lower segment of the left arm, connecting the elbow to the hand.',
    function: 'Enables fine motor control and precise hand movements.',
    r15R6Differences: 'Separate from the upper arm in R15, allowing for independent elbow movement.',
    lore: 'Lower arms are where Bloxians channel their creative energy into physical action.',
    position: { x: LEFT_ARM_X, y: TORSO_Y + UPPER_ARM_H + SEG_GAP, width: ARM_W, height: LOWER_ARM_H }
  },
  {
    id: 'leftHand',
    name: 'Left Hand',
    description: 'The left hand, used for manipulation and interaction with the world.',
    function: 'Primary tool for interaction, allowing Bloxians to grasp, hold, and manipulate objects.',
    r15R6Differences: 'R15 includes separate hand pieces, enabling more detailed hand animations and gestures.',
    lore: 'Hands are considered extensions of the Core\'s will, translating intention into action.',
    position: { x: LEFT_ARM_X, y: TORSO_Y + UPPER_ARM_H + SEG_GAP + LOWER_ARM_H + SEG_GAP, width: ARM_W, height: HAND_H }
  },
  {
    id: 'rightUpperArm',
    name: 'Right Upper Arm',
    description: 'The upper segment of the right arm, connecting the shoulder to the elbow.',
    function: 'Provides range of motion for the right arm, typically the dominant side.',
    r15R6Differences: 'R15 divides arms into upper and lower segments for more natural movement.',
    lore: 'The right side is often associated with action and giving in Bloxian culture.',
    position: { x: RIGHT_ARM_X, y: TORSO_Y, width: ARM_W, height: UPPER_ARM_H }  // symmetric
  },
  {
    id: 'rightLowerArm',
    name: 'Right Lower Arm',
    description: 'The lower segment of the right arm, connecting the elbow to the hand.',
    function: 'Enables fine motor control and precise hand movements on the dominant side.',
    r15R6Differences: 'Separate from the upper arm in R15, allowing for independent elbow movement.',
    lore: 'The right lower arm is where most Bloxians express their primary actions and intentions.',
    position: { x: RIGHT_ARM_X, y: TORSO_Y + UPPER_ARM_H + SEG_GAP, width: ARM_W, height: LOWER_ARM_H }
  },
  {
    id: 'rightHand',
    name: 'Right Hand',
    description: 'The right hand, typically the dominant hand for most Bloxians.',
    function: 'Primary tool for interaction and manipulation, often more dexterous than the left.',
    r15R6Differences: 'R15 includes separate hand pieces for more detailed animations.',
    lore: 'The right hand is seen as the instrument of a Bloxian\'s will, carrying out their Core\'s desires.',
    position: { x: RIGHT_ARM_X, y: TORSO_Y + UPPER_ARM_H + SEG_GAP + LOWER_ARM_H + SEG_GAP, width: ARM_W, height: HAND_H }
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    description: 'The pelvis/waist, connecting the torso to the legs.',
    function: 'Provides the base structure for leg attachment.',
    r15R6Differences: 'R15 has a separate pelvis piece, a thin horizontal rectangle below the torso.',
    lore: 'The pelvis represents stability and grounding, anchoring the Bloxian to the physical world.',
    position: { x: TORSO_X, y: PELVIS_Y, width: TORSO_W, height: PELVIS_H }
  },
  {
    id: 'leftUpperLeg',
    name: 'Left Upper Leg',
    description: 'The upper segment of the left leg, connecting the hip to the knee.',
    function: 'Provides support and mobility, enabling walking, running, and jumping.',
    r15R6Differences: 'R15 divides legs into upper and lower segments for more realistic movement.',
    lore: 'Legs represent a Bloxian\'s connection to the ground and their ability to move through the world.',
    position: { x: LEFT_LEG_X, y: LEG_Y, width: LEG_W, height: UPPER_LEG_H }
  },
  {
    id: 'leftLowerLeg',
    name: 'Left Lower Leg',
    description: 'The lower segment of the left leg, connecting the knee to the ankle.',
    function: 'Enables foot movement and provides additional support for locomotion.',
    r15R6Differences: 'Separate from the upper leg in R15, allowing for knee bending animations.',
    lore: 'Lower legs are where Bloxians ground themselves, connecting their Core to the earth.',
    position: { x: LEFT_LEG_X, y: LEG_Y + UPPER_LEG_H + SEG_GAP, width: LEG_W, height: LOWER_LEG_H }
  },
  {
    id: 'leftFoot',
    name: 'Left Foot',
    description: 'The left foot, providing the base of support and balance.',
    function: 'Primary contact point with the ground, enabling balance, walking, and standing.',
    r15R6Differences: 'R15 includes separate foot pieces, allowing for more natural foot placement and animation.',
    lore: 'Feet are considered the foundation of a Bloxian\'s physical presence, grounding their Core in reality.',
    position: { x: LEFT_LEG_X, y: LEG_Y + UPPER_LEG_H + SEG_GAP + LOWER_LEG_H + SEG_GAP, width: FOOT_W, height: FOOT_H }
  },
  {
    id: 'rightUpperLeg',
    name: 'Right Upper Leg',
    description: 'The upper segment of the right leg, connecting the hip to the knee.',
    function: 'Provides support and mobility, working in tandem with the left leg.',
    r15R6Differences: 'R15 divides legs into multiple segments for more realistic movement.',
    lore: 'The right leg often carries more weight in movement, representing action and forward momentum.',
    position: { x: RIGHT_LEG_X, y: LEG_Y, width: LEG_W, height: UPPER_LEG_H }
  },
  {
    id: 'rightLowerLeg',
    name: 'Right Lower Leg',
    description: 'The lower segment of the right leg, connecting the knee to the ankle.',
    function: 'Enables foot movement and provides additional support for locomotion.',
    r15R6Differences: 'Separate from the upper leg in R15, allowing for knee bending animations.',
    lore: 'Lower legs ground the Bloxian, connecting their Core\'s energy to the physical world.',
    position: { x: RIGHT_LEG_X, y: LEG_Y + UPPER_LEG_H + SEG_GAP, width: LEG_W, height: LOWER_LEG_H }
  },
  {
    id: 'rightFoot',
    name: 'Right Foot',
    description: 'The right foot, providing the base of support and balance.',
    function: 'Primary contact point with the ground, enabling balance and movement.',
    r15R6Differences: 'R15 includes separate foot pieces for more natural foot placement.',
    lore: 'Feet anchor a Bloxian to the world, providing the foundation for all their actions.',
    position: { x: RIGHT_LEG_X, y: LEG_Y + UPPER_LEG_H + SEG_GAP + LOWER_LEG_H + SEG_GAP, width: FOOT_W, height: FOOT_H }
  }
];

// ============================================================
// R6 Body Type — 6 pieces
// Coordinate system: viewBox 0 0 120 140
// Symmetric around centerX = 60
// ============================================================

const R6_TORSO_W = 40;
const R6_TORSO_H = 38;
const R6_TORSO_X = 60 - R6_TORSO_W / 2;
const R6_HEAD_W = 18;
const R6_HEAD_H = 16;
const R6_HEAD_X = 60 - R6_HEAD_W / 2;
const R6_HEAD_Y = 2;
const R6_TORSO_Y = R6_HEAD_Y + R6_HEAD_H + 2;

const R6_ARM_W = 16;
const R6_ARM_H = R6_TORSO_H;
const R6_ARM_GAP = 2;
const R6_LEFT_ARM_X = R6_TORSO_X - R6_ARM_W - R6_ARM_GAP;
const R6_RIGHT_ARM_X = R6_TORSO_X + R6_TORSO_W + R6_ARM_GAP;

// Legs fill torso width: 2 * R6_LEG_W + R6_LEG_GAP = R6_TORSO_W
const R6_LEG_GAP = 2;
const R6_LEG_W = (R6_TORSO_W - R6_LEG_GAP) / 2; // 19
const R6_LEG_H = 42;
const R6_LEFT_LEG_X = 60 - R6_LEG_GAP / 2 - R6_LEG_W;
const R6_RIGHT_LEG_X = 60 + R6_LEG_GAP / 2;
const R6_LEG_Y = R6_TORSO_Y + R6_TORSO_H;

const r6Parts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    description: 'The cranial structure of a Bloxian, containing sensory organs and the primary processing unit.',
    function: 'Houses the eyes, ears, and primary cognitive functions. The head is the center of perception and decision-making for a Bloxian.',
    r15R6Differences: 'In R6, the head is simpler and moves as a single unit with the torso, creating a more classic Roblox appearance.',
    lore: 'The head is considered the window to a Bloxian\'s Core, as facial expressions often reflect the state of their inner being.',
    position: { x: R6_HEAD_X, y: R6_HEAD_Y, width: R6_HEAD_W, height: R6_HEAD_H }
  },
  {
    id: 'torso',
    name: 'Torso',
    description: 'The main body structure of a Bloxian, housing the Core and connecting all limbs.',
    function: 'Central structure that supports the head, arms, and legs. Contains the Core, the heart and soul of every Bloxian.',
    r15R6Differences: 'R6 uses a single unified torso piece, creating a simpler, more blocky appearance compared to R15\'s segmented design.',
    lore: 'The torso is the most sacred part of a Bloxian, as it houses their Core—the essence of their being and consciousness.',
    position: { x: R6_TORSO_X, y: R6_TORSO_Y, width: R6_TORSO_W, height: R6_TORSO_H }
  },
  {
    id: 'leftArm',
    name: 'Left Arm',
    description: 'The complete left arm, from shoulder to hand.',
    function: 'Provides range of motion and manipulation capabilities on the left side.',
    r15R6Differences: 'R6 uses a single arm piece, while R15 divides it into upper arm, lower arm, and hand segments.',
    lore: 'The left side is often associated with receiving and intuition in Bloxian culture.',
    position: { x: R6_LEFT_ARM_X, y: R6_TORSO_Y, width: R6_ARM_W, height: R6_ARM_H }
  },
  {
    id: 'rightArm',
    name: 'Right Arm',
    description: 'The complete right arm, from shoulder to hand.',
    function: 'Provides range of motion and manipulation capabilities, typically the dominant side.',
    r15R6Differences: 'R6 uses a single arm piece, creating a simpler but less flexible design than R15.',
    lore: 'The right side is often associated with action and giving in Bloxian culture.',
    position: { x: R6_RIGHT_ARM_X, y: R6_TORSO_Y, width: R6_ARM_W, height: R6_ARM_H }
  },
  {
    id: 'leftLeg',
    name: 'Left Leg',
    description: 'The complete left leg, from hip to foot.',
    function: 'Provides support and mobility, enabling walking, running, and jumping.',
    r15R6Differences: 'R6 uses a single leg piece, while R15 divides it into upper leg, lower leg, and foot segments.',
    lore: 'Legs represent a Bloxian\'s connection to the ground and their ability to move through the world.',
    position: { x: R6_LEFT_LEG_X, y: R6_LEG_Y, width: R6_LEG_W, height: R6_LEG_H }
  },
  {
    id: 'rightLeg',
    name: 'Right Leg',
    description: 'The complete right leg, from hip to foot.',
    function: 'Provides support and mobility, working in tandem with the left leg.',
    r15R6Differences: 'R6 uses a single leg piece, creating a simpler but less detailed design than R15.',
    lore: 'The right leg often carries more weight in movement, representing action and forward momentum.',
    position: { x: R6_RIGHT_LEG_X, y: R6_LEG_Y, width: R6_LEG_W, height: R6_LEG_H }
  }
];

// Core Data
const r15CoreData: CoreData = {
  id: 'core',
  name: 'Core',
  position: { x: 60, y: TORSO_Y + TORSO_H * 0.35, radius: 4 },
  description: 'The Core is the heart and soul of every Bloxian, a small but powerful energy source located in the upper portion of the torso.',
  function: 'The Core is the source of a Bloxian\'s consciousness, life force, and connection to the Bloxiverse. It is what makes a Bloxian truly alive and aware.',
  lore: 'The Core is the most mysterious and important part of a Bloxian. It is said that when a Bloxian\'s Core is damaged or destroyed, they cease to exist entirely. The Core pulses with the rhythm of life itself, and its glow reflects the Bloxian\'s emotional and physical state. Some believe the Core contains fragments of the Bloxiverse itself, connecting each Bloxian to the greater cosmic order.'
};

const r6CoreData: CoreData = {
  id: 'core',
  name: 'Core',
  position: { x: 60, y: R6_TORSO_Y + R6_TORSO_H * 0.4, radius: 4.5 },
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
