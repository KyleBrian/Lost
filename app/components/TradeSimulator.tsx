'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { CyberpunkButton } from "@/components/ui/cyberpunk-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CandlestickChart, CandlestickData } from './CandlestickChart'

interface SimulationResult {
  outcome: 'Profit' | 'Loss'
  pips: number
  percentage: number
}

interface TradeOpportunity {
  id: string
  pair: string
  type: 'BUY' | 'SELL'
  entry: number
  stopLoss: number
  takeProfit: number
  chart: CandlestickData[]
}

export function TradeSimulator({ opportunity }: { opportunity: TradeOpportunity }) {
  const [timeframe, setTimeframe] = useState('1h')
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [simulatedChart, setSimulatedChart] = useState<CandlestickData[]>([])

  const runSimulation = () => {
    // In a real application, this would call an API to run a more sophisticated simulation
    // For now, we'll use a simple random simulation
    const isProfit = Math.random() > 0.4 // 60% chance of profit
    const pips = Math.floor(Math.random() * 50) + 1 // 1 to 50 pips
    const percentage = (pips / 10000) * 100 // Convert pips to percentage

    setResult({
      outcome: isProfit ? 'Profit' : 'Loss',
      pips: isProfit ? pips : -pips,
      percentage: isProfit ? percentage : -percentage
    })

    // Generate simulated chart data
    const simulatedData = [...opportunity.chart]
    const periods = timeframe === '1h' ? 12 : 48 // 12 5-minute candles for 1h, 48 for 4h
    for (let i = 0; i < periods; i++) {
      const lastCandle = simulatedData[simulatedData.length - 1]
      const newCandle = generateNextCandle(lastCandle, isProfit)
      simulatedData.push(newCandle)
    }
    setSimulatedChart(simulatedData)
  }

  const generateNextCandle = (prevCandle: CandlestickData, trending: boolean): CandlestickData => {
    const trend = trending ? 1 : -1
    const volatility = 0.0005 // Adjust this for more or less volatile simulations
    const open = prevCandle.close
    const close = open + (Math.random() * volatility * trend)
    const high = Math.max(open, close) + (Math.random() * volatility)
    const low = Math.min(open, close) - (Math.random() * volatility)
    return {
      time: new Date(new Date(prevCandle.time).getTime() + 5 * 60000).toISOString(), // Add 5 minutes
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000)
    }
  }

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Trade Simulator: {opportunity.pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="timeframe">Timeframe:</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger id="timeframe" className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="4h">4 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CyberpunkButton onClick={runSimulation}>Run Simulation</CyberpunkButton>
          {result && (
            <div className={`p-4 border rounded-lg ${result.outcome === 'Profit' ? 'border-green-500' : 'border-red-500'}`}>
              <h3 className={`text-lg font-semibold ${result.outcome === 'Profit' ? 'text-green-500' : 'text-red-500'}`}>
                {result.outcome}: {Math.abs(result.pips)} pips ({Math.abs(result.percentage).toFixed(2)}%)
              </h3>
              <p className="mt-2">
                This simulation suggests a potential {result.outcome.toLowerCase()} of {Math.abs(result.pips)} pips 
                ({Math.abs(result.percentage).toFixed(2)}%) based on the current market conditions and the 
                {opportunity.type.toLowerCase()} opportunity for {opportunity.pair}.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Note: This is a simulated result and does not guarantee actual market performance. Always manage your risk carefully.
              </p>
            </div>
          )}
          <div className="h-[400px]">
            <CandlestickChart data={simulatedChart} />
          </div>
        </div>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

