import React from "react";

const FilterButtons = ({ handleShowProfit, handleShowLoss, setShowProfit, setShowLoss }) => {
    return (
        <div className="filter-buttons">
            <button onClick={handleShowProfit} className="delete-button">
                Show Profit
            </button>
            <button onClick={handleShowLoss} className="delete-button">
                Show Loss
            </button>
            <button
                onClick={() => {
                    setShowProfit(false);
                    setShowLoss(false);
                }}
                className="delete-button"
            >
                Show All
            </button>
        </div>
    );
};

export default FilterButtons;