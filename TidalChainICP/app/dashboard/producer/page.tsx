"use client"

import actor from "@/service/actor"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


// Import icons
import {

  BarChart3,
  Plus,
  Eye,
  Activity,
  Users,
  Grid3X3,
  List,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

// Import shared data
import { 
  getTotalPonds, 
  getTotalCapacity, 
  getTotalCurrentStock, 
  getTotalActiveTokens, 
  getTotalValue 
} from "@/lib/data/ponds"

import { 
  getActiveTokensCount,
  getTotalTokenValue,
  getTokensByStatus
} from "@/lib/data/tokens"

import { 
  getRecentTransactions, 
  formatTransactionTime,
} from "@/lib/data/transactions"


import { 
  getSpeciesRevenue, 
  formatCurrency,
} from "@/lib/data/species"
import { Pond, Token } from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"
import { SpeciesRevenue } from "@/components/declarations/tidal_chain_backend.did"

import { Transaction } from "@/components/declarations/tidal_chain_backend.did"

export default function ProducerDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [tokens, setTokens] = useState<Token[]>([])
  const [ponds, setPonds] = useState<Pond[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [speciesRevenue, setSpeciesRevenue] = useState<SpeciesRevenue[]>([])
  
  useEffect(() => {
    let isMounted = true
    const fetchTokens = async () => {
      try {
        const response = await actor.getTokensData()
        if (isMounted) setTokens(response)
      } catch (error) {
        console.error("Failed to fetch tokens:", error)
      }
    }
    
    fetchTokens()

    const fetchPonds = async () => {
      try {
        const response = await actor.getPondData()
        if (isMounted) setPonds(response)
      } catch (error) {
        console.error("Failed to fetch ponds:", error)
      }
    }
    fetchPonds()

    const fetchTransactions = async () => {
      try {
        const response = await actor.getTransactionsData()
        if (isMounted) setTransactions(response)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      }
    }
    fetchTransactions()

    const fetchSpeciesRevenue = async () => {
      try {
        const response = await actor.getSpeciesRevenueData()
        if (isMounted) setSpeciesRevenue(response)
      } catch (error) {
        console.error("Failed to fetch species revenue:", error)
      }
    }
    fetchSpeciesRevenue()
    return () => { isMounted = false};
  }, [actor])

  // Calculate dashboard stats using shared data
  const totalPonds = getTotalPonds(ponds)
  const totalCapacity = getTotalCapacity(ponds)
  const currentStock = getTotalCurrentStock(ponds)
  const activeTokens = getActiveTokensCount(tokens)
  const totalValue = getTotalTokenValue(tokens)

  // Get recent tokens (last 3)
  const recentTokens = tokens.slice(-3).reverse()

  // Get recent transactions (last 5)
  const recentTransactions = getRecentTransactions(transactions, 5)

  // Get species revenue data
  const speciesRevenueData = getSpeciesRevenue(speciesRevenue)

  // Get tokens by status
  const readySoonTokens = getTokensByStatus(tokens, "Ready Soon")
  const growingTokens = getTokensByStatus(tokens, "Growing")

  // Calculate utilization percentage
  const totalCapacityNum = parseInt(getTotalCapacity(ponds).replace(/[^0-9]/g, ''))
  const currentStockNum = parseInt(getTotalCurrentStock(ponds).replace(/[^0-9]/g, ''))
  const utilizationPercentage = Math.round((currentStockNum / totalCapacityNum) * 100)
  const renderTokenGridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokens.map((token) => (
        <Card key={token.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {token.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={token.image[0] || '/placeholder.png'}
                      alt={token.species}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg">{token.species}</CardTitle>
                  <CardDescription>Token {token.id}</CardDescription>
                </div>
              </div>
              <Badge variant={token.status === "Ready Soon" ? "destructive" : "secondary"}>
                {token.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-medium">{token.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Harvest Date</p>
                <p className="font-medium">{token.harvestDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Days Remaining</p>
                <p className="font-medium">{token.daysRemaining} days</p>
              </div>
              <div>
                <p className="text-gray-600">Funding</p>
                <p className="font-medium">
                  {token.funded} / {token.total}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Growth Progress</span>
                <span>{token.progress}%</span>
              </div>              <Progress value={parseInt(token.progress.toString())} className="h-2" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-gray-100" asChild>
                <Link href="/viewToken">View Details</Link>
              </Button>
              {token.status === "Ready Soon" && (
                <Button size="sm" className="flex-1">
                  Initiate Harvest
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  const renderTokenListView = () => (
    <div className="space-y-4">
      {tokens.map((token) => (
        <Card key={token.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {token.image && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={token.image[0] || '/placeholder.png'}
                      alt={token.species}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{token.species}</h3>
                  <p className="text-sm text-gray-600">
                    Token {token.id} • {token.pond}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{token.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Funding</p>
                  <p className="font-medium">{token.funded}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Harvest Date</p>
                  <p className="font-medium">{token.harvestDate}</p>
                </div>                <Badge variant={token.status === "Ready Soon" ? "destructive" : "secondary"}>
                  {token.status}
                </Badge>
                <div className="flex space-x-2"><Button variant="outline" size="sm" asChild>
                    <Link href="/viewToken">View</Link>
                  </Button>
                  {token.status === "Ready Soon" && <Button size="sm">Harvest</Button>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Good morning! Mario</h1>            <p className="text-gray-600">Manage your ponds, harvests, and earnings — all in one place.</p>
          </div>
          <Button asChild>
            <Link href="/createNewToken">
              <Plus className="h-4 w-4 mr-2" />
              Create New Token
            </Link>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Active Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{activeTokens}</div>
              <p className="text-sm text-green-600 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₱500,231</div>
              <p className="text-sm text-green-600 mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Pending Settlements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{readySoonTokens.length}</div>
              <p className="text-sm text-orange-600 mt-1">{readySoonTokens.length} ready for harvest</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                Average ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">14.2%</div>
              <p className="text-sm text-red-600 mt-1">-1.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="harvests">My Harvests</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Token Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Utilization Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Overall Pond Utilization
                </CardTitle>
                <CardDescription>
                  Current stock capacity across all ponds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{utilizationPercentage}%</p>
                      <p className="text-sm text-gray-600">
                        {currentStock} of {totalCapacity} capacity used
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available Capacity</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {(totalCapacityNum - currentStockNum).toLocaleString()} kg
                      </p>
                    </div>
                  </div>
                  <Progress value={utilizationPercentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pond Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      Pond Status
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/producer/pond">
                        <Eye className="h-4 w-4 mr-2" />
                        View All
                      </Link>
                    </Button>
                  </CardTitle>
                  <CardDescription>Quick overview of your pond conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ponds.map((pond) => (
                    <div key={pond.id} className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium">{pond.name}</p>
                          <p className="text-sm text-gray-600">{pond.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={
                            pond.status === "optimal" ? "bg-green-100 text-green-800" :
                            pond.status === "good" ? "bg-blue-100 text-blue-800" :
                            pond.status === "attention" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {pond.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{pond.utilization}% utilized</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Tokens */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      Recent Tokens
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#harvests">
                        <Eye className="h-4 w-4 mr-2" />
                        View All
                      </Link>
                    </Button>
                  </CardTitle>
                  <CardDescription>Latest tokenized assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTokens.map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium">{token.species}</p>
                          <p className="text-sm text-gray-600">{token.id} • {token.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{token.total}</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={parseInt(token.progress.toString())} className="h-1 w-16" />
                          <span className="text-xs text-gray-600">{token.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {recentTokens.length === 0 && (                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No tokens created yet</p>
                      <Button asChild>
                        <Link href="/createNewToken">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Token
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    Recent Activity
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
                <CardDescription>Latest transactions and token activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => {
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-200 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-bold text-sm text-foreground">{transaction.title}</p>
                          <p className="text-xs text-muted-foreground">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {transaction.amount && (
                          <p className="text-sm font-semibold text-foreground">{transaction.amount}</p>
                        )}
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={
                              transaction.status === "completed" ? "default" : 
                              transaction.status === "pending" ? "secondary" : 
                              "destructive"
                            }
                            className={
                              transaction.status === "completed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" :
                              transaction.status === "pending" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                              "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTransactionTime(transaction.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {recentTransactions.length === 0 && (                  <div className="text-center py-8">
                    <Activity className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground mb-4">No recent activity</p>
                    <Button asChild>
                      <Link href="/createNewToken">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Token
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

          {/* Active Tokens Overview */}
          </TabsContent>
          <TabsContent value="harvests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Harvest Tokens</CardTitle>
                    <CardDescription>Your current tokenized fish harvests</CardDescription>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                  >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid3X3 className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? renderTokenGridView() : renderTokenListView()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Overview */}
          <TabsContent value="revenue" className="space-y-6">
            {/* Keep all your original revenue content here */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue trends over the past 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <div className="relative h-full">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                        <span>₱40000</span>
                        <span>₱30000</span>
                        <span>₱20000</span>
                        <span>₱10000</span>
                        <span>₱0</span>
                      </div>
                      
                      {/* Chart area */}
                      <div className="ml-12 h-full relative">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="66.66" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 66.66 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          
                          {/* Revenue line */}
                          <polyline
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            points="0,180 66,150 133,130 200,110 266,85 333,60 400,40"
                          />
                          
                          {/* Data points */}
                          {[0, 66, 133, 200, 266, 333, 400].map((x, i) => (
                            <circle key={i} cx={x} cy={[180, 150, 130, 110, 85, 60, 40][i]} r="3" fill="#10b981" />
                          ))}
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Species</CardTitle>
                  <CardDescription>Breakdown of earnings by fish type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <div className="relative h-full">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                        <span>₱200k</span>
                        <span>₱150k</span>
                        <span>₱100k</span>
                        <span>₱50k</span>
                        <span>₱0</span>
                      </div>
                      
                      {/* Chart area */}
                      <div className="ml-12 h-full relative">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="speciesGrid" width="133.33" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 133.33 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#speciesGrid)" />
                          
                          {/* Revenue bars with data from centralized source */}
                          {speciesRevenueData.map((species, index) => {
                            const barHeight = (parseInt(species.revenue.toString()) / 200000) * 180; // Scale to 200k max
                            const barX = 40 + (index * 120);
                            const barY = 200 - barHeight;
                            
                            return (
                              <g key={species.id}>
                                {/* Bar */}
                                <rect 
                                  x={barX} 
                                  y={barY} 
                                  width="50" 
                                  height={barHeight} 
                                  fill={species.color.replace('bg-', '#').replace('blue-500', '3b82f6').replace('green-500', '10b981').replace('purple-500', '8b5cf6')}
                                  rx="4" 
                                />
                                
                                {/* Value label on top of bar */}
                                <text 
                                  x={barX + 25} 
                                  y={barY - 8} 
                                  textAnchor="middle" 
                                  className="text-xs font-semibold fill-gray-700"
                                >
                                  {formatCurrency(parseInt(species.revenue.toString()))}
                                </text>
                                
                                {/* Percentage label inside bar */}
                                <text 
                                  x={barX + 25} 
                                  y={barY + 20} 
                                  textAnchor="middle" 
                                  className="text-xs font-medium fill-white"
                                >
                                  {species.percentage}%
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Keep all your original performance content here */}
            <Card>
              <CardHeader>
                <CardTitle>Token Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">24/26</div>
                    <p className="text-sm text-gray-600">Successful Harvests</p>
                    <p className="text-xs text-green-600">92% success rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3.2 days</div>
                    <p className="text-sm text-gray-600">Avg Funding Time</p>
                    <p className="text-xs text-blue-600">-0.8 days vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">78%</div>
                    <p className="text-sm text-gray-600">Investor Retention</p>
                    <p className="text-xs text-purple-600">+5% vs last quarter</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12.5%</div>
                    <p className="text-sm text-gray-600">Avg ROI Delivered</p>
                    <p className="text-xs text-orange-600">+1.2% vs target</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Success Rate</CardTitle>
                  <CardDescription>Performance of your tokenized harvests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <div className="relative h-full">
                      {/* Success Rate Donut Chart */}
                      <div className="flex items-center justify-center h-full">
                        <div className="relative w-48 h-48">
                          <svg className="w-full h-full" viewBox="0 0 200 200">
                            {/* Background circle */}
                            <circle
                              cx="100"
                              cy="100"
                              r="80"
                              fill="none"
                              stroke="#f3f4f6"
                              strokeWidth="20"
                            />
                            {/* Success arc (92%) */}
                            <circle
                              cx="100"
                              cy="100"
                              r="80"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="20"
                              strokeDasharray={`${92 * 5.024} ${(100 - 92) * 5.024}`}
                              strokeDashoffset="125.6"
                              strokeLinecap="round"
                              transform="rotate(-90 100 100)"
                            />
                            {/* Center text */}
                            <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">92%</text>
                            <text x="100" y="115" textAnchor="middle" className="text-sm fill-gray-600">Success Rate</text>
                          </svg>
                        </div>
                      </div>
                      {/* Legend */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>Successful (24)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                          <span>Failed (2)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Speed Trends</CardTitle>
                  <CardDescription>How quickly your tokens get funded</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <div className="relative h-full">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                        <span>5 days</span>
                        <span>4 days</span>
                        <span>3 days</span>
                        <span>2 days</span>
                        <span>1 day</span>
                      </div>
                      
                      {/* Chart area */}
                      <div className="ml-12 h-full relative">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="fundingGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#fundingGrid)" />
                          
                          {/* Funding speed bars */}
                          <rect x="25" y="120" width="30" height="80" fill="#8b5cf6" rx="2" />
                          <rect x="75" y="100" width="30" height="100" fill="#8b5cf6" rx="2" />
                          <rect x="125" y="80" width="30" height="120" fill="#8b5cf6" rx="2" />
                          <rect x="175" y="60" width="30" height="140" fill="#8b5cf6" rx="2" />
                          <rect x="225" y="40" width="30" height="160" fill="#8b5cf6" rx="2" />
                          <rect x="275" y="20" width="30" height="180" fill="#8b5cf6" rx="2" />
                          <rect x="325" y="80" width="30" height="120" fill="#8b5cf6" rx="2" />
                          
                          {/* Value labels on bars */}
                          <text x="40" y="115" textAnchor="middle" className="text-xs fill-white font-medium">4.5</text>
                          <text x="90" y="95" textAnchor="middle" className="text-xs fill-white font-medium">3.8</text>
                          <text x="140" y="75" textAnchor="middle" className="text-xs fill-white font-medium">3.2</text>
                          <text x="190" y="55" textAnchor="middle" className="text-xs fill-white font-medium">2.9</text>
                          <text x="240" y="35" textAnchor="middle" className="text-xs fill-white font-medium">2.1</text>
                          <text x="290" y="15" textAnchor="middle" className="text-xs fill-white font-medium">1.8</text>
                          <text x="340" y="75" textAnchor="middle" className="text-xs fill-white font-medium">3.2</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}