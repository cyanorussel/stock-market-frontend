// filepath: src/components/PortfolioForm.jsx

import React, { useState } from "react";

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    symbol: initialData.symbol || "",
    quantity: initialData.quantity || "",
    purchasePrice: initialData.purchasePrice || "",
    currentPrice: initialData.currentPrice || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { quantity, purchasePrice, currentPrice } = formData;

    if (!quantity || !purchasePrice || !currentPrice) {
      alert("All fields are required.");
      return;
    }

    if (quantity <= 0 || purchasePrice <= 0 || currentPrice <= 0) {
      alert("Please enter valid positive numbers.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Portfolio Name"
        required
      />
      <input
        type="text"
        name="symbol"
        value={formData.symbol}
        onChange={handleChange}
        placeholder="Stock Symbol"
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        name="purchasePrice"
        value={formData.purchasePrice}
        onChange={handleChange}
        placeholder="Purchase Price"
        required
      />
      <input
        type="number"
        name="currentPrice"
        value={formData.currentPrice}
        onChange={handleChange}
        placeholder="Current Price"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default PortfolioForm;