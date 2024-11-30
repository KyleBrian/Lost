'use client'

import { useRef, useEffect } from 'react'
import { createChart, IChartApi, CandlestickData as TradingViewCandlestickData } from 'lightweight-charts'

export interface CandlestickData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface CandlestickChartProps {
  data: CandlestickData[]
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: 'solid', color: 'rgba(0, 0, 0, 0.5)' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        crosshair: {
          mode: 0,
        },
        rightPriceScale: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        timeScale: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
      })

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })

      const lineSeries = chart.addLineSeries({
        color: 'rgba(0, 255, 255, 1)',
        lineWidth: 2,
      })

      const mappedData = data.map(item => ({
        ...item,
        time: new Date(item.time).getTime() / 1000,
      }))

      candleSeries.setData(mappedData as TradingViewCandlestickData[])
      lineSeries.setData(mappedData.map(item => ({ time: item.time, value: item.close })))

      chartRef.current = chart

      return () => {
        chart.remove()
      }
    }
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={chartContainerRef} className="w-full h-[400px]" />
}

