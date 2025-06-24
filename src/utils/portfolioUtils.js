// filepath: src/utils/portfolioUtils.js

export const calculateCurrentValue = (portfolio) =>
  portfolio.stocks.reduce((sum, stock) => sum + stock.quantity * stock.currentPrice, 0);

export const calculateInvestedAmount = (portfolio) =>
  portfolio.stocks.reduce((sum, stock) => sum + stock.quantity * stock.purchasePrice, 0);

export const calculateProfitLossPercentage = (portfolio) => {
  const currentValue = calculateCurrentValue(portfolio);
  const investedAmount = calculateInvestedAmount(portfolio);
  return (((currentValue - investedAmount) / investedAmount) * 100).toFixed(2);
};