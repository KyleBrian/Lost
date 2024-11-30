'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Socket } from 'socket.io-client'

interface IndicatorData {
  indicator: string
  value: number | string
  interpretation: string
}

export default function TechnicalIndicators({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [technicalData, setTechnicalData] = useState<IndicatorData[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('technicalUpdate', (newData: IndicatorData[]) => {
        setTechnicalData(newData)
      })
    }
  }, [socket])

  const getInterpretationColor = (interpretation: string) => {
    if (interpretation.includes('Bullish')) return 'bg-green-500'
    if (interpretation.includes('Bearish')) return 'bg-red-500'
    return 'bg-yellow-500'
  }

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Technical Indicators: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicator</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Interpretation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technicalData.map((data) => (
              <TableRow key={data.indicator}>
                <TableCell>{data.indicator}</TableCell>
                <TableCell>{typeof data.value === 'number' ? data.value.toFixed(2) : data.value}</TableCell>
                <TableCell>
                  <Badge className={getInterpretationColor(data.interpretation)}>{data.interpretation}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

