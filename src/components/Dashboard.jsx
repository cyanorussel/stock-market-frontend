import { useState } from "react";
import PropTypes from "prop-types";
import "../Dashboard.css"; // Ensure you have CSS for light and dark themes

export default function Dashboard({ portfolio, recentActivity, onAddClick, onExportClick }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const totalValue = portfolio?.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.quantity,
    0
  ) || 0;
  const totalCost = portfolio.reduce(
    (sum, stock) => sum + stock.purchasePrice * stock.quantity,
    0
  );
  const profitLoss = totalValue - totalCost;
  const percentChange = totalCost === 0 ? 0 : ((profitLoss / totalCost) * 100).toFixed(2);

  return (
    <div className={`dashboard ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-title">Total Value</div>
          <div className="card-value">₹{totalValue.toLocaleString()}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">Profit/Loss</div>
          <div className="card-value" style={{ color: profitLoss >= 0 ? "#00ffe7" : "#ff4e50" }}>
            {profitLoss >= 0 ? "+" : "-"}₹{Math.abs(profitLoss).toLocaleString()}
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">Change (%)</div>
          <div className="card-value" style={{ color: percentChange >= 0 ? "#00ffe7" : "#ff4e50" }}>
            {percentChange}%
          </div>
        </div>
      </div>
      <div className="dashboard-section">
        <div className="section-title">Recent Activity</div>
        <ul className="recent-activity-list">
          {recentActivity.length === 0 && <li>No recent activity.</li>}
          {recentActivity.slice(0, 3).map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>
      <div className="dashboard-section">
        <div className="section-title">Quick Actions</div>
        <div className="dashboard-actions">
          <button className="add-button" onClick={onAddClick}>Add Portfolio</button>
          <button className="edit-button" onClick={onExportClick}>Export CSV</button>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  portfolio: PropTypes.array.isRequired,
  recentActivity: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onExportClick: PropTypes.func,
};
