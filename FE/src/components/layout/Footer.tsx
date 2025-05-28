import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full z-30 bg-gray-800 text-gray-300 py-6 text-center text-sm"
    >
      &copy; {new Date().getFullYear()} StarkNet Contract Manager. All Rights Reserved.
    </footer>
  );
};

export default Footer;