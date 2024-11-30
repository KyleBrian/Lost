'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RiskManagementCalculator({ pair }: { pair: string }) {
  const [accountBalance, setAccountBalance] = useState<number>(10000)
  const [riskPercentage, setRiskPercentage] = useState<number>(1)
  const [entryPrice, setEntryPrice] = useState<number>(0)
  const [stopLoss, setStopLoss] = useState<number>(0)
  const [positionSize, setPositionSize] = useState<number>(0)

  const calculatePositionSize = () => {
    const riskAmount = accountBalance * (riskPercentage / 100)
    const priceDifference = Math.abs(entryPrice - stopLoss)
    const calculatedPositionSize = riskAmount / priceDifference
    setPositionSize(Number(calculatedPositionSize.toFixed(2)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Management Calculator</CardTitle>
        <CardDescription>Calculate your position size based on your risk tolerance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountBalance">Account Balance</Label>
              <Input
                id="accountBalance"
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="riskPercentage">Risk Percentage</Label>
              <Input
                id="riskPercentage"
                type="number"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input
                id="stopLoss"
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
              />
            </div>
          </div>
          <Button onClick={calculatePositionSize}>Calculate Position Size</Button>
          {positionSize > 0 && (
            <div className="text-center">
              <p className="text-lg font-semibold">Recommended Position Size:</p>
              <p className="text-2xl font-bold">{positionSize} units</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

