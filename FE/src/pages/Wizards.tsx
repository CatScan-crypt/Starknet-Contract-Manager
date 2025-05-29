import React from "react";
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface WizardsProps {
  children?: ReactNode;
}

const Wizards: React.FC<WizardsProps> = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-center"></h1>
    <div className="mt-8"><Outlet /></div>
  </div>
);

export default Wizards;
