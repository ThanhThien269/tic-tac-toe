import React from "react";

const Cell = ({ cell, id, go, setGo, cells, setCells, winMsg,setMessage}) => {
  const handleClick = (e) => {
    if (!winMsg) {
      const firstChild = e.target.firstChild;

     
      const taken =
        firstChild?.classList.contains("circle") ||
        firstChild?.classList.contains("cross");
        if(!firstChild){
            setMessage("This box is selected! Choose another box.");
            return;
        }
      if (!taken) {
        if (go === "circle") {
          firstChild.classList.add("circle");
          handleCellChange("circle");
          setGo("cross");
          setMessage("It's circle turn.");
        } else if (go === "cross") {
          firstChild.classList.add("cross");
          handleCellChange("cross");
          setGo("circle");
          setMessage("It's cross turn.");
        }
      }
    }
  };

  const handleCellChange = (className) => {
    const nextCells = cells.map((cell, index) => {
      if (index === id) {
        return className;
      } else {
        return cell;
      }
    });
    setCells(nextCells);
  };

  return (
    <div className="square" id={id} onClick={handleClick}>
      <div className={cell}></div>
    </div>
  );
};

export default Cell;