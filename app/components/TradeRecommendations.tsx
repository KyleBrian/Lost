'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Socket } from 'socket.io-client'

interface Recommendation {
  id: number
  type: 'BUY' | 'SELL'
  pair: string
  entry: number
  stopLoss: number
  takeProfit: number
  reasoning: string
}

export default function TradeRecommendations({ pair, so
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('tradeRecommendation', (newRecommendation: Recommendation) => {
        setRecommendations(prevRecs => [newRecommendation, ...prevRecs.slice(0, 4)])
      })
    }
  }, [socket])

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{rec.pair}</CardTitle>
              <Badge variant={rec.type === "BUY" ? "default" : "destructive"}>{rec.type}</Badge>
            </div>
            <CardDescription>Entry: {rec.entry.toFixed(5)} | Stop Loss: {rec.stopLoss.toFixed(5)} | Take Profit: {rec.takeProfit.toFixed(5)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{rec.reasoning}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

