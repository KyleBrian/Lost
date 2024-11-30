const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

function generateCandlestickData(basePrice, timeframe) {
  const open = basePrice + (Math.random() - 0.5) * 0.002 * basePrice;
  const close = basePrice + (Math.random() - 0.5) * 0.002 * basePrice;
  const high = Math.max(open, close) + Math.random() * 0.001 * basePrice;
  const low = Math.min(open, close) - Math.random() * 0.001 * basePrice;
  const volume = Math.floor(Math.random() * 1000000);

  return { open, high, low, close, volume };
}

function generateHistoricalData(pair, timeframe, count) {
  const basePrice = 1.0573; // Example base price for EUR/USD
  const data = [];
  const now = moment();

  for (let i = count - 1; i >= 0; i--) {
    const time = now.clone().subtract(i * timeframe, 'minutes');
    const candlestick = generateCandlestickData(basePrice, timeframe);
    data.push({
      time: time.toISOString(),
      ...candlestick
    });
  }

  return data;
}

function generateRandomData() {
  const basePrice = 1.0573; // Example base price for EUR/USD
  const now = moment();

  return {
    chartData: {
      time: now.toISOString(),
      ...generateCandlestickData(basePrice, 5), // 5-minute candle
    },
    marketData: [
      { pair: "EUR/USD", bid: basePrice - 0.0001, ask: basePrice + 0.0001, spread: 2 },
      { pair: "GBP/USD", bid: 1.2468 + Math.random() * 0.001, ask: 1.2470 + Math.random() * 0.001, spread: 2 },
      { pair: "USD/JPY", bid: 134.56 + Math.random() * 0.1, ask: 134.58 + Math.random() * 0.1, spread: 2 },
      { pair: "USD/CHF", bid: 0.9234 + Math.random() * 0.001, ask: 0.9236 + Math.random() * 0.001, spread: 2 },
    ],
    newsUpdate: {
      id: Date.now(),
      title: "Market Update",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: now.toISOString(),
    },
    sentimentUpdate: {
      twitter: {
        positive: Math.floor(Math.random() * 100),
        neutral: Math.floor(Math.random() * 100),
        negative: Math.floor(Math.random() * 100),
      },
      reddit: {
        positive: Math.floor(Math.random() * 100),
        neutral: Math.floor(Math.random() * 100),
        negative: Math.floor(Math.random() * 100),
      },
    },
    technicalUpdate: [
      { 
        indicator: "MACD", 
        value: (Math.random() - 0.5) * 0.002, 
        interpretation: Math.random() > 0.5 ? "Bullish" : "Bearish" 
      },
      { 
        indicator: "RSI (14)", 
        value: Math.random() * 100, 
        interpretation: (value) => {
          if (value > 70) return "Overbought";
          if (value < 30) return "Oversold";
          return "Neutral";
        }
      },
      { 
        indicator: "Bollinger Bands", 
        value: `Upper: ${(basePrice * 1.002).toFixed(4)}, Lower: ${(basePrice * 0.998).toFixed(4)}`, 
        interpretation: (upper, lower, price) => {
          if (price > upper) return "Overbought";
          if (price < lower) return "Oversold";
          return "Within bands";
        }
      },
      { 
        indicator: "200 EMA", 
        value: basePrice + (Math.random() - 0.5) * 0.002, 
        interpretation: (ema, price) => price > ema ? "Bullish" : "Bearish"
      },
      { 
        indicator: "50 EMA", 
        value: basePrice + (Math.random() - 0.5) * 0.001, 
        interpretation: (ema, price) => price > ema ? "Bullish" : "Bearish"
      }
    ],
    tradeRecommendation: {
      id: Date.now(),
      type: Math.random() > 0.5 ? "BUY" : "SELL",
      pair: "EUR/USD",
      entry: basePrice,
      stopLoss: basePrice * (Math.random() > 0.5 ? 0.998 : 1.002),
      takeProfit: basePrice * (Math.random() > 0.5 ? 1.005 : 0.995),
      reasoning: "Based on current market conditions and technical analysis.",
    },
    economicCalendarUpdate: [
      {
        id: '1',
        date: now.format('YYYY-MM-DD'),
        time: now.add(2, 'hours').format('HH:mm GMT'),
        currency: 'USD',
        event: 'Non-Farm Payrolls',
        impact: 'High',
        forecast: '180K',
        previous: '175K'
      },
      {
        id: '2',
        date: now.add(1, 'day').format('YYYY-MM-DD'),
        time: '12:00 GMT',
        currency: 'EUR',
        event: 'ECB Press Conference',
        impact: 'High',
        forecast: '-',
        previous: '-'
      },
      {
        id: '3',
        date: now.add(2, 'days').format('YYYY-MM-DD'),
        time: '09:30 GMT',
        currency: 'GBP',
        event: 'Retail Sales m/m',
        impact: 'Medium',
        forecast: '0.2%',
        previous: '-0.3%'
      }
    ],
    correlationUpdate: {
      'EUR/USD': { 'EUR/USD': 1, 'GBP/USD': 0.85, 'USD/JPY': -0.65, 'USD/CHF': -0.95 },
      'GBP/USD': { 'EUR/USD': 0.85, 'GBP/USD': 1, 'USD/JPY': -0.55, 'USD/CHF': -0.80 },
      'USD/JPY': { 'EUR/USD': -0.65, 'GBP/USD': -0.55, 'USD/JPY': 1, 'USD/CHF': 0.70 },
      'USD/CHF': { 'EUR/USD': -0.95, 'GBP/USD': -0.80, 'USD/JPY': 0.70, 'USD/CHF': 1 }
    },
    notification: {
      id: Date.now().toString(),
      title: "Market Alert",
      description: `${Math.random() > 0.5 ? 'Bullish' : 'Bearish'} trend detected for EUR/USD`,
      type: Math.random() > 0.5 ? 'info' : 'warning'
    },
    tradeOpportunity: {
      id: Date.now().toString(),
      pair: "EUR/USD",
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      reason: "Strong momentum detected based on recent price action and technical indicators.",
      potentialProfit: Math.random() * 5,
      riskRewardRatio: 1 + Math.random() * 2,
      chart: generateHistoricalData("EUR/USD", 5, 20) // 20 5-minute candles
    }
  };
}

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial data
  const initialData = generateRandomData();
  socket.emit('chartData', initialData.chartData);
  socket.emit('marketData', initialData.marketData);
  socket.emit('newsUpdate', initialData.newsUpdate);
  socket.emit('sentimentUpdate', initialData.sentimentUpdate);
  socket.emit('technicalUpdate', initialData.technicalUpdate);
  socket.emit('tradeRecommendation', initialData.tradeRecommendation);
  socket.emit('economicCalendarUpdate', initialData.economicCalendarUpdate);
  socket.emit('correlationUpdate', initialData.correlationUpdate);
  socket.emit('notification', initialData.notification);
  socket.emit('tradeOpportunity', initialData.tradeOpportunity);

  // Send updates every 5 seconds
  const interval = setInterval(() => {
    const data = generateRandomData();
    socket.emit('chartData', data.chartData);
    socket.emit('marketData', data.marketData);
    socket.emit('newsUpdate', data.newsUpdate);
    socket.emit('sentimentUpdate', data.sentimentUpdate);
    socket.emit('technicalUpdate', data.technicalUpdate);
    socket.emit('tradeRecommendation', data.tradeRecommendation);
    socket.emit('economicCalendarUpdate', data.economicCalendarUpdate);
    socket.emit('correlationUpdate', data.correlationUpdate);
    socket.emit('notification', data.notification);
    socket.emit('tradeOpportunity', data.tradeOpportunity);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

