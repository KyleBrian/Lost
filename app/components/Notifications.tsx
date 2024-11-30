'use client'

import { useState, useEffect } from 'react'
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Socket } from 'socket.io-client'

interface Notification {
  id: string
  title: string
  description: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const quotes = [
  "The trend is your friend.",
  "Cut your losses and let your profits run.",
  "Don't put all your eggs in one basket.",
  "Buy the rumor, sell the news.",
  "The market can remain irrational longer than you can remain solvent."
]

export function Notifications({ socket }: { socket: Socket | null }) {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (socket) {
      socket.on('notification', (notification: Notification) => {
        setNotifications(prev => [...prev, notification])
        toast({
          title: notification.title,
          description: notification.description,
          variant: notification.type === 'error' ? 'destructive' : 'default',
        })
      })

      // Random quotes every 5 minutes
      const quoteInterval = setInterval(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        toast({
          title: "Trader's Wisdom",
          description: randomQuote,
        })
      }, 5 * 60 * 1000)

      return () => {
        clearInterval(quoteInterval)
      }
    }
  }, [socket, toast])

  return (
    <ToastProvider>
      {notifications.map((notification) => (
        <Toast key={notification.id}>
          <div className="grid gap-1">
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm text-muted-foreground">{notification.description}</div>
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

