'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Trade {
  id: number
  pair: string
  type: 'Buy' | 'Sell'
  openPrice: number
  closePrice: number | null
  size: number
  pnl: number | null
}

export function PortfolioTracking() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [pair, setPair] = useState('EUR/USD')
  const [type, setType] = useState<'Buy' | 'Sell'>('Buy')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')

  const addTrade = () => {
    if (price && size) {
      setTrades([...trades, {
        id: Date.now(),
        pair,
        type,
        openPrice: parseFloat(price),
        closePrice: null,
        size: parseFloat(size),
        pnl: null
      }])
      setPrice('')
      setSize('')
    }
  }

  const closeTrade = (id: number) => {
    setTrades(trades.map(trade => {
      if (trade.id === id) {
        const closePrice = parseFloat(prompt('Enter closing price') || '0')
        const pnl = trade.type === 'Buy' 
          ? (closePrice - trade.openPrice) * trade.size
          : (trade.openPrice - closePrice) * trade.size
        return { ...trade, closePrice, pnl }
      }
      return trade
    }))
  }

  const totalPnL = trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Tracking</CardTitle>
        <CardDescription>Track your open positions and trading history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
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
            <div className="flex-1">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => setType(value as 'Buy' | 'Sell')} defaultValue={type}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label htmlFor="size">Size</Label>
              <Input id="size" type="number" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
          </div>
          <Button onClick={addTrade}>Add Trade</Button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Open Positions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Open Price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.filter(trade => trade.closePrice === null).map(trade => (
                <TableRow key={trade.id}>
                  <TableCell>{trade.pair}</TableCell>
                  <TableCell>{trade.type}</TableCell>
                  <TableCell>{trade.openPrice}</TableCell>
                  <TableCell>{trade.size}</TableCell>
                  <TableCell>
                    <Button onClick={() => closeTrade(trade.id)}>Close</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <h3 className="text-lg font-semibold mt-4">Closed Trades</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Open Price</TableHead>
                <TableHead>Close Price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.filter(trade => trade.closePrice !== null).map(trade => (
                <TableRow key={trade.id}>
                  <TableCell>{trade.pair}</TableCell>
                  <TableCell>{trade.type}</TableCell>
                  <TableCell>{trade.openPrice}</TableCell>
                  <TableCell>{trade.closePrice}</TableCell>
                  <TableCell>{trade.size}</TableCell>
                  <TableCell className={trade.pnl && trade.pnl > 0 ? 'text-green-600' : 'text-red-600'}>
                    {trade.pnl?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <strong>Total P&L: </strong>
            <span className={totalPnL > 0 ? 'text-green-600' : 'text-red-600'}>
              {totalPnL.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

