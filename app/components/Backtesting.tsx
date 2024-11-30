'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Backtesting() {
  const [pair, setPair] = useState('EUR/USD')
  const [strategy, setStrategy] = useState('Moving Average Crossover')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const runBacktest = () => {
    // In a real application, this would call an API to run the backtest
    // For now, we'll just simulate a result
    setResult(`Backtest Results for ${strategy} on ${pair}:
    Start Date: ${startDate}
    End Date: ${endDate}
    Total Trades: 100
    Win Rate: 55%
    Profit Factor: 1.5
    Net Profit: $1,000`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtesting</CardTitle>
        <CardDescription>Test your trading strategies against historical data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="pair">Currency Pair</Label>
            <Select onValueChange={setPair} defaultValue={pair}>
              <SelectTrigger id="pair">
                <SelectValue placeholder="Select currency pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                <SelectItem value="USD/JPY">USD/JPY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="strategy">Strategy</Label>
            <Select onValueChange={setStrategy} defaultValue={strategy}>
              <SelectTrigger id="strategy">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Moving Average Crossover">Moving Average Crossover</SelectItem>
                <SelectItem value="RSI Overbought/Oversold">RSI Overbought/Oversold</SelectItem>
                <SelectItem value="Bollinger Band Breakout">Bollinger Band Breakout</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Button onClick={runBacktest}>Run Backtest</Button>
          {result && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Backtest Results</CardTitle>
              </CardHeader>
              <CardContent>
                <pre>{result}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

