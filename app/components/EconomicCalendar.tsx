'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Socket } from 'socket.io-client'

interface EconomicEvent {
  id: string
  date: string
  time: string
  currency: string
  event: string
  impact: 'Low' | 'Medium' | 'High'
  forecast: string
  previous: string
}

export default function EconomicCalendar({ socket }: { socket: Socket | null }) {
  const [events, setEvents] = useState<EconomicEvent[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('economicCalendarUpdate', (newEvents: EconomicEvent[]) => {
        setEvents(newEvents)
      })
    }
  }, [socket])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low':
        return 'bg-yellow-500'
      case 'Medium':
        return 'bg-orange-500'
      case 'High':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Economic Calendar</CardTitle>
        <CardDescription>Upcoming economic events that may impact forex markets</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Forecast</TableHead>
              <TableHead>Previous</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.currency}</TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>
                  <Badge className={getImpactColor(event.impact)}>{event.impact}</Badge>
                </TableCell>
                <TableCell>{event.forecast}</TableCell>
                <TableCell>{event.previous}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

