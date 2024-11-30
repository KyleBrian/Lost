'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Socket } from 'socket.io-client'

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
}

export default function NewsFeed({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('newsUpdate', (newItem: NewsItem) => {
        setNewsItems(prevItems => [newItem, ...prevItems.slice(0, 9)])
      })
    }
  }, [socket])

  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

