// ToggleButton.js
import React from 'react';

const ToggleButton = ({ onToggle, isMenuVisible }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 p-4 py-3.5 rounded-[13px] font-[600] duration-200 text-white hover:bg-primary-700 text-sm bg-primary-600 z-[1000]"
    >
      MENU
    </button>
  );
};

export default ToggleButton;
