import PropTypes from "prop-types";

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

FilterButtons.propTypes = {
  handleShowProfit: PropTypes.func.isRequired,
  handleShowLoss: PropTypes.func.isRequired,
  setShowProfit: PropTypes.func.isRequired,
  setShowLoss: PropTypes.func.isRequired,
};

export default FilterButtons;
