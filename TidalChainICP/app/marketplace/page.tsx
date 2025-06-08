"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"
import { 
  // marketDemand, 
  // qualityPremiums,
  // demandChartData,
  // priceChartData,
  // demandVolumeData,
  getHighDemandSpecies,
  getAverageMarketPrice,
  getDemandTrend,
  getPriceTrend,
  getTopDemandSpecies,
  getHighestPriceSpecies
} from "@/lib/data/markets"

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import {
  Fish,
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Plus,
  BarChart3,
  Eye,
  Star,
  CheckCircle,
} from "lucide-react"
import { DemandChartData, DemandVolumeData, MarketDemand, PriceChartData, QualityPremium, Restaurant } from "@/components/declarations/tidal_chain_backend.did"


import actor from "@/service/actor"


export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [marketDemand, setMarketDemand] = useState<MarketDemand[]>([]);
  const [qualityPremiums, setQualityPremiums] = useState<QualityPremium[]>([]);
  const [demandChartData, setDemandChartData] = useState<DemandChartData[]>([]);
  const [priceChartData, setPriceChartData] = useState<PriceChartData[]>([]);
  const [demandVolumeData, setDemandVolumeData] = useState<DemandVolumeData[]>([]);

  
  useEffect(() => {
    let isMounted = true;
    const fetchRestaurants = async () => {
      try {
        const response = await actor.getRestaurants();
        if (isMounted) {
          setRestaurants(response);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    }

    fetchRestaurants();

    const fetchMarketDemand = async () => {
      try {
        const response = await actor.getMarketDemand();
        if (isMounted) {
          setMarketDemand(response);
        }
      } catch (err) {
        console.error("Error fetching market demand:", err);
      }
    }
    fetchMarketDemand();

    const fetchQualityPremium = async () => {
      try {
        const response = await actor.getQualityPremium();
        if (isMounted) {
          setQualityPremiums(response);
        }
      } catch (err) {
        console.error("Error fetching quality premiums:", err);
      }
    }
    fetchQualityPremium();

    const fetchDemandChartData = async () => {
      try {
        const response = await actor.getDemandChartData();
        console.log("Demand Chart Data:", response);
        if (isMounted) {
          setDemandChartData(response);
        }
      } catch (err) {
        console.error("Error fetching demand chart data:", err);
      }
    }
    fetchDemandChartData();

    const fetchPriceChartData = async () => {
      try {
        const response = await actor.getPriceChartData();
        if (isMounted) {
          setPriceChartData(response);
        }
      } catch (err) {
        console.error("Error fetching price chart data:", err);
      }
    }
    fetchPriceChartData();

    const fetchDemandVolumeData = async () => {
      try {
        const response = await actor.getDemandVolumeData();
        if (isMounted) {
          setDemandVolumeData(response);
        }
      } catch (err) {
        console.error("Error fetching demand volume data:", err);
      }
    }
    fetchDemandVolumeData();

    return () => { isMounted = false; };
  });

  // 
  const topDemandSpecies = getTopDemandSpecies(demandChartData)[0]?.species || "Tilapia";
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace Analytics</h1>
            <p className="text-gray-600">Monitor demand and pricing for your fish species</p>
          </div>
        </div>

        {/* Producer-focused Marketplace */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="restaurants">Restaurant Partners</TabsTrigger>
            <TabsTrigger value="demand">Market Demand</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="restaurants" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {restaurant.location}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          restaurant.status === "Premium Partner"
                            ? "default"
                            : restaurant.status === "High Volume"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          restaurant.status === "Premium Partner"
                            ? "bg-yellow-300"
                            : restaurant.status === "High Volume"
                              ? "bg-orange-300"
                              : ""
                        }
                      >
                        {restaurant.status}
                      </Badge>
                    </div>                  
                  </CardHeader>
                  
                  {/* Restaurant Image */}
                  {restaurant.image && (
                    <div className="px-6 pb-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <Image
                          src={restaurant.image[0] || "/default-restaurant.jpg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                    <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Type</p>
                        <p className="font-semibold text-gray-900">{restaurant.marketType}</p>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Rating</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1.5" />
                          <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Order Frequency</p>
                        <p className="font-semibold text-gray-900">{restaurant.orderFrequency}</p>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Avg Order Size</p>
                        <p className="font-semibold text-gray-900">{restaurant.avgOrderSize}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Preferred Fish Species</p>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.preferredFish.map((fish) => (
                          <Badge key={fish} variant="outline" className="text-xs">
                            {fish}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Business Details</p>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price Range:</span>
                          <span className="font-medium text-green-600">{restaurant.priceRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Terms:</span>
                          <span className="font-medium">{restaurant.paymentTerms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Orders:</span>
                          <span className="font-medium">{restaurant.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Order:</span>
                          <span className="font-medium">{restaurant.lastOrder}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Special Requirements</p>
                      <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        {restaurant.specialRequirements}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/createNewToken?restaurant=${restaurant.name.replace(/\s+/g, "-").toLowerCase()}`}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Token
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="demand" className="space-y-6">
            {/* Market Insights Summary */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Top Demand</p>
                    <p className="text-2xl font-bold text-green-600">
                      {topDemandSpecies}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getTopDemandSpecies(demandChartData)[0]?.demand}% index
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Fastest Growing</p>
                    <p className="text-2xl font-bold text-blue-600">Pompano</p>
                    <p className="text-xs text-green-500">
                      +{getDemandTrend(demandChartData, 'Pompano').toFixed(1)}% MoM
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Volume</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {demandVolumeData.reduce((sum, item) => sum + parseInt(item.volume.toString()), 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">kg this month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Active Partners</p>
                    <p className="text-2xl font-bold text-orange-600">{restaurants.length}</p>
                    <p className="text-xs text-gray-500">restaurants</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>                <CardHeader>
                  <CardTitle className="text-lg">High Demand Species</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getHighDemandSpecies(marketDemand).map((demand) => (
                      <div key={demand.species} className="flex justify-between items-center">
                        <span>{demand.species}</span>
                        <Badge variant={demand.demandLevel === "Hot" ? "default" : "secondary"}>
                          {demand.demandLevel}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>                <CardHeader>
                  <CardTitle className="text-lg">Average Funding Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketDemand.map((demand) => (
                      <div key={demand.species} className="flex justify-between">
                        <span>{demand.species}</span>
                        <span className="font-medium">{demand.avgFundingTime}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>                <CardHeader>
                  <CardTitle className="text-lg">Quality Premiums</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {qualityPremiums.map((premium) => (
                      <div key={premium.grade} className="flex justify-between">
                        <span>{premium.grade}</span>
                        <span className="font-medium text-green-600">{premium.premiumPercentage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>            <Card>
              <CardHeader>
                <CardTitle>Market Demand Analysis</CardTitle>
                <CardDescription>Current restaurant and consumer demand by species</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={demandChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="Tilapia" 
                        stackId="1" 
                        stroke="#22c55e" 
                        fill="#22c55e" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Milkfish" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Pompano" 
                        stackId="1" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Demand Volume Distribution */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Volume Distribution</CardTitle>
                  <CardDescription>Market share by species (kg)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demandVolumeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ species, percentage }) => `${species} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="volume"
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip formatter={value => [`${value} kg`, 'Volume']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Demand Trends</CardTitle>
                  <CardDescription>Demand index by species</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={demandChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Demand Index']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="Tilapia" 
                          stroke="#22c55e" 
                          strokeWidth={3}
                          dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Milkfish" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Pompano" 
                          stroke="#f59e0b" 
                          strokeWidth={3}
                          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>          <TabsContent value="pricing" className="space-y-6">
            {/* Pricing Insights Summary */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Highest Price</p>
                    <p className="text-2xl font-bold text-green-600">
                      {getHighestPriceSpecies(priceChartData)[0]?.species}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₱{getHighestPriceSpecies(priceChartData)[0]?.price}/kg
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Best Growth</p>
                    <p className="text-2xl font-bold text-blue-600">Tilapia</p>
                    <p className="text-xs text-green-500">
                      +{getPriceTrend(priceChartData, 'Tilapia').toFixed(1)}% MoM
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Avg Price</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {getAverageMarketPrice(marketDemand)}
                    </p>
                    <p className="text-xs text-gray-500">across species</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Market Trend</p>
                    <p className="text-2xl font-bold text-orange-600">+8.2%</p>
                    <p className="text-xs text-gray-500">YoY growth</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Pricing Trends</CardTitle>
                <CardDescription>Historical and current pricing data by species</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `₱${value}`}
                        domain={['dataMin - 1', 'dataMax + 1']}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`₱${value}/kg`, name]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Tilapia" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Milkfish" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Pompano" 
                        stroke="#f59e0b" 
                        strokeWidth={3}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Average price: {getAverageMarketPrice(marketDemand)} (+8.2% YoY)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Price by Species</CardTitle>
                </CardHeader>                <CardContent>
                  <div className="space-y-4">
                    {marketDemand.map((demand) => (
                      <div key={demand.species} className="flex justify-between items-center">
                        <span>{demand.species}</span>
                        <div className="text-right">
                          <span className="font-semibold">{demand.currentPrice}</span>
                          <p className="text-xs text-green-600">{demand.priceChange}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="font-medium text-green-800">Premium demand rising</p>
                      <p className="text-sm text-green-700">+25% increase in premium grade requests</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="font-medium text-blue-800">Organic certification premium</p>
                      <p className="text-sm text-blue-700">30% price premium for organic certified fish</p>
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