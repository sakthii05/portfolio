export type PlaygroundCategory = "hero" | "component" | "ai";

export interface PlaygroundItem {
  id: string;
  title: string; 
  codeLink:string,
  liveLink:string,
  previewSrc:{type:'Img'|'Video',src:string},
  category: PlaygroundCategory;
  tag: {lable:string, show:boolean};
  description: string;
  technologies: string[];
}

export const playgroundTabs: { id: PlaygroundCategory; label: string; count: number }[] = [
  // { id: "hero", label: "Hero", count: 0 },
  { id: "component", label: "Components", count: 2 },
  { id: "ai", label: "AI Apps", count: 2 },
];

export const playgroundItems: PlaygroundItem[] = [
  //UI components
  {
    id: "stamps",
    title: "Digital Stamps",
    category: "component",
    tag:{lable:"Trending",show:true},
    description:
      "A randomly stacked stamps component that allows users to zoom and shuffle the stamps",
    technologies: ["Motion-React","Tailwindcss",],
    liveLink:"https://playground-demo-dun.vercel.app/stamps",
    codeLink:"https://github.com/sakthii05/playground-demo/blob/main/src/app/stamps/page.tsx",
    previewSrc:{type:'Video',src:"https://ik.imagekit.io/sakthidev/portfolio/components/stamp.webm"},
  },
{
    id: "window-shutter",
    title: "Window Shutter",
    category: "component",
    tag:{lable:"Trending",show:false},
    description:
      "An interactive window shutter component that smoothly opens and closes to reveal the video beneath. Built for an immersive, tactile experience with smooth motion and seamless transitions.",
    technologies: ["Motion-React","Tailwindcss"],
    liveLink:"https://playground-demo-dun.vercel.app/window-shutter",
    codeLink:"https://github.com/sakthii05/playground-demo/blob/main/src/app/window-shutter/page.tsx",
    previewSrc:{type:'Video',src:"https://ik.imagekit.io/sakthidev/portfolio/components/window-shutter.webm"},
  },
  // --- AI APPS TAB ---
  {
    id: "fitness",
    title: "Fitness Plan Generator",
    category: "ai",
    tag:{lable:"",show:false},
    description:
      "Generate personalized fitness plans based on user inputs. Share your essentials and we will craft a high-performance fitness and nutrition plan calibrated to you.",
    technologies: ["AI-sdk","Langchain","Zod"],
    liveLink:"https://ai-learning-beta.vercel.app/fitnessplan",
    codeLink:"https://github.com/sakthii05/ai-learning/tree/main/src/components/fitnessplan",
    previewSrc:{type:'Img',src:"https://ik.imagekit.io/sakthidev/portfolio/aiapp/fitnessapp.webp"},
  },
  {
    id: "chat-bot",
    title: "Chat Bot",
    category: "ai",
    tag:{lable:"",show:false},
    description:
      "Creating Chatgpt style chatbot with streaming response. Using gemini-2.5-flash model with markdown output",
    technologies: ["React-markdown","AI-sdk","Gemini-API"],
     liveLink:"https://ai-learning-beta.vercel.app/aichat",
    codeLink:"https://github.com/sakthii05/ai-learning/tree/main/src/components/chatUI",
    previewSrc:{type:'Img',src:"https://ik.imagekit.io/sakthidev/portfolio/aiapp/chatapp.webp"},
  },

];
