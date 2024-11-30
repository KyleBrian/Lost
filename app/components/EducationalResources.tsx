'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const forexBasics = [
  {
    question: "What is Forex trading?",
    answer: "Forex trading, also known as foreign exchange trading or currency trading, is the act of buying and selling currencies on the foreign exchange market with the aim of making a profit."
  },
  {
    question: "What are currency pairs?",
    answer: "Currency pairs are the quotation of two different currencies, with the value of one currency being quoted against the other. The first currency of a currency pair is called the base currency, and the second currency is called the quote currency."
  },
  {
    question: "What is a pip in Forex trading?",
    answer: "A pip, which stands for 'percentage in point' or 'price interest point', is the smallest price move that a given exchange rate makes based on market convention. Most currency pairs are priced to four decimal places and the pip is the last decimal point."
  }
]

const technicalAnalysis = [
  {
    question: "What is technical analysis?",
    answer: "Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume."
  },
  {
    question: "What are some common technical indicators?",
    answer: "Common technical indicators include Moving Averages, Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), Bollinger Bands, and Fibonacci retracements."
  },
  {
    question: "What is a trend in technical analysis?",
    answer: "A trend is the overall direction of a market or an asset's price. In technical analysis, trends are identified by trendlines or price action that shows the upward or downward movement of an asset's price."
  }
]

const riskManagement = [
  {
    question: "What is risk management in Forex trading?",
    answer: "Risk management in Forex trading refers to the identification, analysis, and acceptance or mitigation of uncertainty in investment decisions. It involves using stop-loss orders, position sizing, and other techniques to limit potential losses."
  },
  {
    question: "What is a stop-loss order?",
    answer: "A stop-loss order is a type of order placed with a broker to sell a security when it reaches a certain price. It is designed to limit an investor's loss on a position in a security."
  },
  {
    question: "What is the importance of position sizing?",
    answer: "Position sizing is crucial in risk management as it determines how much of your capital you risk on each trade. Proper position sizing helps ensure that a string of losses doesn't significantly deplete your trading account."
  }
]

export function EducationalResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Resources</CardTitle>
        <CardDescription>Learn about Forex trading, technical analysis, and risk management</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forex">
          <TabsList>
            <TabsTrigger value="forex">Forex Basics</TabsTrigger>
            <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
          </TabsList>
          <TabsContent value="forex">
            <Accordion type="single" collapsible>
              {forexBasics.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="technical">
            <Accordion type="single" collapsible>
              {technicalAnalysis.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="risk">
            <Accordion type="single" collapsible>
              {riskManagement.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

