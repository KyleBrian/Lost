'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Socket } from 'socket.io-client'

interface TimeframeData {
  timeframe: string
  trend: 'Bullish' | 'Bearish' | 'Neutral'
  support: number
  resistance: number
  keyLevels: string
}

export function MultiTimeframeAnalysis({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [timeframeData, setTimeframeData] = useState<TimeframeData[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('multiTimeframeUpdate', (newData: TimeframeData[]) => {
        setTimeframeData(newData)
      })
    }
  }, [socket])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Bullish':
        return 'bg-green-500'
      case 'Bearish':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Multi-timeframe Analysis: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timeframe</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Support</TableHead>
              <TableHead>Resistance</TableHead>
              <TableHead>Key Levels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeframeData.map((data) => (
              <TableRow key={data.timeframe}>
                <TableCell>{data.timeframe}</TableCell>
                <TableCell>
                  <Badge className={getTrendColor(data.trend)}>{data.trend}</Badge>
                </TableCell>
                <TableCell>{data.support.toFixed(5)}</TableCell>
                <TableCell>{data.resistance.toFixed(5)}</TableCell>
                <TableCell>{data.keyLevels}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

