import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="bg-gray-800 text-gray-300 py-6 text-center mt-8 text-sm"
    >
      &copy; {new Date().getFullYear()} StarkNet Contract Manager. All Rights Reserved.
    </footer>
  );
};

export default Footer;