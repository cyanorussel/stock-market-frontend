import React from "react";
import StockTable from "./StockTable";

const PortfolioList = ({
    portfolios,
    showProfit,
    showLoss,
    getProfitLossClass,
    calculateCurrentValue,
    calculateInvestedAmount,
    calculateProfitLossPercentage,
    handleEditPortfolio,
    deletePortfolio,
    handleEditStock,
    handleDeleteStock,
    editingPortfolio,
    editingStock,
    handleSaveEditedStock,
    setEditingStock,
    formData,
}) => {
    return (
        <div className="portfolio-rows">
            {portfolios.map(
                (portfolio) =>
                    ((showProfit && getProfitLossClass(portfolio) === "profit") ||
                        (showLoss && getProfitLossClass(portfolio) === "loss") ||
                        (!showProfit && !showLoss)) && (
                        <div
                            key={portfolio._id}
                            className={`portfolio ${getProfitLossClass(portfolio)}`}
                        >
                            <h3 className="portfolio-name">{portfolio.name}</h3>
                            <StockTable
                                portfolio={portfolio}
                                calculateProfitLossPercentage={calculateProfitLossPercentage}
                                handleEditStock={handleEditStock}
                                handleDeleteStock={handleDeleteStock}
                                editingPortfolio={editingPortfolio}
                                editingStock={editingStock}
                                handleSaveEditedStock={handleSaveEditedStock}
                                setEditingStock={setEditingStock}
                                formData={formData}
                            />
                            <div>
                                <strong>CURRENT VALUE</strong>: ₹
                                {calculateCurrentValue(portfolio).toFixed(2)} ₹
                                {calculateInvestedAmount(portfolio).toFixed(2)} Invested
                            </div>
                            <br />
                            <button
                                onClick={() => deletePortfolio(portfolio._id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEditPortfolio(portfolio)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                        </div>
                    )
            )}
        </div>
    );
};

export default PortfolioList;