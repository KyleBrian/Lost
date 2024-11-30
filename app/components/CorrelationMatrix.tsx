'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Socket } from 'socket.io-client'

interface CorrelationData {
  [key: string]: { [key: string]: number }
}

export default function CorrelationMatrix({ socket }: { socket: Socket | null }) {
  const [correlationData, setCorrelationData] = useState<CorrelationData>({})

  useEffect(() => {
    if (socket) {
      socket.on('correlationUpdate', (newData: CorrelationData) => {
        setCorrelationData(newData)
      })
    }
  }, [socket])

  const getCorrelationColor = (value: number) => {
    if (value >= 0.7) return 'bg-green-500 text-white'
    if (value >= 0.5) return 'bg-green-300'
    if (value >= 0.3) return 'bg-green-100'
    if (value >= -0.3) return 'bg-gray-100'
    if (value >= -0.5) return 'bg-red-100'
    if (value >= -0.7) return 'bg-red-300'
    return 'bg-red-500 text-white'
  }

  const currencyPairs = Object.keys(correlationData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Correlation Matrix</CardTitle>
        <CardDescription>Currency pair correlations to identify potential opportunities or risks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              {currencyPairs.map((pair) => (
                <TableHead key={pair}>{pair}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencyPairs.map((pair1) => (
              <TableRow key={pair1}>
                <TableCell className="font-medium">{pair1}</TableCell>
                {currencyPairs.map((pair2) => (
                  <TableCell
                    key={`${pair1}-${pair2}`}
                    className={getCorrelationColor(correlationData[pair1][pair2])}
                  >
                    {correlationData[pair1][pair2].toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

