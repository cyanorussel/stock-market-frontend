import React from "react";

const StockTable = ({
    portfolio,
    calculateProfitLossPercentage,
    handleEditStock,
    handleDeleteStock,
    editingPortfolio,
    editingStock,
    handleSaveEditedStock,
    setEditingStock,
    formData,
    setSelectedStock,
}) => {
    const stocks = portfolio.stocks || []; // Fallback for undefined stocks

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
                        <td>{stock.symbol}</td>
                        <td>{stock.quantity}</td>
                        <td>₹{stock.purchasePrice}</td>
                        <td>₹{stock.currentPrice}</td>
                        <td>{calculateProfitLossPercentage(portfolio)}%</td>
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
                                        onClick={() =>
                                            handleEditStock(portfolio._id, stock._id)
                                        }
                                        className="delete-button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteStock(portfolio._id, stock._id)
                                        }
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