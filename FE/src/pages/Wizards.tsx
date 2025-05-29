import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Wizards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Show buttons only on the main /wizards route */}
      {window.location.pathname === "/wizards" && (
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "4rem" }}>
          <button className="w-64 h-64 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-blue-50 transition cursor-pointer text-2xl font-bold text-blue-700"
          onClick={() => navigate("/wizards/nft")}>NFT Wizard</button>
          
          <button className="w-64 h-64 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition cursor-pointer text-2xl font-bold text-green-700"
          onClick={() => navigate("/wizards/erc20")}>ERC20 Wizard</button>
        </div>
      )}
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default Wizards;