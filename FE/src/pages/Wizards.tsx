import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { slideVariants } from "../animation/animationVariants";

const Wizards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-10 text-center mr-50 text-gray-900">Wizards</h1>
      {/* Show buttons only on the main /wizards route */}
      {window.location.pathname === "/wizards" && (
        <div className="grid gap-8 md:grid-cols-2 justify-items-center mb-12">
          <motion.div
            className="w-64 h-64 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-blue-50 transition cursor-pointer text-2xl font-bold text-blue-700 border-2 border-blue-100 hover:border-blue-400"
            onClick={() => navigate("/wizards/nft")}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            custom={1}
          >
            <img src="/NFT.svg" alt="NFT Icon" className="w-16 h-16 mb-4 pointer-events-none" />
            NFT Wizard
            <span className="text-base font-normal text-blue-500 mt-2">Create and launch NFTs</span>
          </motion.div>
          <motion.div
            className="w-64 h-64 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition cursor-pointer text-2xl font-bold text-green-700 border-2 border-green-100 hover:border-green-400"
            onClick={() => navigate("/wizards/erc20")}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            custom={-1}
          >
            <img src="/ERC20.svg" alt="ERC20 Icon" className="w-16 h-16 mb-4" />
            ERC20 Wizard
            <span className="text-base font-normal text-green-500 mt-2">Create and launch ERC20 tokens</span>
          </motion.div>
        </div>
      )}
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};


export default Wizards;