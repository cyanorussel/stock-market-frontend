//App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PortfolioList from "./components/PortfolioList";
import FilterButtons from "./components/FilterButtons";
import ThemeToggle from "./components/ThemeToggle";
import StockDetailsModal from "./components/StockDetailsModal";
import PortfolioAnalytics from "./components/PortfolioAnalytics";
import Dashboard from "./components/Dashboard";

const App = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        currentPrice: "",
    });
    const [loading, setLoading] = useState(true);
    const [editingPortfolio, setEditingPortfolio] = useState(null);
    const [showProfit, setShowProfit] = useState(false);
    const [showLoss, setShowLoss] = useState(false);
    const [editingStock, setEditingStock] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/portfolios");
                setPortfolios(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
                setLoading(false);
            }
        };
        fetchPortfolios();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="container">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <h1 className="title">Stock Portfolio Tracker</h1>
            <FilterButtons
                handleShowProfit={() => setShowProfit(true)}
                handleShowLoss={() => setShowLoss(true)}
                setShowProfit={setShowProfit}
                setShowLoss={setShowLoss}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <PortfolioList
                    portfolios={portfolios}
                    showProfit={showProfit}
                    showLoss={showLoss}
                    getProfitLossClass={(portfolio) =>
                        calculateCurrentValue(portfolio) - calculateInvestedAmount(portfolio) >= 0
                            ? "profit"
                            : "loss"
                    }
                    calculateCurrentValue={(portfolio) =>
                        portfolio.stocks.reduce(
                            (sum, stock) => sum + stock.quantity * stock.currentPrice,
                            0
                        )
                    }
                    calculateInvestedAmount={(portfolio) =>
                        portfolio.stocks.reduce(
                            (sum, stock) => sum + stock.quantity * stock.purchasePrice,
                            0
                        )
                    }
                    calculateProfitLossPercentage={(portfolio) => {
                        const currentValue = calculateCurrentValue(portfolio);
                        const investedAmount = calculateInvestedAmount(portfolio);
                        return (((currentValue - investedAmount) / investedAmount) * 100).toFixed(2);
                    }}
                    handleEditPortfolio={setEditingPortfolio}
                    deletePortfolio={(id) =>
                        setPortfolios(portfolios.filter((portfolio) => portfolio._id !== id))
                    }
                    handleEditStock={setEditingStock}
                    handleDeleteStock={(portfolioId, stockId) =>
                        setPortfolios(
                            portfolios.map((portfolio) =>
                                portfolio._id === portfolioId
                                    ? {
                                          ...portfolio,
                                          stocks: portfolio.stocks.filter(
                                              (stock) => stock._id !== stockId
                                          ),
                                      }
                                    : portfolio
                            )
                        )
                    }
                    editingPortfolio={editingPortfolio}
                    editingStock={editingStock}
                    handleSaveEditedStock={(portfolioId, stockId, updatedStock) =>
                        setPortfolios(
                            portfolios.map((portfolio) =>
                                portfolio._id === portfolioId
                                    ? {
                                          ...portfolio,
                                          stocks: portfolio.stocks.map((stock) =>
                                              stock._id === stockId ? updatedStock : stock
                                          ),
                                      }
                                    : portfolio
                            )
                        )
                    }
                    setEditingStock={setEditingStock}
                    formData={formData}
                />
            )}
            <PortfolioAnalytics portfolio={portfolios} />
            <Dashboard portfolio={portfolios} recentActivity={recentActivity} />
            <StockDetailsModal
                isOpen={!!selectedStock}
                onRequestClose={() => setSelectedStock(null)}
                stock={selectedStock}
            />
        </div>
    );
};

export default App;