'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CyberpunkCard, CyberpunkCardContent, CyberpunkCardHeader, CyberpunkCardTitle } from "@/components/ui/cyberpunk-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CyberpunkButton } from "@/components/ui/cyberpunk-button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import MarketChart from './MarketChart'
import MarketData from './MarketData'
import NewsFeed from './NewsFeed'
import SentimentAnalysis from './SentimentAnalysis'
import TechnicalIndicators from './TechnicalIndicators'
import TradeRecommendations from './TradeRecommendations'
import RiskManagementCalculator from './RiskManagementCalculator'
import EconomicCalendar from './EconomicCalendar'
import CorrelationMatrix from './CorrelationMatrix'
import { Notifications } from './Notifications'
import { TradeOpportunities } from './TradeOpportunities'
import { AdvancedChart } from './AdvancedChart'
import { Backtesting } from './Backtesting'
import { CustomAlerts } from './CustomAlerts'
import { PortfolioTracking } from './PortfolioTracking'
import { EducationalResources } from './EducationalResources'
import { useSocket } from '../hooks/useSocket'
import { MLPrediction } from './MLPrediction'
import { OrderBook } from './OrderBook'
import { MultiTimeframeAnalysis } from './MultiTimeframeAnalysis'

const forexPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD']

const componentMap: { [key: string]: React.ComponentType<any> } = {
  'Advanced Chart': AdvancedChart,
  'Market Data': MarketData,
  'Technical Indicators': TechnicalIndicators,
  'Trade Recommendations': TradeRecommendations,
  'Trade Opportunities': TradeOpportunities,
  'News Feed': NewsFeed,
  'Sentiment Analysis': SentimentAnalysis,
  'Risk Management': RiskManagementCalculator,
  'Economic Calendar': EconomicCalendar,
  'Correlation Matrix': CorrelationMatrix,
  'Backtesting': Backtesting,
  'Custom Alerts': CustomAlerts,
  'Portfolio Tracking': PortfolioTracking,
  'Educational Resources': EducationalResources,
  'ML Prediction': MLPrediction,
  'Order Book': OrderBook,
  'Multi-timeframe Analysis': MultiTimeframeAnalysis,
}

const defaultLayout = [
  'Advanced Chart',
  'Market Data',
  'Technical Indicators',
  'ML Prediction',
  'Order Book',
  'Multi-timeframe Analysis',
  'Trade Recommendations',
  'Trade Opportunities',
  'Sentiment Analysis',
  'News Feed',
  'Risk Management',
  'Economic Calendar',
  'Correlation Matrix',
  'Backtesting',
  'Custom Alerts',
  'Portfolio Tracking',
  'Educational Resources',
]

const presetLayouts = {
  'Default': defaultLayout,
  'Technical Analyst': ['Advanced Chart', 'Technical Indicators', 'Multi-timeframe Analysis', 'Market Data', 'Correlation Matrix', 'Trade Opportunities'],
  'News Trader': ['Advanced Chart', 'News Feed', 'Sentiment Analysis', 'Economic Calendar', 'Trade Recommendations'],
  'Risk Manager': ['Advanced Chart', 'Risk Management', 'Portfolio Tracking', 'Correlation Matrix', 'Market Data'],
  'AI Trader': ['Advanced Chart', 'ML Prediction', 'Technical Indicators', 'Sentiment Analysis', 'Order Book'],
}

export default function Dashboard() {
  const [selectedPair, setSelectedPair] = useState('EUR/USD')
  const socket = useSocket()
  const [components, setComponents] = useState(() => {
    const savedLayout = localStorage.getItem('dashboardLayout')
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout
  })
  const [visibleComponents, setVisibleComponents] = useState(() => {
    const savedVisibility = localStorage.getItem('dashboardVisibility')
    return savedVisibility ? JSON.parse(savedVisibility) : Object.fromEntries(defaultLayout.map(comp => [comp, true]))
  })
  const [selectedPreset, setSelectedPreset] = useState('Default')

  useEffect(() => {
    if (socket) {
      socket.emit('subscribe', selectedPair)
      return () => {
        socket.emit('unsubscribe', selectedPair)
      }
    }
  }, [selectedPair, socket])

  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(components))
    localStorage.setItem('dashboardVisibility', JSON.stringify(visibleComponents))
  }, [components, visibleComponents])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(components)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setComponents(items)
  }

  const resetLayout = () => {
    setComponents(defaultLayout)
    setVisibleComponents(Object.fromEntries(defaultLayout.map(comp => [comp, true])))
    setSelectedPreset('Default')
  }

  const toggleComponentVisibility = (componentName: string) => {
    setVisibleComponents(prev => ({ ...prev, [componentName]: !prev[componentName] }))
  }

  const applyPresetLayout = (preset: string) => {
    setComponents(presetLayouts[preset as keyof typeof presetLayouts])
    setVisibleComponents(Object.fromEntries(presetLayouts[preset as keyof typeof presetLayouts].map(comp => [comp, true])))
    setSelectedPreset(preset)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold cyberpunk-glow">Leo&Reen</h1>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSelectedPair} defaultValue={selectedPair}>
            <SelectTrigger className="cyberpunk-input w-[180px]">
              <SelectValue placeholder="Select forex pair" />
            </SelectTrigger>
            <SelectContent>
              {forexPairs.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CyberpunkButton>
            Connect Wallet
          </CyberpunkButton>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 p-4 border-r border-primary/20 overflow-y-auto bg-gradient-to-b from-background to-primary/10">
          <div className="space-y-4">
            <Select onValueChange={applyPresetLayout} value={selectedPreset}>
              <SelectTrigger className="cyberpunk-input w-full">
                <SelectValue placeholder="Select layout preset" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(presetLayouts).map((preset) => (
                  <SelectItem key={preset} value={preset}>
                    {preset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CyberpunkButton onClick={resetLayout} className="w-full">Reset Layout</CyberpunkButton>
            <div className="space-y-2">
              {components.map((componentName) => (
                <div key={componentName} className="flex items-center space-x-2">
                  <Switch
                    id={`visibility-${componentName}`}
                    checked={visibleComponents[componentName]}
                    onCheckedChange={() => toggleComponentVisibility(componentName)}
                  />
                  <Label htmlFor={`visibility-${componentName}`}>{componentName}</Label>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-secondary/5">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dashboard">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {components.map((componentName, index) => {
                    if (!visibleComponents[componentName]) return null
                    const Component = componentMap[componentName]
                    return (
                      <Draggable key={componentName} draggableId={componentName} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <CyberpunkCard>
                              <CyberpunkCardHeader>
                                <CyberpunkCardTitle>{componentName}</CyberpunkCardTitle>
                              </CyberpunkCardHeader>
                              <CyberpunkCardContent>
                                <Component pair={selectedPair} socket={socket} />
                              </CyberpunkCardContent>
                            </CyberpunkCard>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>
      <Notifications socket={socket} />
    </div>
  )
}

