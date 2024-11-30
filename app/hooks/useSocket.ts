import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001')

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [])

  return socket
}

