import PropTypes from "prop-types";
import Modal from "react-modal";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

Modal.setAppElement("#root"); // Only once in your app

export default function StockDetailsModal({ isOpen, onRequestClose, stock }) {
  if (!stock) {
    console.error("Stock is undefined or null in StockDetailsModal.");
    return null;
  }

  console.log("Stock passed to modal:", stock);

  // Example price history (replace with real data if available)
  const priceHistory = [
    { date: "2025-06-01", price: stock.purchasePrice },
    { date: "2025-06-10", price: (stock.purchasePrice + stock.currentPrice) / 2 },
    { date: "2025-06-19", price: stock.currentPrice },
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
        {stock.name} ({stock.symbol})
      </h2>
      <div style={{ margin: "18px 0" }}>
        <div>Quantity: <b>{stock.quantity}</b></div>
        <div>Purchase Price: <b>₹{stock.purchasePrice}</b></div>
        <div>Current Price: <b>₹{stock.currentPrice}</b></div>
        <div>
          Profit/Loss:{" "}
          <b style={{ color: stock.currentPrice >= stock.purchasePrice ? "#00ffe7" : "#ff4e50" }}>
            ₹{((stock.currentPrice - stock.purchasePrice) * stock.quantity).toLocaleString()}
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

StockDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  stock: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }),
};

