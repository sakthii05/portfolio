import React, { ReactNode } from "react";
import FloatingNavbar from "./FloatingNavBar";

const Layout = (props: { children: ReactNode }) => {
  return (
    <main>
      <section
        className="
        relative
        w-full
        h-dvh
        overflow-hidden
        flex justify-center items-center
        bg-background
      "
      >
        {props.children}
        <FloatingNavbar />
      </section>
    </main>
  );
};

export default Layout;
