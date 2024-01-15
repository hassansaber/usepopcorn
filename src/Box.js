import { useState } from "react";

const Box = ({ children }) => {
  // ______STATE______ 
  const [isOpen, setIsOpen] = useState(true);



  // ______JSX______ 
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

export default Box