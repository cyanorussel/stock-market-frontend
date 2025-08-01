import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function PortfolioAnalytics({ portfolio }) {
  // Calculate analytics
  const totalValue = portfolio.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.quantity,
    0
  );
  const totalCost = portfolio.reduce(
    (sum, stock) => sum + stock.purchasePrice * stock.quantity,
    0
  );
  const profitLoss = totalValue - totalCost;
  const percentChange = totalCost === 0 ? 0 : ((profitLoss / totalCost) * 100).toFixed(2);

  // Example chart data (replace with real history if available)
  const chartData = [
    { date: "2025-06-01", value: totalCost * 0.95 },
    { date: "2025-06-10", value: totalCost * 1.05 },
    { date: "2025-06-19", value: totalValue },
  ];

  return (
    <div className="portfolio-analytics" style={{ marginBottom: 32 }}>
      <h2 style={{ color: "#00ffe7", textAlign: "center" }}>Portfolio Analytics</h2>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "24px 0",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        <div>
          <div style={{ fontWeight: 600 }}>Total Value</div>
          <div style={{ color: "#a3ffe7", fontSize: "1.3rem" }}>₹{totalValue.toLocaleString()}</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Profit/Loss</div>
          <div style={{ color: profitLoss >= 0 ? "#00ffe7" : "#ff4e50", fontSize: "1.3rem" }}>
            {profitLoss >= 0 ? "+" : "-"}₹{Math.abs(profitLoss).toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Change (%)</div>
          <div style={{ color: percentChange >= 0 ? "#00ffe7" : "#ff4e50", fontSize: "1.3rem" }}>
            {percentChange}%
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#a3ffe7" />
            <YAxis stroke="#a3ffe7" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00ffe7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

PortfolioAnalytics.propTypes = {
  portfolio: PropTypes.array.isRequired,
};
