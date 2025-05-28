import React from "react";
import type { ReactNode } from "react";

interface WizardsProps {
  children?: ReactNode;
}

const Wizards: React.FC<WizardsProps> = ({ children }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-center"></h1>
    <div className="mt-8">{children}</div>
  </div>
);

export default Wizards;
