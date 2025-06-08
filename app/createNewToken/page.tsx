"use client"


// This page is for producers to create new fish harvest tokens.
// The mock data was implemented on the motoko, but in the future, 
// the motoko backend will be used for data processing and storage/
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Fish, DollarSign, Leaf, Camera, Upload, CheckCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function TokenizePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    species: "",
    quantity: "",
    location: "",
    harvestDate: "",
    pricePerKg: "",
    description: "",
    certifications: [] as string[],
    sustainabilityScore: 0,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Creating token with data:", formData)
    // Token creation logic would go here
  }

  return (
    <div className="min-h-screen bg-blue-200">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button className="bg-white" variant="ghost" asChild>
              <Link href="/dashboard/producer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </p>
              <Progress value={progress} className="w-32 h-2 mt-1" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Fish Harvest Token</h1>
            <p className="text-gray-600">Tokenize your sustainable fish harvest to access global funding</p>
          </div>

          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Harvest Information</h2>
                    <p className="text-gray-600">Tell us about your fish harvest</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="species">Fish Species *</Label>
                      <Select
                        value={formData.species}
                        onValueChange={(value) => setFormData({ ...formData, species: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atlantic-salmon">Atlantic Salmon</SelectItem>
                          <SelectItem value="rainbow-trout">Rainbow Trout</SelectItem>
                          <SelectItem value="sea-bass">Sea Bass</SelectItem>
                          <SelectItem value="sea-bream">Sea Bream</SelectItem>
                          <SelectItem value="arctic-char">Arctic Char</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Expected Quantity (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 2500"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Farm Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Farm A - Sector 3, Trondheim, Norway"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="harvest-date">Expected Harvest Date *</Label>
                      <Input
                        id="harvest-date"
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                      />
                    </div>                    <div className="space-y-2">
                      <Label htmlFor="price">Price per kg (₱) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 10.00"
                        value={formData.pricePerKg}
                        onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                      />
                    </div>                    <div className="space-y-2">
                      <Label>Total Value</Label>
                      <div className="text-2xl font-bold text-green-600">
                        ₱
                        {formData.quantity && formData.pricePerKg
                          ? (
                              Number.parseFloat(formData.quantity) * Number.parseFloat(formData.pricePerKg)
                            ).toLocaleString()
                          : "0"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Harvest Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your fish, farming methods, and what makes this harvest special..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Sustainability & Certifications</h2>
                    <p className="text-gray-600">Showcase your environmental credentials</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Current Certifications</Label>
                      <p className="text-sm text-gray-600 mb-4">Select all certifications you currently hold</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "ASC (Aquaculture Stewardship Council)",
                          "BAP 4-Star",
                          "Organic Certification",
                          "Carbon Neutral",
                          "Fair Trade",
                          "MSC (Marine Stewardship Council)",
                          "EU Organic",
                          "Global GAP",
                        ].map((cert) => (
                          <div key={cert} className="flex items-center space-x-2">
                            <Checkbox
                              id={cert}
                              checked={formData.certifications.includes(cert)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    certifications: [...formData.certifications, cert],
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    certifications: formData.certifications.filter((c) => c !== cert),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={cert} className="text-sm">
                              {cert}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Documentation & Media</h2>
                    <p className="text-gray-600">Upload images and documents to build investor confidence</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Farm Images</CardTitle>
                        <CardDescription>Upload photos of your farm and fish</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">Drag and drop images here</p>
                          <Button variant="outline" size="sm">
                            Choose Files
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Certificates & Documents</CardTitle>
                        <CardDescription>Upload certification documents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">Upload PDF documents</p>
                          <Button variant="outline" size="sm">
                            Choose Files
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Token Configuration</h2>
                    <p className="text-gray-600">Set up your token parameters and launch</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Token Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Species:</span>
                          <span className="font-medium">{formData.species || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span className="font-medium">{formData.quantity || "0"} kg</span>
                        </div>                        <div className="flex justify-between">
                          <span>Total Value:</span>
                          <span className="font-medium">
                            ₱
                            {formData.quantity && formData.pricePerKg
                              ? (
                                  Number.parseFloat(formData.quantity) * Number.parseFloat(formData.pricePerKg)
                                ).toLocaleString()
                              : "0"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Harvest Date:</span>
                          <span className="font-medium">{formData.harvestDate || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sustainability Score:</span>
                          <span className="font-medium">92/100</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Investment Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">                        <div className="space-y-2">
                          <Label>Minimum Investment (₱)</Label>
                          <Input type="number" placeholder="500" />
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum Investment (₱)</Label>
                          <Input type="number" placeholder="5000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Funding Deadline</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Expected ROI Range</Label>
                          <Input placeholder="e.g., 12-15%" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Ready to Launch</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Harvest information complete</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Sustainability credentials verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Documentation uploaded</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Token parameters configured</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Launch Token
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
