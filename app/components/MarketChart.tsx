'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Socket } from 'socket.io-client'
import { CandlestickChart, CandlestickData } from './CandlestickChart'

export default function MarketChart({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [data, setData] = useState<CandlestickData[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('chartData', (newData: CandlestickData) => {
        setData(prevData => [...prevData.slice(-99), newData])
      })
    }
  }, [socket])

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Market Chart: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <div className="h-[400px] cyberpunk-chart">
          <CandlestickChart data={data} />
        </div>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

