import WindowShutter from "@/components/experience/WindowShutter";
import Timeline from "@/components/experience/TimeLine";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Experience",
  description:
    "Explore my experience, professional journey, technical skills, and the projects I've worked on using modern web technologies.",
};

const ExperiencePage = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-10 ">
      <WindowShutter />
      <Timeline />
    </section>
  );
};

export default ExperiencePage;
