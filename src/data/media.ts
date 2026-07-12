export type MediaCategory = "Businesses" | "Departments" | "Criminal roleplay" | "Vehicles";
export type NorthBridgeMedia = { src: string; alt: string; category: MediaCategory; width: number; height: number; position?: string };
const image = (name: string) => `/images/northbridge/${name}.webp`;

export const northBridgeMedia: NorthBridgeMedia[] = [
  { src: image("mercs_hands_up"), alt: "NorthBridge gang members surrendering beside customized cars on a rain-soaked street", category: "Criminal roleplay", width: 1413, height: 1113, position: "center 42%" },
  { src: image("mercs_car"), alt: "NorthBridge gang members posing with dark vehicles beneath the Pillbox Hill lights", category: "Criminal roleplay", width: 1402, height: 1122, position: "center 45%" },
  { src: image("pullover"), alt: "NorthBridge police conducting a nighttime traffic stop on a wet city street", category: "Departments", width: 1402, height: 1122, position: "center 44%" },
  { src: image("hands_up"), alt: "Armed NorthBridge officers ordering a suspect to raise their hands during a traffic stop", category: "Departments", width: 1402, height: 1122, position: "center 45%" },
  { src: image("arrest"), alt: "NorthBridge police officer arresting a suspect between two customized vehicles", category: "Departments", width: 1401, height: 1123, position: "center 45%" },
  { src: image("suspect"), alt: "NorthBridge police confronting an armed suspect at sunset", category: "Departments", width: 1122, height: 1402, position: "center 38%" },
  { src: image("cars"), alt: "Two customized NorthBridge performance cars overlooking the city at sunset", category: "Vehicles", width: 1672, height: 941 },
  { src: image("redline_exterior"), alt: "Redline Performance building illuminated at night in NorthBridge", category: "Businesses", width: 1677, height: 938 },
  { src: image("redline_exterior_cars"), alt: "Customized vehicles gathered outside Redline Performance", category: "Businesses", width: 1561, height: 1008 },
  { src: image("redline_pose"), alt: "NorthBridge residents posing with performance cars outside Redline", category: "Businesses", width: 1537, height: 1023 },
  { src: image("upnatom_interior"), alt: "Brightly lit Up-n-Atom restaurant interior in NorthBridge", category: "Businesses", width: 1784, height: 882 },
  { src: image("upnatom_exterior"), alt: "Up-n-Atom restaurant exterior glowing on a rainy NorthBridge night", category: "Businesses", width: 1660, height: 948 },
  { src: image("redline_interior"), alt: "Redline Performance showroom with a black sports car and red accents", category: "Businesses", width: 1672, height: 941 },
];

export const heroMedia = [northBridgeMedia[2], northBridgeMedia[1], northBridgeMedia[4], northBridgeMedia[6], northBridgeMedia[12]] as const;
