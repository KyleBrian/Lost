'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Socket } from 'socket.io-client'

interface OrderBookEntry {
  price: number
  size: number
}

interface OrderBookData {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

export function OrderBook({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({ bids: [], asks: [] })

  useEffect(() => {
    if (socket) {
      socket.on('orderBook', (newData: OrderBookData) => {
        setOrderBookData(newData)
      })
    }
  }, [socket])

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Order Book: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <h3 className="text-lg font-semibold mb-2 text-green-400">Bids</h3>
            {orderBookData.bids.map((bid, index) => (
              <div key={index} className="flex justify-between text-green-400">
                <span>{bid.price.toFixed(5)}</span>
                <span>{bid.size.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-2">
            <h3 className="text-lg font-semibold mb-2 text-red-400">Asks</h3>
            {orderBookData.asks.map((ask, index) => (
              <div key={index} className="flex justify-between text-red-400">
                <span>{ask.price.toFixed(5)}</span>
                <span>{ask.size.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

