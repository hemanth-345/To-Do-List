import React, { useState } from "react";

function Logout({ onLogout }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Display a confirmation message and offer to proceed with logout
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    // Perform any logout logic here, e.g., clearing user data from local storage or state
    onLogout(true);
  };

  return (
    <div>
      {showConfirmation ? (
        <div>
          <p>Are you sure you want to logout?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Logout;
