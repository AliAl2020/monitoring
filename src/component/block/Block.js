import Menu from './Menu';
import './Block.css';
import React, { useState } from 'react';

import {  FaMinus, FaPlus } from 'react-icons/fa';




const Block = ({ children}) => {
    
  const { title, content } = children;
  const [isMinimized, setIsMinimized] = useState(false);
  const [newid,setnewid]=useState(`block-${crypto.randomUUID()}`)
  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };



  return (

    <div id={newid} className="block-wrapper row justify-content-md-center">
      <Menu
        title={title}
        onMinimize={handleMinimize}
        
        minimizeIcon={isMinimized ? <FaPlus /> : <FaMinus />}
      />
      <div className={`overflow-auto block-container ${isMinimized ? 'minimized' : ''}`}>
        {!isMinimized && <div className="block-content">{content}</div>}
      </div>
    </div>
    
  );
};

export default Block;