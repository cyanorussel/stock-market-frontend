import React from "react";

const StockTable = ({
  portfolio = {}, // Default to an empty object to avoid undefined errors
  setSelectedStock,
  editingPortfolio,
  editingStock,
  handleEditStock,
  handleDeleteStock,
  handleSaveEditedStock,
  setEditingStock,
  formData,
  calculateProfitLossPercentage, // Ensure this function is passed as a prop
}) => {
  const stocks = portfolio.stocks || []; // Default to an empty array if stocks is undefined

  if (!stocks.length) {
    return <div>No stocks available in this portfolio.</div>;
  }

  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
          <th>Current Price</th>
          <th>Total Profit/Loss %</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock._id} onClick={() => setSelectedStock(stock)}>
            <td>{stock.symbol || "N/A"}</td>
            <td>{stock.quantity || 0}</td>
            <td>₹{stock.purchasePrice || 0}</td>
            <td>₹{stock.currentPrice || 0}</td>
            <td>
              {calculateProfitLossPercentage
                ? `${calculateProfitLossPercentage(stock)}%`
                : "N/A"}
            </td>
            <td>
              {editingPortfolio === portfolio._id &&
              editingStock === stock._id ? (
                <>
                  <button
                    onClick={() =>
                      handleSaveEditedStock(
                        portfolio._id,
                        stock._id,
                        formData
                      )
                    }
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingStock(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditStock(portfolio._id, stock._id)}
                    className="delete-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStock(portfolio._id, stock._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;