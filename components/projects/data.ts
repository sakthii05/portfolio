export type StampType = {
  id: string;
  image: string;
  x: number;
  y: number;
  rotate: number;
  title: string;
  subtext: string;
  description: string;
  year: string;
  series: string;
  projectLink: string;
  classname: { parent: string; child: string };
};

export const stamps: StampType[] = [
  {
    id: "rvr",
    image: "/images/project/company-logo/rvr.webp",
    x: 59,
    y: 60,
    rotate: 4,
    title: "RVR Homes",
    subtext:
      "A complete home-building service covering construction, interiors, renovation in Chennai.",
    description:
      "Client prefered basic digital business identity so started with the basic website package.Managed hosting, SEO foundations, business presence, and the complete transition from design concept to a live business website.",
    year: "2025",
    series: "Basic",
    projectLink: "https://www.rvrhomes.in/",
    classname: {
      parent: "border-[##5C4C73]",
      child: "border-[#5C4C73] text-[#5C4C73]",
    },
  },
  {
    id: "nala",
    image: "/images/project/company-logo/nala.webp",
    x: 40,
    y: 40,
    rotate: -5,
    title: "Nala Construction",
    subtext:
      "From structural planning to finished interiors, delivering complete home-building and renovation solutions.",
    description:
      "Designed and developed a standard residential construction website focused on trust, craftsmanship, interiors, services, and project presentation. Created the visual hierarchy, responsive layouts, interior showcase, service system, pricing packages, gallery, and enquiry journey.",
    year: "2026",
    series: "Standard",
    projectLink: "https://nala-website-taupe.vercel.app/",
    classname: {
      parent: "border-[#36593B]",
      child: "border-[#36593B] text-[#36593B]",
    },
  },
  {
    id: "mech",
    image: "/images/project/company-logo/mechzen.webp",
    x: 35,
    y: 65,
    rotate: -45,
    title: "Mechzen",
    subtext:
      "Engineering design solutions for special-purpose machines, robotics, production automation.",
    description:
      "Designed and developed a premium, design-driven industrial website with a strong focus on brand identity, visual storytelling, and digital experience, using GSAP as the primary animation framework. Crafted the interaction system, responsive layouts and brand-focused visual language to create a distinctive online presence. Provided end-to-end digital support and ongoing website maintenance.",
    year: "2026",
    series: "Premium",
    projectLink: "",
    classname: {
      parent: "border-[#023373]",
      child: "border-[#023373] text-[#023373]",
    },
  },

  {
    id: "dl",
    image: "/images/project/company-logo/dl.webp",
    x: 50,
    y: 50,
    rotate: 15,
    title: "DL Enterprises",
    subtext:
      "CNC cutting, laser processing, engraving, and custom fabrication solutions for modern industries.",
    description:
      "Designed and developed a complete industrial website focused on precision manufacturing and service presentation. Handled deployment, business profile presence, SEO structure, and technical optimization to establish a stronger online presence for the company",
    year: "2025",
    series: "standard",
    projectLink: "https://dlenterprises.in/",
    classname: {
      parent: "border-[#cf3424]",
      child: "border-[#cf3424] text-[#cf3424]",
    },
  },
];


export type OnsiteProjectType ={
  id:string,
        title:string,
        subtext:string,
        subject:string,
        content:string,
        positionStyle:{rotate:string, translateX:string,zindex:number}
}

export const onsiteProjects:OnsiteProjectType[] = [
    {
        id:"01",
        title:"Feedback Platform",
        subtext:"",
        subject:"",
        content:"",
        positionStyle:{rotate:"4deg", translateX:"10px", zindex:3}
    },
    {
        id:"02",
        title:"Ticketing Dashboard",
        subtext:"",
        subject:"",
        content:"",
       positionStyle:{rotate:"4deg", translateX:"60px",zindex:2}
    },
    {
        id:"03",
        title:"Cyber Threat",
        subtext:"",
        subject:"",
        content:"",
       positionStyle:{rotate:"6deg", translateX:"100px",zindex:1}
    },
]