import React, { ReactNode } from "react";
import FloatingNavbar from "./FloatingNavBar";

const Layout = (props: { children: ReactNode }) => {
  return (
    <main className=" w-full flex justify-center font-sans items-start  overflow-x-hidden bg-background">
      <div className="w-full max-w-350 ">
        {props.children}
        <FloatingNavbar />
      </div>
    </main>
  );
};

export default Layout;
