'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Badge } from "@/components/ui/badge"
import { CyberpunkButton } from "@/components/ui/cyberpunk-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Socket } from 'socket.io-client'
import { TradeSimulator } from './TradeSimulator'
import { CandlestickChart, CandlestickData } from './CandlestickChart'

interface TradeOpportunity {
  id: string
  pair: string
  type: 'BUY' | 'SELL'
  entry: number
  stopLoss: number
  takeProfit: number
  reason: string
  potentialProfit: number
  riskRewardRatio: number
  chart: CandlestickData[]
}

export function TradeOpportunities({ socket }: { socket: Socket | null }) {
  const [opportunities, setOpportunities] = useState<TradeOpportunity[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('tradeOpportunity', (opportunity: TradeOpportunity) => {
        setOpportunities(prev => [opportunity, ...prev.slice(0, 4)])
      })
    }
  }, [socket])

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Trade Opportunities</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <CyberpunkCard key={opportunity.id}>
              <CyberpunkCardHeader>
                <div className="flex justify-between items-center">
                  <CyberpunkCardTitle>{opportunity.pair}</CyberpunkCardTitle>
                  <Badge variant={opportunity.type === 'BUY' ? 'default' : 'destructive'}>{opportunity.type}</Badge>
                </div>
              </CyberpunkCardHeader>
              <CyberpunkCardContent>
                <p className="mb-2">{opportunity.reason}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>Entry: {opportunity.entry.toFixed(5)}</div>
                  <div>Stop Loss: {opportunity.stopLoss.toFixed(5)}</div>
                  <div>Take Profit: {opportunity.takeProfit.toFixed(5)}</div>
                  <div>Potential Profit: {opportunity.potentialProfit.toFixed(2)}%</div>
                  <div>Risk/Reward: {opportunity.riskRewardRatio.toFixed(2)}</div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <CyberpunkButton>View Chart</CyberpunkButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>{opportunity.pair} Chart</DialogTitle>
                        <DialogDescription>Recent price action and opportunity analysis</DialogDescription>
                      </DialogHeader>
                      <div className="h-[400px]">
                        <CandlestickChart data={opportunity.chart} />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <CyberpunkButton variant="outline">Simulate Trade</CyberpunkButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Trade Simulation</DialogTitle>
                        <DialogDescription>Simulate potential outcomes for this trade opportunity</DialogDescription>
                      </DialogHeader>
                      <TradeSimulator opportunity={opportunity} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CyberpunkCardContent>
            </CyberpunkCard>
          ))}
        </div>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

