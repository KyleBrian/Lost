'use client'

import { useState, useEffect } from 'react'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Progress } from "@/components/ui/progress"
import { Socket } from 'socket.io-client'

interface SentimentData {
  twitter: { positive: number, neutral: number, negative: number }
  reddit: { positive: number, neutral: number, negative: number }
  news: { positive: number, neutral: number, negative: number }
  overall: { positive: number, neutral: number, negative: number }
}

export default function SentimentAnalysis({ pair, socket }: { pair: string, socket: Socket | null }) {
  const [sentimentData, setSentimentData] = useState<SentimentData>({
    twitter: { positive: 0, neutral: 0, negative: 0 },
    reddit: { positive: 0, neutral: 0, negative: 0 },
    news: { positive: 0, neutral: 0, negative: 0 },
    overall: { positive: 0, neutral: 0, negative: 0 }
  })

  useEffect(() => {
    if (socket) {
      socket.on('sentimentUpdate', (newData: SentimentData) => {
        setSentimentData(newData)
      })
    }
  }, [socket])

  const renderSentimentBar = (data: { positive: number, neutral: number, negative: number }, title: string) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Positive</span>
          <span>{data.positive}%</span>
        </div>
        <Progress value={data.positive} className="bg-green-200" indicatorClassName="bg-green-500" />
        <div className="flex justify-between">
          <span>Neutral</span>
          <span>{data.neutral}%</span>
        </div>
        <Progress value={data.neutral} className="bg-gray-200" indicatorClassName="bg-gray-500" />
        <div className="flex justify-between">
          <span>Negative</span>
          <span>{data.negative}%</span>
        </div>
        <Progress value={data.negative} className="bg-red-200" indicatorClassName="bg-red-500" />
      </div>
    </div>
  )

  return (
    <CyberpunkCard>
      <CyberpunkCardHeader>
        <CyberpunkCardTitle>Sentiment Analysis: {pair}</CyberpunkCardTitle>
      </CyberpunkCardHeader>
      <CyberpunkCardContent>
        {renderSentimentBar(sentimentData.overall, 'Overall Sentiment')}
        {renderSentimentBar(sentimentData.twitter, 'Twitter Sentiment')}
        {renderSentimentBar(sentimentData.reddit, 'Reddit Sentiment')}
        {renderSentimentBar(sentimentData.news, 'News Sentiment')}
      </CyberpunkCardContent>
    </CyberpunkCard>
  )
}

