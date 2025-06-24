import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  const percentChange =
    totalCost === 0 ? 0 : ((profitLoss / totalCost) * 100).toFixed(2);

  // Prepare data for the chart
  const chartData = portfolio.map((stock) => ({
    name: stock.name || "Unknown",
    currentValue: stock.currentPrice * stock.quantity,
    investedAmount: stock.purchasePrice * stock.quantity,
  }));

  return (
    <div>
      <h3>Portfolio Analytics</h3>
      <p>
        <strong>Total Value:</strong> ₹{totalValue.toFixed(2)}
      </p>
      <p>
        <strong>Total Cost:</strong> ₹{totalCost.toFixed(2)}
      </p>
      <p>
        <strong>Profit/Loss:</strong> ₹{profitLoss.toFixed(2)} (
        {percentChange}%)
      </p>

      {/* Render the chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="currentValue"
              stroke="#00ffe7"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="investedAmount"
              stroke="#ff4e50"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}