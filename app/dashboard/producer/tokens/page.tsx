"use client"


// This page retrieves tokens from the motoko backend
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Fish,
  Calendar,
  TrendingUp,
  BarChart3,
  Plus,
  Grid,
  List,
  Eye,
  DollarSign,
  Clock,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { Token } from "@/components/declarations/tidal_chain_backend.did"
import { serviceMakeActor } from "@/service/actor"

import { canisterId as frontendCanisterId } from "@/components/declarations/tidal_chain_assets"

export default function MyTokensPage() {
  const [ sharedTokens, setSharedTokens ] = useState<Token[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const actor = serviceMakeActor()

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokens = await actor.getTokensData()
        setSharedTokens(tokens)
      } catch (error) {
        console.error("Failed to fetch tokens:", error)
      }
    }
    fetchTokens()
  })
  
  // Map shared tokens data to match the page's expected format
  const tokens = sharedTokens.map((token, index) => ({
    id: token.id,
    species: token.species,
    pond: token.pond === "pond-a" ? "Pond A" : token.pond === "pond-b" ? "Pond B" : "Pond C",
    location: token.pond === "pond-a" ? "North Sector" : token.pond === "pond-b" ? "East Sector" : "South Sector",
    quantity: token.quantity,
    harvestDate: token.harvestDate,
    progress: token.progress,
    status: token.status,
    funded: parseInt(token.funded.replace(/[₱,]/g, '')),
    total: parseInt(token.total.replace(/[₱,]/g, '')),
    daysRemaining: token.daysRemaining,
    investors: index === 0 ? 8 : index === 1 ? 12 : 15, // Mock data for additional fields
    avgReturn: index === 0 ? "12.5%" : index === 1 ? "15.2%" : "10.8%",
    riskLevel: index === 0 ? "Low" : index === 1 ? "Low" : "Medium",
    createdDate: index === 0 ? "2024-01-15" : index === 1 ? "2024-01-08" : "2024-02-01",
    lastUpdate: index === 0 ? "2 hours ago" : index === 1 ? "1 hour ago" : "3 hours ago",
    image: token.image,
  }))

  // Mock data for performance charts
  const performanceData = [
    { month: "Jan", growth: 15, funding: 12000, investors: 3, value: 18000 },
    { month: "Feb", growth: 28, funding: 24000, investors: 5, value: 22000 },
    { month: "Mar", growth: 42, funding: 35000, investors: 8, value: 28000 },
    { month: "Apr", growth: 58, funding: 48000, investors: 12, value: 35000 },
    { month: "May", growth: 75, funding: 62000, investors: 15, value: 42000 },
    { month: "Jun", growth: 85, funding: 75000, investors: 18, value: 48000 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 8500, profit: 2100, expenses: 6400 },
    { month: "Feb", revenue: 12300, profit: 3200, expenses: 9100 },
    { month: "Mar", revenue: 18700, profit: 5400, expenses: 13300 },
    { month: "Apr", revenue: 24500, profit: 7800, expenses: 16700 },
    { month: "May", revenue: 31200, profit: 10500, expenses: 20700 },
    { month: "Jun", revenue: 38900, profit: 13200, expenses: 25700 },
  ]

  const riskData = [
    { month: "Jan", lowRisk: 60, mediumRisk: 30, highRisk: 10 },
    { month: "Feb", lowRisk: 65, mediumRisk: 25, highRisk: 10 },
    { month: "Mar", lowRisk: 70, mediumRisk: 22, highRisk: 8 },
    { month: "Apr", lowRisk: 68, mediumRisk: 25, highRisk: 7 },
    { month: "May", lowRisk: 72, mediumRisk: 20, highRisk: 8 },
    { month: "Jun", lowRisk: 75, mediumRisk: 18, highRisk: 7 },
  ]

  const tokenMetricsData = [
    { month: "Jan", totalTokens: 2, activeTokens: 2, completedTokens: 0, avgReturn: 8.5 },
    { month: "Feb", totalTokens: 3, activeTokens: 3, completedTokens: 0, avgReturn: 9.2 },
    { month: "Mar", totalTokens: 4, activeTokens: 4, completedTokens: 0, avgReturn: 10.1 },
    { month: "Apr", totalTokens: 5, activeTokens: 4, completedTokens: 1, avgReturn: 11.8 },
    { month: "May", totalTokens: 6, activeTokens: 5, completedTokens: 1, avgReturn: 12.3 },
    { month: "Jun", totalTokens: 6, activeTokens: 4, completedTokens: 2, avgReturn: 13.1 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready Soon":
        return "bg-green-100 text-green-800"
      case "Growing":
        return "bg-blue-100 text-blue-800"
      case "Funding":
        return "bg-yellow-100 text-yellow-800"
      case "Harvested":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready Soon":
        return <CheckCircle className="h-4 w-4" />
      case "Growing":
        return <Activity className="h-4 w-4" />
      case "Funding":
        return <DollarSign className="h-4 w-4" />
      case "Harvested":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredTokens = statusFilter === "all" ? tokens : tokens.filter((token) => token.status === statusFilter)

  const totalValue = tokens.reduce((sum, token) => sum + token.total, 0)
  const totalFunded = tokens.reduce((sum, token) => sum + token.funded, 0)
  const avgProgress = tokens.reduce((sum, token) => sum + parseInt(token.progress.toString()), 0) / tokens.length

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tokens</h1>
            <p className="text-gray-600">Manage and monitor all your fish harvest tokens</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/producer/pond">
                <Eye className="h-4 w-4 mr-2" />
                My Pond
              </Link>
            </Button>
            <Button asChild>
              <Link href="/createNewToken">
                <Plus className="h-4 w-4 mr-2" />
                Create Token
              </Link>
            </Button>
          </div>
        </div>
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              <Fish className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokens.length}</div>
              <p className="text-xs text-muted-foreground">Active harvest tokens</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">₱{totalFunded.toLocaleString()} funded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(avgProgress)}%</div>
              <p className="text-xs text-muted-foreground">Across all tokens</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready Soon</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokens.filter((token) => token.status === "Ready Soon").length}</div>
              <p className="text-xs text-muted-foreground">Tokens ready for harvest</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all-tokens" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-tokens">All Tokens</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="all-tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Token Portfolio</CardTitle>
                    <CardDescription>
                      Showing {filteredTokens.length} of {tokens.length} tokens
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Funding">Funding</SelectItem>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Ready Soon">Ready Soon</SelectItem>
                        <SelectItem value="Harvested">Harvested</SelectItem>
                      </SelectContent>
                    </Select>
                    <ToggleGroup
                      type="single"
                      value={viewMode}
                      onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                    >
                      <ToggleGroupItem value="grid" aria-label="Grid view">
                        <Grid className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="list" aria-label="List view">
                        <List className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">                    {filteredTokens.map((token) => (
                      <Card key={token.id} className="hover:shadow-lg transition-shadow bg-gray-100">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(token.status)}>
                              {getStatusIcon(token.status)}
                              <span className="ml-1">{token.status}</span>
                            </Badge>                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              {token.image && (
                                <Image
                                  src={token.image[0] || "/default-fish.png"}
                                  alt={token.species}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{token.species}</h4>
                              <p className="text-sm text-gray-600">Token {token.id}</p>
                              <p className="text-xs text-gray-500">
                                {token.pond} • {token.location}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Quantity</p>
                              <p className="font-medium">{token.quantity}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Progress</p>
                              <p className="font-medium">{token.progress}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Investors</p>
                              <p className="font-medium">{token.investors}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Avg Return</p>
                              <p className="font-medium text-green-600">{token.avgReturn}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Funding Progress</span>
                              <span>{Math.round((token.funded / token.total) * 100)}%</span>
                            </div>
                            <Progress value={(token.funded / token.total) * 100} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span>{token.progress}%</span>
                            </div>
                            <Progress value={parseInt(token.progress.toString())} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Risk Level</span>
                            <span className={`font-medium ${getRiskColor(token.riskLevel)}`}>{token.riskLevel}</span>
                          </div>                          <div className="flex space-x-2">                            
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link href={`/viewToken?canisterId=${frontendCanisterId}`}>View Details</Link>
                            </Button>
                            {token.status === "Ready Soon" && (
                              <Button size="sm" className="flex-1">
                                Harvest
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTokens.map((token) => (
                      <div key={token.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-100">                        
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">                            
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                              {token.image && (
                                <Image
                                  src={token.image[0] || "/default-fish.png"}
                                  alt={token.species}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-xl">{token.species}</h4>
                              <p className="text-gray-600">
                                Token {token.id} • {token.pond} ({token.location})
                              </p>
                              <p className="text-sm text-gray-500">Created: {token.createdDate}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(token.status)}>
                              {getStatusIcon(token.status)}
                              <span className="ml-1">{token.status}</span>
                            </Badge>
                            <p className="text-sm text-gray-600">Updated: {token.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-6 gap-6 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Quantity</p>
                            <p className="font-semibold">{token.quantity}</p>
                          </div>                          
                          <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="font-semibold">₱{token.total.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Funded</p>
                            <p className="font-semibold text-green-600">₱{token.funded.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Investors</p>
                            <p className="font-semibold">{token.investors}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Avg Return</p>
                            <p className="font-semibold text-green-600">{token.avgReturn}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Risk Level</p>
                            <p className={`font-semibold ${getRiskColor(token.riskLevel)}`}>{token.riskLevel}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Funding Progress</span>
                              <span>{Math.round((token.funded / token.total) * 100)}%</span>
                            </div>
                            <Progress value={(token.funded / token.total) * 100} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span>{token.progress}%</span>
                            </div>
                            <Progress value={parseInt(token.progress.toString())} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Harvest: {token.harvestDate}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {token.daysRemaining} days remaining
                            </span>
                          </div>                          <div className="flex space-x-2">                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/viewToken?canisterId=${frontendCanisterId}`}>View Details</Link>
                            </Button>
                            {token.status === "Ready Soon" && <Button size="sm">Initiate Harvest</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Status Distribution</CardTitle>
                <CardDescription>Current status of all your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {["Funding", "Growing", "Ready Soon", "Harvested"].map((status) => {
                    const count = tokens.filter((token) => token.status === status).length
                    const percentage = Math.round((count / tokens.length) * 100)
                    return (
                      <div key={status} className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{count}</div>
                        <div className="text-sm text-gray-600">{status}</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth & Funding Progress</CardTitle>
                  <CardDescription>Token growth and funding trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      growth: {
                        label: "Growth Progress (%)",
                        color: "hsl(var(--chart-1))",
                      },
                      funding: {
                        label: "Funding ($)",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="growth"
                          stroke="var(--color-growth)"
                          strokeWidth={2}
                          name="Growth Progress (%)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="funding"
                          stroke="var(--color-funding)"
                          strokeWidth={2}
                          name="Funding ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Profitability</CardTitle>
                  <CardDescription>Financial performance and profit margins</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-3))",
                      },
                      profit: {
                        label: "Profit",
                        color: "hsl(var(--chart-4))",
                      },
                      expenses: {
                        label: "Expenses",
                        color: "hsl(var(--chart-5))",
                      },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="var(--color-revenue)"
                          strokeWidth={2}
                          name="Revenue ($)"
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="var(--color-profit)"
                          strokeWidth={2}
                          name="Profit ($)"
                        />
                        <Line
                          type="monotone"
                          dataKey="expenses"
                          stroke="var(--color-expenses)"
                          strokeWidth={2}
                          name="Expenses ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution Trends</CardTitle>
                  <CardDescription>Portfolio risk levels over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      lowRisk: {
                        label: "Low Risk",
                        color: "hsl(142, 76%, 36%)",
                      },
                      mediumRisk: {
                        label: "Medium Risk",
                        color: "hsl(48, 96%, 53%)",
                      },
                      highRisk: {
                        label: "High Risk",
                        color: "hsl(0, 84%, 60%)",
                      },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={riskData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="lowRisk"
                          stroke="var(--color-lowRisk)"
                          strokeWidth={2}
                          name="Low Risk (%)"
                        />
                        <Line
                          type="monotone"
                          dataKey="mediumRisk"
                          stroke="var(--color-mediumRisk)"
                          strokeWidth={2}
                          name="Medium Risk (%)"
                        />
                        <Line
                          type="monotone"
                          dataKey="highRisk"
                          stroke="var(--color-highRisk)"
                          strokeWidth={2}
                          name="High Risk (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Token Metrics & Returns</CardTitle>
                  <CardDescription>Token count and average return performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      totalTokens: {
                        label: "Total Tokens",
                        color: "hsl(var(--chart-1))",
                      },
                      activeTokens: {
                        label: "Active Tokens",
                        color: "hsl(var(--chart-2))",
                      },
                      completedTokens: {
                        label: "Completed Tokens",
                        color: "hsl(var(--chart-3))",
                      },
                      avgReturn: {
                        label: "Avg Return (%)",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tokenMetricsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="totalTokens"
                          stroke="var(--color-totalTokens)"
                          strokeWidth={2}
                          name="Total Tokens"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="activeTokens"
                          stroke="var(--color-activeTokens)"
                          strokeWidth={2}
                          name="Active Tokens"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="completedTokens"
                          stroke="var(--color-completedTokens)"
                          strokeWidth={2}
                          name="Completed Tokens"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="avgReturn"
                          stroke="var(--color-avgReturn)"
                          strokeWidth={2}
                          name="Avg Return (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>            
            </div>
          </TabsContent>
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token History</CardTitle>
                <CardDescription>Complete timeline of your token activities</CardDescription>
              </CardHeader>
              <CardContent>                
                <div className="space-y-4">
                  {tokens.slice(0, 5).map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          {token.image && (
                            <Image
                              src={token.image[0] || "/default-fish.png"}
                              alt={token.species}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{token.species}</p>
                          <p className="text-sm text-gray-600">Token {token.id} created</p>
                        </div>
                      </div>                      <div className="text-right">
                        <p className="text-sm font-medium">{token.createdDate}</p>
                        <p className="text-xs text-gray-600">₱{token.total.toLocaleString()} value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
