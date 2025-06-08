"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CreditCard,
  Fish,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Banknote,
  Wallet,
  AlertCircle,
  CheckCircle,
  Target,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, AreaChart, Area, PieChart as RechartsPieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  getTransactionsByType, 
  formatTransactionTime,
  type Transaction
} from "@/lib/data/transactions"
import { getSpeciesRevenue, formatCurrency } from "@/lib/data/species"

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState("6m")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  // Mock revenue data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 65000, profit: 18500, expenses: 46500, tokens: 2, harvests: 1 },
    { month: "Feb", revenue: 78000, profit: 24300, expenses: 53700, tokens: 3, harvests: 2 },
    { month: "Mar", revenue: 92000, profit: 31200, expenses: 60800, tokens: 4, harvests: 2 },
    { month: "Apr", revenue: 105000, profit: 38700, expenses: 66300, tokens: 5, harvests: 3 },
    { month: "May", revenue: 118000, profit: 45200, expenses: 72800, tokens: 6, harvests: 4 },
    { month: "Jun", revenue: 132000, profit: 52800, expenses: 79200, tokens: 6, harvests: 3 },
  ]

  const weeklyRevenueData = [
    { week: "Week 1", revenue: 28000, profit: 8400, expenses: 19600 },
    { week: "Week 2", revenue: 32000, profit: 9600, expenses: 22400 },
    { week: "Week 3", revenue: 35000, profit: 10500, expenses: 24500 },
    { week: "Week 4", revenue: 37000, profit: 11100, expenses: 25900 },
  ]

  const yearlyRevenueData = [
    { year: "2023", revenue: 850000, profit: 255000, expenses: 595000 },
    { year: "2024", revenue: 1050000, profit: 315000, expenses: 735000 },
    { year: "2025", revenue: 590000, profit: 210000, expenses: 380000 }, // YTD
  ]

  const revenueBySpecies = [
    { name: "Tilapia", value: 180450, percentage: 36, color: "#3b82f6" },
    { name: "Milkfish", value: 150230, percentage: 30, color: "#10b981" },
    { name: "Pompano", value: 120890, percentage: 24, color: "#8b5cf6" },
    { name: "Sea Bass", value: 65430, percentage: 13, color: "#f59e0b" },
  ]

  const revenueByTokens = [
    { tokenId: "TKN-001", species: "Tilapia", revenue: 85000, profit: 25500, investors: 12, harvestDate: "2025-05-15", status: "completed" },
    { tokenId: "TKN-002", species: "Milkfish", revenue: 72000, profit: 21600, investors: 8, harvestDate: "2025-04-28", status: "completed" },
    { tokenId: "TKN-003", species: "Pompano", revenue: 95000, profit: 28500, investors: 15, harvestDate: "2025-06-10", status: "pending" },
    { tokenId: "TKN-004", species: "Sea Bass", revenue: 0, profit: 0, investors: 6, harvestDate: "2025-07-20", status: "growing" },
  ]

  const projectedRevenue = [
    { month: "Jul", actual: null, projected: 145000, upper: 160000, lower: 130000 },
    { month: "Aug", actual: null, projected: 152000, upper: 168000, lower: 136000 },
    { month: "Sep", actual: null, projected: 158000, upper: 175000, lower: 141000 },
    { month: "Oct", actual: null, projected: 165000, upper: 182000, lower: 148000 },
  ]

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "weekly":
        return weeklyRevenueData
      case "yearly":
        return yearlyRevenueData
      default:
        return monthlyRevenueData
    }
  }

  const getDataKey = () => {
    switch (selectedPeriod) {
      case "weekly":
        return "week"
      case "yearly":
        return "year"
      default:
        return "month"
    }
  }

  const currentData = getCurrentData()
  const latestData = currentData[currentData.length - 1]
  const previousData = currentData[currentData.length - 2]

  const revenueGrowth = previousData 
    ? ((latestData.revenue - previousData.revenue) / previousData.revenue * 100).toFixed(1)
    : "0"

  const profitGrowth = previousData 
    ? ((latestData.profit - previousData.profit) / previousData.profit * 100).toFixed(1)
    : "0"

  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalProfit = currentData.reduce((sum, item) => sum + item.profit, 0)
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

  // Payment and transaction data
  const paymentTransactions = getTransactionsByType('payment').concat(getTransactionsByType('harvest'))
  const recentPayments = paymentTransactions.slice(0, 8)

  // Calculate payment stats
  const completedPayments = paymentTransactions.filter(t => t.status === 'completed')
  const pendingPayments = paymentTransactions.filter(t => t.status === 'pending')
  
  const totalEarnings = completedPayments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''))
    return sum + amount
  }, 0)

  const pendingAmount = pendingPayments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''))
    return sum + amount
  }, 0)

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="text-gray-600">Track your earnings, payments, and financial performance</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Key Revenue Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₱{latestData.revenue.toLocaleString()}</div>
              <div className="flex items-center text-xs mt-1">
                {parseFloat(revenueGrowth) >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={parseFloat(revenueGrowth) >= 0 ? "text-green-600" : "text-red-600"}>
                  {revenueGrowth}% from last period
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₱{latestData.profit.toLocaleString()}</div>
              <div className="flex items-center text-xs mt-1">
                {parseFloat(profitGrowth) >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={parseFloat(profitGrowth) >= 0 ? "text-green-600" : "text-red-600"}>
                  {profitGrowth}% from last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{profitMargin}%</div>
              <p className="text-xs text-gray-600">Industry avg: 35%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₱{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{pendingPayments.length} pending transactions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
            <TabsTrigger value="payments">Payments & Earnings</TabsTrigger>
            <TabsTrigger value="projections">Revenue Projections</TabsTrigger>
          </TabsList>

          {/* Revenue Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Revenue Trends</h2>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue & Profit Chart */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue & Profit Trends</CardTitle>
                  <CardDescription>Financial performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                      profit: {
                        label: "Profit",
                        color: "hsl(var(--chart-2))",
                      },
                      expenses: {
                        label: "Expenses",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={getDataKey()} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stackId="1"
                          stroke="var(--color-revenue)"
                          fill="var(--color-revenue)"
                          fillOpacity={0.6}
                          name="Revenue (₱)"
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stackId="2"
                          stroke="var(--color-expenses)"
                          fill="var(--color-expenses)"
                          fillOpacity={0.6}
                          name="Expenses (₱)"
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="var(--color-profit)"
                          strokeWidth={3}
                          name="Net Profit (₱)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key financial indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-800">Revenue Growth</p>
                        <p className="text-xs text-green-600">vs last period</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700">+{revenueGrowth}%</p>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">Positive</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-blue-800">Profit Margin</p>
                        <p className="text-xs text-blue-600">Average margin</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-700">{profitMargin}%</p>
                        <div className="flex items-center">
                          <Target className="h-3 w-3 text-blue-600 mr-1" />
                          <span className="text-xs text-blue-600">Target: 35%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-purple-800">Revenue per Token</p>
                        <p className="text-xs text-purple-600">Average revenue</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-700">₱78k</p>
                        <div className="flex items-center">
                          <Activity className="h-3 w-3 text-purple-600 mr-1" />
                          <span className="text-xs text-purple-600">Per token</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Recent performance highlights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">6</div>
                      <div className="text-sm text-gray-600">Active Tokens</div>
                      <div className="text-xs text-green-600">Generating revenue</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">13</div>
                      <div className="text-sm text-gray-600">Completed Harvests</div>
                      <div className="text-xs text-blue-600">This year</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">41</div>
                      <div className="text-sm text-gray-600">Total Investors</div>
                      <div className="text-xs text-purple-600">Across all tokens</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue by Species */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Fish Species</CardTitle>
                  <CardDescription>Breakdown of earnings by fish type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueBySpecies.map((species, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{species.name}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-900">₱{species.value.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{species.percentage}%</div>
                          </div>
                        </div>
                        <Progress value={species.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Token Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Token Performance</CardTitle>
                  <CardDescription>Revenue breakdown by individual tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByTokens.map((token, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-sm">{token.tokenId}</p>
                            <p className="text-xs text-gray-600">{token.species}</p>
                          </div>
                          <Badge 
                            variant={token.status === "completed" ? "default" : "secondary"}
                            className={
                              token.status === "completed" ? "bg-green-100 text-green-800" :
                              token.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }
                          >
                            {token.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-medium">₱{token.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Profit</p>
                            <p className="font-medium text-green-600">₱{token.profit.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Investors</p>
                            <p className="font-medium">{token.investors}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Harvest Date</p>
                            <p className="font-medium">{token.harvestDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payments & Earnings Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <Wallet className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₱{totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">{completedPayments.length} completed payments</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">₱{pendingAmount.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">{pendingPayments.length} pending transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
                  <Banknote className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    ₱{completedPayments.length > 0 ? Math.round(totalEarnings / completedPayments.length).toLocaleString() : '0'}
                  </div>
                  <p className="text-xs text-gray-600">Per transaction</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Recent Payment History
                </CardTitle>
                <CardDescription>Your latest earnings and payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg">
                          {payment.type === 'harvest' ? (
                            <Fish className="h-4 w-4 text-green-600" />
                          ) : (
                            <DollarSign className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{payment.title}</div>
                          <div className="text-sm text-gray-500">{payment.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatTransactionTime(payment.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{payment.amount}</div>
                        <Badge 
                          variant={payment.status === "completed" ? "default" : "secondary"}
                          className={
                            payment.status === "completed" ? "bg-green-100 text-green-800" :
                            payment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Payment Summary */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-lg font-semibold text-green-600">₱{latestData.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Month</p>
                      <p className="text-lg font-semibold text-gray-900">₱{previousData?.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Growth</p>
                      <p className="text-lg font-semibold text-blue-600">{revenueGrowth}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Projections Tab */}
          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecasting</CardTitle>
                <CardDescription>Projected revenue based on current tokens and market trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actual: {
                      label: "Actual Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    projected: {
                      label: "Projected Revenue",
                      color: "hsl(var(--chart-2))",
                    },
                    upper: {
                      label: "Upper Bound",
                      color: "hsl(var(--chart-3))",
                    },
                    lower: {
                      label: "Lower Bound",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...monthlyRevenueData, ...projectedRevenue]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-actual)"
                        strokeWidth={3}
                        name="Actual Revenue (₱)"
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="projected"
                        stroke="var(--color-projected)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Projected Revenue (₱)"
                      />
                      <Line
                        type="monotone"
                        dataKey="upper"
                        stroke="var(--color-upper)"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        name="Upper Bound (₱)"
                      />
                      <Line
                        type="monotone"
                        dataKey="lower"
                        stroke="var(--color-lower)"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        name="Lower Bound (₱)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Projection Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Projection Insights</CardTitle>
                  <CardDescription>Key factors influencing revenue forecasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Strong Growth Trend</p>
                        <p className="text-xs text-blue-600">Revenue growth averaging 12% monthly</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">High Demand Fish Species</p>
                        <p className="text-xs text-green-600">Tilapia and Milkfish showing strong market demand</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Seasonal Variation</p>
                        <p className="text-xs text-yellow-600">Consider monsoon season impact on harvests</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">Investor Interest</p>
                        <p className="text-xs text-purple-600">Growing investor base supporting expansion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Revenue Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Revenue</CardTitle>
                  <CardDescription>Expected earnings from active tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">TKN-004 Sea Bass</p>
                          <p className="text-xs text-gray-600">Expected harvest: July 20</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Growing</Badge>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-600">Projected Revenue: <span className="font-semibold text-green-600">₱89,000</span></p>
                        <p className="text-gray-600">6 investors committed</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">TKN-005 Pompano</p>
                          <p className="text-xs text-gray-600">Expected harvest: August 15</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Funding</Badge>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-600">Projected Revenue: <span className="font-semibold text-green-600">₱105,000</span></p>
                        <p className="text-gray-600">Target: 10 investors</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-green-50">
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-800">Total Projected</p>
                        <p className="text-2xl font-bold text-green-700">₱194,000</p>
                        <p className="text-xs text-green-600">Next 2 months</p>
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