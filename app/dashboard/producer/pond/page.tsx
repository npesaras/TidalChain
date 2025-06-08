"use client"


// This page is for producers to monitor and manage their fish ponds and tokens
// In the future, this page will be connected to the motoko backend http_request
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Fish,
  Waves,
  Activity,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  Plus,
  MapPin,
  Calendar,
  TrendingUp,
  BarChart3,
  Grid,
  List,
  Droplets,
} from "lucide-react"

// Import shared pond data
import { 
  getPondById, 
  getTotalPonds, 
  getTotalCapacity, 
  getTotalCurrentStock, 
  getTotalActiveTokens, 
  getTotalValue 
} from "@/lib/data/ponds"

// Import shared tokens data
import { 
  getTokenById, 
  getTokensByPond, 
  getTotalTokensCount, 
  getTotalTokenValue, 
  getTokensByStatus, 
  getActiveTokensCount 
} from "@/lib/data/tokens"
import { serviceMakeActor } from "@/service/actor"
import { Pond, Token } from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"

export default function MyPondPage() {
  const [selectedPond, setSelectedPond] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4" />
      case "good":
        return <CheckCircle className="h-4 w-4" />
      case "attention":
        return <AlertTriangle className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  // Add new function for utilization color logic
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 1 && utilization <= 50) {
      return "bg-green-500" // Green for low utilization (healthy)
    } else if (utilization >= 51 && utilization <= 80) {
      return "bg-orange-500" // Orange for medium utilization (moderate)
    } else if (utilization >= 81 && utilization <= 100) {
      return "bg-red-500" // Red for high utilization (at capacity)
    }
    return "bg-gray-400" // Default gray for edge cases
  }


  const [tokens, setTokens] = useState<Token[]>([])
  const [ponds, setPonds] = useState<Pond[]>([])

  // Add function for utilization status text and styling
  const getUtilizationStatus = (utilization: number) => {
    if (utilization >= 1 && utilization <= 50) {
      return { text: "Low", color: "text-green-600" }
    } else if (utilization >= 51 && utilization <= 80) {
      return { text: "Moderate", color: "text-orange-600" }
    } else if (utilization >= 81 && utilization <= 100) {
      return { text: "High", color: "text-red-600" }
    }
    return { text: "Unknown", color: "text-gray-600" }
  }
  const actor = serviceMakeActor()

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await actor.getTokensData()
        setTokens(response)
      } catch (error) {
        console.error("Failed to fetch tokens:", error)
      }
    }
    fetchTokens()

    const fetchPonds = async () => {
      try {
        const response = await actor.getPondData()
        setPonds(response)
      } catch (error) {
        console.error("Failed to fetch ponds:", error)
      }
    }
    fetchPonds()

  })


  // Updated to use shared tokens data
  const filteredTokens = selectedPond === "all" ? tokens : getTokensByPond(tokens, selectedPond)
  const selectedPondData = selectedPond === "all" ? null : getPondById(ponds, selectedPond)

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Pond</h1>
            <p className="text-gray-600">Monitor and manage your fish ponds and tokens</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/producer">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Pond
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Stats - Updated to use shared data functions */}
            {selectedPond === "all" && (
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Ponds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{getTotalPonds(ponds)}</div>
                    <p className="text-sm text-gray-600 mt-1">{getTotalPonds(ponds)} active ponds</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Capacity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{getTotalCapacity(ponds)}</div>
                    <p className="text-sm text-blue-600 mt-1">{getTotalCurrentStock(ponds)} current stock</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{getActiveTokensCount(tokens)}</div>
                    <p className="text-sm text-green-600 mt-1">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">₱{getTotalTokenValue(tokens).toLocaleString()}</div>
                    <p className="text-sm text-gray-600 mt-1">Token value across ponds</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pond Status Cards - Now using shared pond data */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedPond === "all" ? ponds : ponds.filter((pond) => pond.id === selectedPond)).map((pond) => (
                <Card key={pond.id} className="hover:shadow-lg transition-shadow bg-slate-100">
                  <CardHeader className="pb-3"> 
                    {/* Pond Image */}         
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={pond.image[0] || "/defaultPondImage.jpg"}
                        alt={`${pond.name} - Aquaculture pond in ${pond.location}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={pond.id === "pond-a"}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <CardTitle className="text-lg">{pond.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {pond.location}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(pond.status)}>
                        {getStatusIcon(pond.status)}
                        <span className="ml-1 capitalize">{pond.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Size</p>
                        <p className="font-medium">{pond.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Capacity</p>
                        <p className="font-medium">{pond.capacity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Stock</p>
                        <p className="font-medium">{pond.currentStock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Active Tokens</p>
                        <p className="font-medium">{getTokensByPond(tokens, pond.id).length}</p>
                      </div>
                    </div>
                    {/* Enhanced utilization section with color coding */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span className={getUtilizationStatus(parseInt(pond.utilization.toString())).color}>
                          {pond.utilization}% ({getUtilizationStatus(parseInt(pond.utilization.toString())).text})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(parseInt(pond.utilization.toString()))}`}
                          style={{ width: `${pond.utilization}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-gray-100">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}