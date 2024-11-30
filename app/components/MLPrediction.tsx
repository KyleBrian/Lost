'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Socket } from 'socket.io-client'

interface PredictionData {
  timestamp: number
  actual: number
  predicted: number
}

export function MLPrediction({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [predictionData, setPredictionData] = useState<PredictionData[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('mlPrediction', (newData: PredictionData) => {
        setPredictionData(prevData => [...prevData.slice(-19), newData])
      })
    }
  }, [socket])

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>ML-based Price Prediction: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 17%, 25%)" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
              stroke="hsl(0, 0%, 90%)"
            />
            <YAxis stroke="hsl(0, 0%, 90%)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(230, 17%, 18%)', border: '1px solid hsl(230, 17%, 25%)' }}
              labelStyle={{ color: 'hsl(0, 0%, 90%)' }}
            />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="hsl(195, 85%, 41%)" name="Actual Price" />
            <Line type="monotone" dataKey="predicted" stroke="hsl(333, 71%, 51%)" name="Predicted Price" />
          </LineChart>
        </ResponsiveContainer>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

