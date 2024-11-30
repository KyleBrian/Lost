'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Alert {
  id: number
  pair: string
  condition: string
  value: number
}

export function CustomAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [pair, setPair] = useState('EUR/USD')
  const [condition, setCondition] = useState('above')
  const [value, setValue] = useState('')

  const addAlert = () => {
    if (value) {
      setAlerts([...alerts, { id: Date.now(), pair, condition, value: parseFloat(value) }])
      setValue('')
    }
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Alerts</CardTitle>
        <CardDescription>Set up price alerts for your favorite currency pairs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="pair">Currency Pair</Label>
              <Select onValueChange={setPair} defaultValue={pair}>
                <SelectTrigger id="pair">
                  <SelectValue placeholder="Select currency pair" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                  <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                  <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="condition">Condition</Label>
              <Select onValueChange={setCondition} defaultValue={condition}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="value">Value</Label>
              <Input id="value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
          <Button onClick={addAlert}>Add Alert</Button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          {alerts.map(alert => (
            <div key={alert.id} className="flex justify-between items-center mt-2">
              <span>{alert.pair} {alert.condition} {alert.value}</span>
              <Button variant="destructive" onClick={() => removeAlert(alert.id)}>Remove</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

