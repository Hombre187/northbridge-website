export type Department = { name: string; short: string; description: string; expectations: string; status: "Open" | "Limited" | "Closed"; image: string };
export type Business = { name: string; category: string; description: string; location: string; status: string; image: string };

export const features = [
  ["18+ Serious Roleplay", "Mature, grounded storytelling where choices carry weight."],
  ["Player-Owned Businesses", "Build a brand, employ residents, and shape the city economy."],
  ["Police & EMS", "Structured public-service roleplay with meaningful progression."],
  ["Custom Economy", "A balanced, evolving economy designed for long-term stories."],
  ["Gangs & Organizations", "Create alliances, rivalries, and criminal narratives with purpose."],
  ["Vehicles & Housing", "Curated vehicles and personal spaces that feel truly yours."],
] as const;

export const businesses: Business[] = [
  { name: "Redline Performance", category: "Automotive", description: "Performance tuning, repairs, and a culture built for the city’s most dedicated drivers.", location: "Location to be announced", status: "Hiring", image: "/images/businesses/redline.svg" },
  { name: "Up-n-Atom", category: "Food & Hospitality", description: "Fast food, late-night meetups, and one of NorthBridge’s social landmarks.", location: "Location to be announced", status: "Open", image: "/images/businesses/upnatom.svg" },
  { name: "DigiDen", category: "Technology", description: "Consumer tech, device support, and digital services for connected citizens.", location: "Location to be announced", status: "Hiring", image: "/images/businesses/digiden.svg" },
  { name: "Ammu-Nation", category: "Retail", description: "Licensed equipment sales delivered through careful, regulation-focused roleplay.", location: "Location to be announced", status: "Opening soon", image: "/images/businesses/ammu.svg" },
];

export const departments: Department[] = [
  { name: "Los Santos Police Department", short: "LSPD", description: "Professional urban law enforcement focused on service, investigation, and accountable policing.", expectations: "Maturity, clear communication, sound judgment, and consistent activity.", status: "Open", image: "/images/departments/lspd.svg" },
  { name: "Blaine County Sheriff’s Office", short: "BCSO", description: "Countywide patrol and community policing across NorthBridge’s rural communities.", expectations: "Patient roleplay, teamwork, initiative, and respect for procedure.", status: "Open", image: "/images/departments/bcso.svg" },
  { name: "Emergency Medical Services", short: "EMS", description: "Patient-led emergency medicine that creates scenes instead of simply ending them.", expectations: "Calm communication, empathy, medical roleplay, and reliability.", status: "Open", image: "/images/departments/ems.svg" },
  { name: "Department of Justice", short: "DOJ", description: "Courts, legal advocacy, and civic systems supporting consequential roleplay.", expectations: "Excellent writing, neutrality, preparation, and discretion.", status: "Limited", image: "/images/departments/doj.svg" },
  { name: "NorthBridge Motors", short: "NBM", description: "Mechanical expertise, roadside support, customization, and automotive community.", expectations: "Customer-first roleplay, vehicle knowledge, and dependable activity.", status: "Open", image: "/images/departments/mechanics.svg" },
];

export const staff = [
  { group: "Owners", members: [{ name: "Hombre187", role: "Owner — initial entry" }, { name: "Mercs", role: "Co-Owner — initial entry" }] },
  { group: "Management", members: [{ name: "Position Open", role: "Placeholder entry" }] },
  { group: "Administrators", members: [{ name: "Position Open", role: "Placeholder entry" }] },
  { group: "Moderators", members: [{ name: "Position Open", role: "Placeholder entry" }] },
  { group: "Developers", members: [{ name: "Position Open", role: "Placeholder entry" }] },
];
