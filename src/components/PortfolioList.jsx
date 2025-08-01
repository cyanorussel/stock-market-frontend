import PropTypes from "prop-types";
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
    setSelectedStock,
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
                                setSelectedStock={setSelectedStock}
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

PortfolioList.propTypes = {
  portfolios: PropTypes.array.isRequired,
  showProfit: PropTypes.bool.isRequired,
  showLoss: PropTypes.bool.isRequired,
  getProfitLossClass: PropTypes.func.isRequired,
  calculateCurrentValue: PropTypes.func.isRequired,
  calculateInvestedAmount: PropTypes.func.isRequired,
  calculateProfitLossPercentage: PropTypes.func.isRequired,
  handleEditPortfolio: PropTypes.func.isRequired,
  deletePortfolio: PropTypes.func.isRequired,
  handleEditStock: PropTypes.func.isRequired,
  handleDeleteStock: PropTypes.func.isRequired,
  editingPortfolio: PropTypes.object,
  editingStock: PropTypes.object,
  handleSaveEditedStock: PropTypes.func.isRequired,
  setEditingStock: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
};

export default PortfolioList;
