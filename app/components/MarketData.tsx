'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Socket } from 'socket.io-client'

interface MarketDataItem {
  pair: string
  bid: number
  ask: number
  spread: number
}

export default function MarketData({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [marketData, setMarketData] = useState<MarketDataItem[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('marketData', (newData: MarketDataItem[]) => {
        setMarketData(newData)
      })
    }
  }, [socket])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pair</TableHead>
          <TableHead>Bid</TableHead>
          <TableHead>Ask</TableHead>
          <TableHead>Spread</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {marketData.map((data) => (
          <TableRow key={data.pair}>
            <TableCell>{data.pair}</TableCell>
            <TableCell>{data.bid.toFixed(5)}</TableCell>
            <TableCell>{data.ask.toFixed(5)}</TableCell>
            <TableCell>{data.spread}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

