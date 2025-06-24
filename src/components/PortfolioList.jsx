import React, { useMemo } from "react";
import StockTable from "./StockTable";

const PortfolioList = ({
  portfolios = [], // Default to an empty array to avoid undefined errors
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
  // Memoize the profit/loss class for each portfolio
  const memoizedProfitLossClasses = useMemo(() => {
    return portfolios.map((portfolio) => ({
      id: portfolio._id,
      class: getProfitLossClass(portfolio),
    }));
  }, [portfolios, getProfitLossClass]);

  // Render the component
  if (!portfolios.length) {
    return <div>No portfolios available.</div>;
  }

  return (
    <div className="portfolio-rows">
      {portfolios.map((portfolio) => {
        const profitLossClass = memoizedProfitLossClasses.find(
          (item) => item.id === portfolio._id
        )?.class;

        // Filter portfolios based on showProfit and showLoss
        if (
          (showProfit && profitLossClass !== "profit") ||
          (showLoss && profitLossClass !== "loss")
        ) {
          return null;
        }

        return (
          <div
            key={portfolio._id}
            className={`portfolio ${profitLossClass}`}
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
              {calculateCurrentValue(portfolio).toFixed(2)} <br />
              <strong>INVESTED AMOUNT</strong>: ₹
              {calculateInvestedAmount(portfolio).toFixed(2)}
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
        );
      })}
    </div>
  );
};

export default PortfolioList;