import React from "react";
import Modal from "react-modal";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function StockDetailsModal({ isOpen, onRequestClose, stock }) {
  if (!stock) {
    return null; // Prevent rendering if stock is undefined or null
  }

  // Example price history (replace with real data if available)
  const priceHistory = [
    { date: "2025-06-01", price: stock.purchasePrice || 0 },
    { date: "2025-06-10", price: ((stock.purchasePrice || 0) + (stock.currentPrice || 0)) / 2 },
    { date: "2025-06-19", price: stock.currentPrice || 0 },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Stock Details"
      style={{
        content: {
          background: "#232526",
          color: "#e0e0e0",
          borderRadius: "18px",
          maxWidth: "400px",
          margin: "auto",
          padding: "32px 24px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1000,
        },
      }}
    >
      <h2 style={{ color: "#00ffe7", textAlign: "center" }}>
        {stock.name || "Unknown"} ({stock.symbol || "N/A"})
      </h2>
      <div style={{ margin: "18px 0" }}>
        <div>Quantity: <b>{stock.quantity || 0}</b></div>
        <div>Purchase Price: <b>₹{stock.purchasePrice || 0}</b></div>
        <div>Current Price: <b>₹{stock.currentPrice || 0}</b></div>
        <div>
          Profit/Loss:{" "}
          <b style={{ color: stock.currentPrice >= stock.purchasePrice ? "#00ffe7" : "#ff4e50" }}>
            ₹{(((stock.currentPrice || 0) - (stock.purchasePrice || 0)) * (stock.quantity || 0)).toLocaleString()}
          </b>
        </div>
      </div>
      <div style={{ width: "100%", height: 180, marginBottom: 18 }}>
        <ResponsiveContainer>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#a3ffe7" />
            <YAxis stroke="#a3ffe7" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#00ffe7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button
        className="add-button"
        style={{ width: "100%" }}
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
}





