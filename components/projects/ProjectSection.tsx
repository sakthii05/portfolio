import React, { ReactNode } from "react";

const ProjectSection = (props: {
  title: string;
  subtext: string;
  numberOfProjects: number;
  children: ReactNode;
  sectionId: string;
}) => {
  const { title, subtext, numberOfProjects, children,sectionId } = props;
  return (
    <section
      aria-labelledby="freelance-heading"
      className=" space-y-4 w-full sm:w-[70%] md:w-[65%] lg:w-[55%]"
      id={sectionId}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2  pb-4">
        <div className="space-y-1">
          <h2
            id="freelance-heading"
            className="text-2xl font-mono font-medium text-foreground"
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{subtext}</p>
        </div>
        <span className=" font-mono text-xs font-semibold tracking-wider text-muted-foreground whitespace-nowrap">
          0{numberOfProjects}
        </span>
      </div>
      {children}
    </section>
  );
};

export default ProjectSection;
