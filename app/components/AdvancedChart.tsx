'use client'

import { useState, useEffect, useRef } from 'react'
import { createChart, IChartApi, ISeriesApi, LineStyle, CrosshairMode } from 'lightweight-charts'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { CyberpunkButton } from "@/components/ui/cyberpunk-button"
import { Socket } from 'socket.io-client'

interface ChartData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

export function AdvancedChart({ pair, socket }: { pair: string, socket: Socket | null }) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const [data, setData] = useState<ChartData[]>([])
  const [timeframe, setTimeframe] = useState('1H')

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        layout: {
          background: { type: 'solid', color: 'hsl(230, 17%, 14%)' },
          textColor: 'hsl(0, 0%, 90%)',
        },
        grid: {
          vertLines: { color: 'hsl(230, 17%, 25%)' },
          horzLines: { color: 'hsl(230, 17%, 25%)' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: 'hsl(230, 17%, 25%)',
        },
        timeScale: {
          borderColor: 'hsl(230, 17%, 25%)',
        },
      })

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: 'hsl(165, 100%, 41%)',
        downColor: 'hsl(333, 71%, 51%)',
        borderVisible: false,
        wickUpColor: 'hsl(165, 100%, 41%)',
        wickDownColor: 'hsl(333, 71%, 51%)',
      })

      chartRef.current = chart
      candlestickSeriesRef.current = candlestickSeries

      // Add indicators
      const macdSeries = chart.addHistogramSeries({
        color: 'hsl(195, 85%, 41%)',
        priceScaleId: 'macd',
        priceFormat: {
          type: 'price',
          precision: 6,
          minMove: 0.00001,
        },
      })
      chart.priceScale('macd').applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })

      const rsiSeries = chart.addLineSeries({
        color: 'hsl(333, 71%, 51%)',
        priceScaleId: 'rsi',
        lineWidth: 2,
      })
      chart.priceScale('rsi').applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })

      const bbUpperSeries = chart.addLineSeries({
        color: 'hsla(0, 0%, 100%, 0.5)',
        lineWidth: 1,
        lineStyle: LineStyle.Dotted,
      })
      const bbLowerSeries = chart.addLineSeries({
        color: 'hsla(0, 0%, 100%, 0.5)',
        lineWidth: 1,
        lineStyle: LineStyle.Dotted,
      })

      const ema200Series = chart.addLineSeries({
        color: 'hsl(333, 71%, 51%)',
        lineWidth: 2,
      })
      const ema50Series = chart.addLineSeries({
        color: 'hsl(195, 85%, 41%)',
        lineWidth: 2,
      })

      return () => {
        chart.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('chartData', (newData: ChartData) => {
        setData(prevData => [...prevData.slice(-99), newData])
      })
    }
  }, [socket])

  useEffect(() => {
    if (candlestickSeriesRef.current) {
      candlestickSeriesRef.current.setData(data)
    }
  }, [data])

  const changeTimeframe = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    // Here you would typically fetch new data for the selected timeframe
    // and update the chart accordingly
  }

  return (
    <CyberpunkCard className="h-full">
      <CyberpunkCardHeader className="flex justify-between items-center">
        <CyberpunkCardTitle>{pair} - {timeframe}</CyberpunkCardTitle>
        <div className="flex space-x-2">
          {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
            <CyberpunkButton
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'default' : 'outline'}
              onClick={() => changeTimeframe(tf)}
            >
              {tf}
            </CyberpunkButton>
          ))}
        </div>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        <div ref={chartContainerRef} className="w-full h-[600px]" />
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

