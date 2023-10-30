import React, { useState } from "react";
import List from "./List";
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout"; // Import Logout component



function App() {
  const [items, setItems] = useState([]);
  const [ritems, setrItems]  = useState([]);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication

 

  const handleLogin = (isLoggedIn, items) => {
    if (isLoggedIn) {
      // Handle successful login here, you can access 'items' here
      // For example, you can set 'items' in the state or perform other actions
      setItems(items);
      setrItems([]);
    }
    setAuthenticated(isLoggedIn);
  };

  

  const handleLogout = (iflogout) => {
    // Handle logout logic and set authenticated to false

    if(iflogout){
       console.log("Logout ")
       console.log(items)
       onSaveItems(items,ritems);
       setAuthenticated(false);
    }
  };

  const onSaveItems = (items,ritems) => {
    // Create an array of items to send to the backend
    console.log("On Save Items ");
    console.log(items);

    const itemsToSend = items.filter((item) => !ritems.includes(item));

    console.log("Items to send ");
    console.log(itemsToSend);
  
    // Define the URL of your backend endpoint
    const apiUrl = "/api/save-items"; // Replace with your actual API URL
  
    // Send a POST request to your server
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "items" : itemsToSend }), // Include the email in the request body
    })
      .then((response) => {
        if (response.ok) {
          console.log("Items saved successfully.");
        } else {
          console.error("Failed to save items.");
        }
      })
      .catch((error) => {
        console.error("Error saving items:", error);
      });
  };
  


  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const addrItem = (newItem) => {
    setrItems([...ritems, newItem]);
  };

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const today = new Date();
  const kindOfDay = today.toLocaleDateString("en-US", options);

  return (
    <div className="App">
      {authenticated ? (
        <>
          <List kindOfDay={kindOfDay} newListItem={items} onAddItem={addItem} onAddrItem={addrItem}/>
          <Logout onLogout={handleLogout}  /> {/* Include Logout component */}
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} {...items} />
          <SignUp /> {/* Render SignUp component */}
        </>
      )}
      {/* ... Other components */}
    </div>
  );
}

export default App;
