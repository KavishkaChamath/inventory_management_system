import React, { useState } from "react";
import { ref, get, remove } from "firebase/database";
import { database } from "../Firebase";

const DeleteCategoryComponent = () => {
  const [itemId, setItemId] = useState("");
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch item details based on ID
  const fetchItemById = async () => {
    if (!itemId.trim()) {
      setError("Please enter a valid ID.");
      setItemData(null);
      return;
    }

    try {
      const snapshot = await get(ref(database, `items/${itemId}`));
      if (snapshot.exists()) {
        setItemData(snapshot.val());
        setError("");
        setSuccessMessage("");
      } else {
        setError("Item not found with the given ID.");
        setItemData(null);
      }
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Failed to fetch data. Please try again.");
      setItemData(null);
    }
  };

  // Delete item with confirmation
  const deleteItem = async () => {
    if (!itemData) return;

    const userConfirmed = window.confirm(
      `Are you sure you want to delete the item: "${itemData.category}"?`
    );

    if (userConfirmed) {
      try {
        await remove(ref(database, `items/${itemId}`));
        setSuccessMessage(`Item with ID "${itemId}" has been successfully deleted.`);
        setItemData(null);
        setItemId("");
        setError("");
      } catch (err) {
        console.error("Error deleting item:", err);
        setError("Failed to delete the item. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Delete Category from Item</h2>

      <div>
        <label>Enter Item ID:</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Enter Item ID"
        />
        <button onClick={fetchItemById}>Fetch Item</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {itemData && (
        <div>
          <h3>Item Details</h3>
          <p>
            <strong>Category:</strong> {itemData.category}
          </p>
          <p>
            <strong>Price:</strong> {itemData.price}
          </p>
          <p>
            <strong>Current Quantity:</strong> {itemData.quantity}
          </p>
          <p>
            <strong>Date:</strong> {itemData.date}
          </p>

          <button
            onClick={deleteItem}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Delete Item
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteCategoryComponent;
