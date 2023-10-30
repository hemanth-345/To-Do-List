import React, { useState } from "react";

function List({ kindOfDay, newListItem, onAddItem , onAddrItem}) {
  const [newItem, setNewItem] = useState("");
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newItem.trim() !== "") {
      // Call the parent component's callback to add the new item
      onAddItem(newItem);
      setNewItem(""); // Clear the input field
    }
  };

  


  // Include this code in your List component or wherever you want to save items
  // In your List.js component or wherever appropriate



  return (
    <div className="box">
      <h1>{kindOfDay}</h1>
      <div className="box">
        {newListItem.map((item, index) => (
          <div className="item" key={index}>
            <input type="checkbox" 
            onChange={(e) => {
              if (e.target.checked) {
                console.log(item);
                onAddrItem(item);
              }
            }}/>
            <p>{item}</p>
          </div>
        ))}
        <form className="item" onSubmit={handleSubmit}>
          <input
            type="text"
            name="newItem"
            placeholder="New Item"
            autoComplete="off"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
}

export default List;
