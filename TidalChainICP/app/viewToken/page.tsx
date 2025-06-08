"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Fish,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Activity,
  Star,
  Camera,
  FileText,
  ArrowLeft,
  Share2,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Edit,
  Settings,
  Users,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { staticToken } from "@/lib/data/staticToken"
import { canisterId as frontendCanisterId } from "@/components/declarations/tidal_chain_assets"

export default function ViewTokenPage() {
  const token = staticToken
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Static images for tilapia farming
  const images = [
    "/fishTilapia.jpg",
    "/pondA.jpg", 
    "/pondB.jpg",
    "/pondC.jpg"
  ]

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/producer?canisterId=${frontendCanisterId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Token
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Token Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      {token.species}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Token ID: {token.id} • {token.harvest.quantity} available
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="text-sm">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {token.harvest.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Harvest Date: {token.harvest.harvestDate}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Price: <span className="font-semibold text-gray-900">{token.harvest.pricePerKg}</span> per kg
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Value: <span className="font-semibold text-gray-900">{token.harvest.totalValue}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Investment Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span className="font-semibold">{token.investment.fundingProgress}%</span>
                    </div>
                    <Progress value={parseInt(token.investment.fundingProgress.toString())} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Total Value</div>
                      <div className="font-semibold">₱{token.investment.totalValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Funded</div>
                      <div className="font-semibold">₱{token.investment.funded.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Investors</div>
                      <div className="font-semibold">{token.investment.investors}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Expected ROI</div>
                      <div className="font-semibold">{token.investment.expectedROI}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed information */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="iot">IoT Data</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Harvest Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Stocking Date</div>
                        <div className="font-semibold">{token.harvest.stockingDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Expected Yield</div>
                        <div className="font-semibold">{token.harvest.expectedYield}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Current Weight</div>
                        <div className="font-semibold">{token.harvest.currentWeight}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Cage Size</div>
                        <div className="font-semibold">{token.harvest.cageSize}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Water Depth</div>
                        <div className="font-semibold">{token.harvest.waterDepth}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Coordinates</div>
                        <div className="font-semibold">{token.harvest.coordinates}</div>
                      </div>
                    </div>
                    {token.harvest.growthProgress && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Growth Progress</span>
                          <span className="font-semibold">{token.harvest.growthProgress}%</span>
                        </div>
                        <Progress value={token.harvest.growthProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
                  {/* Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {token.transactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.investor}</div>
                              <div className="text-sm text-gray-600">{transaction.tokens} tokens</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{transaction.amount}</div>
                            <div className="text-sm text-gray-600">{transaction.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="iot" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Temperature
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current</span>
                          <span className="font-semibold">{token.iotData.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Optimal Range</span>
                          <span className="text-sm">26-30°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge variant="outline" className="text-xs bg-blue-200">
                            Normal
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Oxygen Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current</span>
                          <span className="font-semibold">{token.iotData.oxygen} mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Optimal Range</span>
                          <span className="text-sm">5-8 mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge variant="outline" className="text-xs bg-green-200">
                            Good
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Salinity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current</span>
                          <span className="font-semibold">{token.iotData.salinity} ppt</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Optimal Range</span>
                          <span className="text-sm">0-0.5 ppt</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge variant="outline" className="text-xs bg-blue-200">
                            Normal
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        pH Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current</span>
                          <span className="font-semibold">{token.iotData.ph}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Optimal Range</span>
                          <span className="text-sm">6.5-8.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge variant="outline" className="text-xs bg-blue-200">
                            Normal
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sustainability" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sustainability Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {token.sustainability.overallScore}
                        </div>
                        <div className="text-sm text-gray-600">Overall Sustainability Score</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Water Quality</span>
                            <span>{token.sustainability.waterQuality}%</span>
                          </div>
                          <Progress value={parseInt(token.sustainability.waterQuality.toString())} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Feed Efficiency</span>
                            <span>{token.sustainability.feedEfficiency}%</span>
                          </div>
                          <Progress value={parseInt(token.sustainability.feedEfficiency.toString())} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Carbon Footprint</span>
                            <span>{token.sustainability.carbonFootprint}%</span>
                          </div>
                          <Progress value={parseInt(token.sustainability.carbonFootprint.toString())} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Animal Welfare</span>
                            <span>{token.sustainability.animalWelfare}%</span>
                          </div>
                          <Progress value={parseInt(token.sustainability.animalWelfare.toString())} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {token.sustainability.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <div className="font-medium">{cert.name}</div>
                              <div className="text-sm text-gray-600">Expires: {cert.expires}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            {cert.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents & Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {token.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-gray-600">{doc.size}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Producer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Producer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={token.producer.avatar} alt={token.producer.account} />
                    <AvatarFallback>{token.producer.account.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{token.producer.account}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {token.producer.location}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{token.producer.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Harvests</span>
                    <span className="font-semibold">{token.producer.totalHarvests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sustainability</span>
                    <span className="font-semibold">{token.producer.sustainabilityScore}%</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <div className="text-sm font-medium mb-2">Certifications</div>
                  <div className="flex flex-wrap gap-1">
                    {token.producer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <div className="text-sm font-medium mb-2">About</div>
                  <p className="text-sm text-gray-600">{token.producer.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Photos
                </CardTitle>
              </CardHeader>              
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={images[selectedImage]}
                      alt="Token image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Token image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  View Investors
                </Button>
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Risk Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}