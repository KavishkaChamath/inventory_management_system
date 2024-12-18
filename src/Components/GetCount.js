import React, { useState } from "react";
import { database } from "../Firebase"; // Import your Firebase database instance
import { ref, get } from "firebase/database";

const CountItemsByCategory = () => {
  const [categoryId, setCategoryId] = useState(""); // Category ID or Name input
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [categoryName, setCategoryName] = useState(""); // Category ID or Name input

  // Handle total quantity for a specific category or category ID
  const handleGetTotalQuantity = async () => {
    if (!categoryId) {
      alert("Please enter a category ID or name!");
      return;
    }

    setErrorMessage(""); // Reset error message before search

    try {
      const snapshot = await get(ref(database, `items`));
      if (snapshot.exists()) {
        const items = snapshot.val();
        let foundCategory = false;
        let total = 0;

        // Iterate over items and check if category matches
        for (const key in items) {
          const item = items[key];
          if (item.id && item.id === categoryId) {
            total += parseInt(item.quantity || 0, 10); // Add quantity to total
            setCategoryName(item.category)
            foundCategory = true; // Set match flag
          }
        }

        // If no match was found, show error message
        if (!foundCategory) {
          setErrorMessage("No category found!");
          setTotalQuantity(null); // Clear quantity
        } else {
          setTotalQuantity(total); // Set total quantity
        }
      } else {
        alert("No items found!");
      }
    } catch (error) {
      alert("Error fetching items: " + error.message);
    }
  };

  // Handle total price for all items
  const handleGetTotalPrice = async () => {
    try {
      const snapshot = await get(ref(database, `items`));
      if (snapshot.exists()) {
        const items = snapshot.val();
        const total = calculateTotalPriceRecursive(items);
        setTotalPrice(total.toFixed(2)); // Display total price with 2 decimal places
      } else {
        alert("No items found!");
      }
    } catch (error) {
      alert("Error fetching items: " + error.message);
    }
  };

  // Recursive function to calculate total price
  const calculateTotalPriceRecursive = (items) => {
    let total = 0;

    for (const key in items) {
      const item = items[key];
      if (item.price && item.quantity) {
        total += parseFloat(item.price) * parseInt(item.quantity, 10);
      }
    }
    return total;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Total Quantity and Price</h2>

      {/* Input for category ID or name */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Category ID :
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="Enter Category ID"
          />
        </label>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleGetTotalQuantity}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get Total Quantity
        </button>

        <button
          onClick={handleGetTotalPrice}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get Total Price
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Results */}
      {totalQuantity !== null && totalQuantity !== -1 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Category : {categoryName}</h3>
          <h3>Total Quantity: {totalQuantity}</h3>
        </div>
      )}
      {totalPrice !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total value of products in the inventory.: Rs {totalPrice}/=</h3>
        </div>
      )}
    </div>
  );
};

export default CountItemsByCategory;
