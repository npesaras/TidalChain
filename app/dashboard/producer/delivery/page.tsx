"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Truck,
  MapPin,
  Thermometer,
  Droplets,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Fish,
  Package,
  Navigation,
  Signal,
  Zap,
  Eye,
  Timer,
  Route,
  HandCoins
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  deliveries,
  getActiveDeliveries,
  getCompletedDeliveries,
  getDeliveryStats,
  getStepDetails,
  formatDeliveryTime,
  type Delivery,
} from "@/lib/data/deliveries";

export default function DeliveryPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery>(
    deliveries[0],
  );
  const [activeTab, setActiveTab] = useState("active");
  const [isMounted, setIsMounted] = useState(false);
  const [showCurrentStepDetails, setShowCurrentStepDetails] = useState(false);
  const stats = getDeliveryStats();
  // Simulate real-time updates
  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      // This would normally fetch real-time data from IoT sensors
      // For demo purposes, we'll just update timestamps
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  const getStepIcon = (stepId: number, status: string, options?: { overrideColor?: string }) => {
    const color =
      options?.overrideColor ??
      (status === "completed" ? "text-green-500" 
        : status === "active" ? "text-blue-500"
        : "text-gray-400");
    const iconProps = `h-4 w-4 ${color}`;

    if (status === "completed") {
      return <CheckCircle className={iconProps} strokeWidth={2} />;
    }

    switch (stepId) {
      case 1:
        return <Package className={iconProps} strokeWidth={2} />;
      case 2:
        return <Truck className={iconProps} strokeWidth={2} />;
      case 3:
        return <MapPin className={iconProps} strokeWidth={2} />;
      case 4:
        return <HandCoins className={iconProps} strokeWidth={2} />;
      default:
        return <Package className={iconProps} strokeWidth={2} />;
    }
  };

  const isStepAccessible = (stepId: number, currentStep: number) => {
    return stepId <= currentStep;
  };

  const getSensorIcon = (sensorId: string) => {
    if (sensorId.includes("TEMP")) return <Thermometer className="h-4 w-4" />;
    if (sensorId.includes("HUM")) return <Droplets className="h-4 w-4" />;
    if (sensorId.includes("SHOCK")) return <Activity className="h-4 w-4" />;
    if (sensorId.includes("GPS")) return <Navigation className="h-4 w-4" />;
    return <Signal className="h-4 w-4" />;
  };

  const getSensorColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getQualityColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Safe client-side time formatting
  const safeFormatDeliveryTime = (dateString: string) => {
    if (!isMounted) return "Loading...";
    return formatDeliveryTime(dateString);
  };

  // Safe client-side date formatting
  const safeFormatDate = (dateString: string) => {
    if (!isMounted) return "Loading...";
    return new Date(dateString).toLocaleDateString();
  };
  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader userRole="producer" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Delivery Tracking
            </h1>
            <p className="text-gray-600">
              Track your fish token deliveries with real-time IoT monitoring
            </p>
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Deliveries
            </CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time deliveries
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Deliveries
            </CardTitle>
            <Truck className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-gray-900">
              {stats.active}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in transit
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-gray-900">
              {stats.completed}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Quality
            </CardTitle>
            <Fish className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-gray-900">
              {stats.avgQuality}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Quality score</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Delivery List */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Deliveries
              </CardTitle>
              <CardDescription className="text-gray-600">
                Select a delivery to view detailed tracking information
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="active" className="text-sm font-medium">
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="text-sm font-medium"
                  >
                    Completed
                  </TabsTrigger>
                </TabsList>                
                { /* Active Deliveries */}
                <TabsContent value="active" className="space-y-4 mt-0">
                  {getActiveDeliveries().map((delivery) => {
                    const getStatusInfo = (step: number) => {
                      switch (step) {
                        case 1:
                          return { status: "Harvesting", icon: Fish, color: "text-blue-600", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800", border: "border-blue-200", ring: "ring-blue-200" }
                        case 2:
                          return { status: "In Transit", icon: Truck, color: "text-orange-600", bg: "bg-orange-50", badge: "bg-orange-100 text-orange-800", border: "border-orange-200", ring: "ring-orange-200" }
                        case 3:
                          return { status: "Arrived", icon: MapPin, color: "text-green-600", bg: "bg-green-50", badge: "bg-green-100 text-green-800", border: "border-green-200", ring: "ring-green-200" }
                        case 4:
                          return { status: "Delivered", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50", badge: "bg-purple-100 text-purple-800", border: "border-purple-200", ring: "ring-purple-200" }
                        default:
                          return { status: "Processing", icon: Package, color: "text-gray-600", bg: "bg-gray-50", badge: "bg-gray-100 text-gray-800", border: "border-gray-200", ring: "ring-gray-200" }
                      }
                    }

                    const statusInfo = getStatusInfo(delivery.currentStep)
                    const StatusIcon = statusInfo.icon

                    return (
                      <div
                        key={delivery.id}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedDelivery.id === delivery.id
                            ? `${statusInfo.border} ${statusInfo.bg} shadow-md ring-1 ${statusInfo.ring}`
                            : `border-gray-200 hover:bg-gray-50 hover:border-gray-300`
                        }`}
                        onClick={() => setSelectedDelivery(delivery)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                            <span className="font-semibold text-sm text-gray-900">
                              {delivery.id}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className={statusInfo.badge}
                          >
                            {statusInfo.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3 space-y-1">
                          <div className="font-medium">
                            {delivery.fishType} • {delivery.quantity} {delivery.unit}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {delivery.destination}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={(delivery.currentStep / 4) * 100}
                            className={`flex-1 h-2 ${
                              delivery.currentStep === 1 ? '[&>div]:bg-blue-500' :
                              delivery.currentStep === 2 ? '[&>div]:bg-orange-500' :
                              delivery.currentStep === 3 ? '[&>div]:bg-green-500' :
                              '[&>div]:bg-purple-500'
                            }`}
                          />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {delivery.currentStep}/4
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </TabsContent>                
                {/* Completed Deliveries */}
                <TabsContent value="completed" className="space-y-4 mt-0">
                  {getCompletedDeliveries().map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDelivery.id === delivery.id
                          ? "border-green-500 bg-green-50 shadow-md ring-1 ring-green-200"
                          : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDelivery(delivery)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-sm text-gray-900">
                            {delivery.id}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {delivery.fishType}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        <div className="font-medium">
                          {delivery.quantity} {delivery.unit}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {delivery.destination}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Successfully Delivered
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Tracker */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                <Package className="h-6 w-6 text-blue-600" />
                Delivery Progress - {selectedDelivery.id}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                {selectedDelivery.fishType} • {selectedDelivery.quantity}{" "}
                {selectedDelivery.unit}
              </CardDescription>
            </CardHeader>
            <CardContent className={`px-6 ${showCurrentStepDetails ? "pb-8" : "pb-0"}`}>
              {/* Desktop Progress Steps */}
              <div className="hidden md:block">
                <div className="relative px-4 py-6">
                  {/* Step Container */}
                  <div className="flex justify-between relative">
                    {/* Background Line */}
                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200" />

                    {/* Progress Line */}
                    <div
                      className="absolute top-6 left-6 h-0.5 bg-green-500 transition-all duration-300"
                      style={{
                        width: `${((selectedDelivery.currentStep - 1) / (selectedDelivery.steps.length - 1)) * (100 - 12)}%`,
                      }}
                    />

                    {/* Steps */}
                    {selectedDelivery.steps.map((step, index) => {
                      const stepDetails = getStepDetails(step.id);
                      const isAccessible = isStepAccessible(
                        step.id,
                        selectedDelivery.currentStep,
                      );

                      return (
                        <div
                          key={step.id}
                          className="flex flex-col items-center relative z-10"
                        >
                          {/* Step Circle */}
                          <div
                            className={`
                              w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2
                              ${
                                step.status === "completed"
                                  ? "border-green-500 bg-white"
                                  : step.status === "active"
                                    ? "border-blue-500 bg-white"
                                    : "border-gray-300 bg-white text-gray-400"
                              }
                          `}
                          >
                            {getStepIcon(step.id, step.status)}
                          </div>
                          {/* Step Info */}
                          <div className="text-center max-w-24">
                            <div
                              className={`text-sm font-medium mb-1 ${
                                step.status === "completed"
                                  ? "text-green-600"
                                  : step.status === "active"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                              }`}
                            >
                              {step.name}
                            </div>

                            {step.status === "active" && (
                              <div className="text-xs text-blue-600 font-medium mb-1">
                                In Progress
                              </div>
                            )}

                            {step.status === "completed" && (
                              <div className="text-xs text-green-600 font-medium mb-1">
                                Completed
                              </div>
                            )}

                            {step.timestamp && (
                              <div className="text-xs text-muted-foreground">
                                {safeFormatDeliveryTime(step.timestamp)}
                              </div>
                            )}
                            {step.location && (
                              <div className="text-xs text-muted-foreground">
                                {step.location}
                              </div>
                            )}
                          </div>{" "}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${(selectedDelivery.currentStep / selectedDelivery.steps.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Progress Percentage */}
                  <div className="text-center mt-3">
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(
                        (selectedDelivery.currentStep /
                          selectedDelivery.steps.length) *
                          100,
                      )}
                      % Complete
                    </span>
                  </div>

                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowCurrentStepDetails((prev) => !prev)}
                    >
                      {showCurrentStepDetails
                        ? "Hide Current Step Details"
                        : "View Current Step Details"}
                    </Button>
                  </div>
                  
                </div>

              </div>
              {/* Mobile Progress Steps */}
              <div className="md:hidden space-y-5">
                {selectedDelivery.steps.map((step) => {
                  const stepDetails = getStepDetails(step.id);
                  const isAccessible = isStepAccessible(
                    step.id,
                    selectedDelivery.currentStep,
                  );

                  return (
                    <div
                      key={step.id}
                      className={`
                      flex items-center gap-5 p-5 rounded-xl transition-all duration-200 border-2
                      ${isAccessible ? stepDetails.bgColor + " " + stepDetails.borderColor : "bg-gray-50 border-gray-100"}
                      ${step.status === "active" ? "ring-2 ring-blue-200 shadow-md" : ""}
                    `}
                    >
                      <div
                        className={`
                        w-12 h-12 rounded-full flex items-center justify-center shadow-sm
                        ${
                          step.status === "completed"
                            ? "bg-green-500 text-white"
                            : step.status === "active"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-400"
                        }
                      `}
                      >
                        {getStepIcon(step.id, step.status)}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-semibold text-base ${
                            step.status === "completed"
                              ? "text-green-700"
                              : step.status === "active"
                                ? "text-blue-700"
                                : "text-gray-400"
                          }`}
                        >
                          {isAccessible ? stepDetails.title : step.name}
                        </div>
                        {isAccessible && (
                          <div className="text-sm text-muted-foreground mt-2">
                            {stepDetails.description}
                          </div>
                        )}
                        {step.timestamp && (
                          <div className="text-sm text-muted-foreground mt-2 font-medium">
                            {safeFormatDeliveryTime(step.timestamp)} •{" "}
                            {step.location}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {showCurrentStepDetails && (
                <div className="pt-8 border-t border-gray-200">
                  {/* Current Step Details */}
                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        Delivery Details
                      </h4>
                      <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Courier:</span>
                          <span className="font-medium text-gray-900">
                            {selectedDelivery.courierName}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Contact:</span>
                          <span className="font-medium text-gray-900">
                            {selectedDelivery.courierContact}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Destination:</span>
                          <span className="font-medium text-gray-900">
                            {selectedDelivery.destination}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        Timeline
                      </h4>
                      <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Harvested:</span>
                          <span className="font-medium text-gray-900">
                            {safeFormatDate(selectedDelivery.harvestDate)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Packaged:</span>
                          <span className="font-medium text-gray-900">
                            {safeFormatDate(selectedDelivery.packagedDate)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">ETA:</span>
                          <span className="font-medium text-gray-900">
                            {safeFormatDate(selectedDelivery.estimatedDelivery)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Step Detailed Information */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    {(() => {
                      const currentStepDetails = getStepDetails(
                        selectedDelivery.currentStep,
                      );
                      const currentStep = selectedDelivery.steps.find(
                        (s) => s.status === "active",
                      );

                      return (
                        <div
                          className={`p-6 rounded-xl ${currentStepDetails.bgColor} ${currentStepDetails.borderColor} border-2 shadow-sm`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center bg-${currentStepDetails.color}-500 text-white shadow-lg`}
                            >
                              {getStepIcon(selectedDelivery.currentStep, "active", { overrideColor: "text-white" })} 
                            </div>
                            <div>
                              <h4 className="font-bold text-xl text-gray-900">
                                {currentStepDetails.title}
                              </h4>
                              <p className="text-base text-gray-600 mt-1">
                                {currentStepDetails.description}
                              </p>
                            </div>
                          </div>

                          {/* Step-specific content */}
                          {selectedDelivery.currentStep === 1 && (
                            <div className="grid gap-4 md:grid-cols-2 mt-4">
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Timer className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium">
                                  Harvest started:{" "}
                                  {safeFormatDeliveryTime(selectedDelivery.harvestDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Fish className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium">
                                  {selectedDelivery.quantity}{" "}
                                  {selectedDelivery.unit}{" "}
                                  {selectedDelivery.fishType}
                                </span>
                              </div>
                            </div>
                          )}

                          {selectedDelivery.currentStep === 2 && (
                            <div className="grid gap-4 md:grid-cols-2 mt-4">
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Route className="h-5 w-5 text-orange-600" />
                                <span className="text-sm font-medium">
                                  En route to {selectedDelivery.destination}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Truck className="h-5 w-5 text-orange-600" />
                                <span className="text-sm font-medium">
                                  Courier: {selectedDelivery.courierName}
                                </span>
                              </div>
                            </div>
                          )}

                          {selectedDelivery.currentStep === 3 && (
                            <div className="grid gap-4 md:grid-cols-2 mt-4">
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <MapPin className="h-5 w-5 text-purple-600" />
                                <span className="text-sm font-medium">
                                  Arrived at {selectedDelivery.destination}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Eye className="h-5 w-5 text-purple-600" />
                                <span className="text-sm font-medium">
                                  Awaiting quality verification
                                </span>
                              </div>
                            </div>
                          )}

                          {selectedDelivery.currentStep === 4 && (
                            <div className="grid gap-4 md:grid-cols-2 mt-4">
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium">
                                  Delivery completed successfully
                                </span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  Quality Score: {selectedDelivery.quality.score}%
                                </Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Survival Rate Monitoring - IoT Fish Freshness */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* IoT Sensor Data - Only show if step 2 or higher */}
            {selectedDelivery.currentStep >= 2 && (
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                    <Zap className="h-6 w-6 text-blue-600" />
                    IoT Fish Freshness Sensors
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        selectedDelivery.currentStep < 4
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {selectedDelivery.currentStep < 4 ? "Live" : "Final"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {selectedDelivery.currentStep < 4
                      ? "Real-time fish freshness monitoring"
                      : "Final delivery freshness readings"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-5">
                    {selectedDelivery.iotSensors.map((sensor) => (
                      <div
                        key={sensor.id}
                        className={`
                        flex items-center justify-between p-4 rounded-xl transition-all duration-200 border-2
                        ${
                          sensor.status === "normal"
                            ? "bg-green-50 border-green-200 hover:bg-green-100"
                            : sensor.status === "warning"
                              ? "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                              : "bg-red-50 border-red-200 hover:bg-red-100"
                        }
                      `}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-full ${
                              sensor.status === "normal"
                                ? "bg-green-100"
                                : sensor.status === "warning"
                                  ? "bg-yellow-100"
                                  : "bg-red-100"
                            }`}
                          >
                            <div className={getSensorColor(sensor.status)}>
                              {getSensorIcon(sensor.id)}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-base text-gray-900">
                              {sensor.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Updated {safeFormatDeliveryTime(sensor.lastUpdate)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-gray-900 mb-1">
                            {sensor.value} {sensor.unit}
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-sm font-medium ${
                              sensor.status === "normal"
                                ? "border-green-300 text-green-700 bg-green-50"
                                : sensor.status === "warning"
                                  ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                                  : "border-red-300 text-red-700 bg-red-50"
                            }`}
                          >
                            {sensor.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Survival Rate & Fish Freshness Metrics */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <Fish className="h-6 w-6 text-green-600" />
                  {selectedDelivery.currentStep === 1
                    ? "Harvest Info"
                    : selectedDelivery.currentStep >= 2
                      ? "Survival Rate & Freshness"
                      : "Status"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {selectedDelivery.currentStep === 1
                    ? "Current harvest information"
                    : selectedDelivery.currentStep >= 2
                      ? "Fish survival rate and freshness metrics"
                      : "Current status"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-6">
                  {/* Survival Rate - Only show if step 2 or higher */}
                  {selectedDelivery.currentStep >= 2 && (
                    <div className="p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-lg text-gray-900">
                          Fish Survival Rate
                        </span>
                        <Badge
                          className={`${getQualityColor(selectedDelivery.quality.status)} text-sm font-medium border-0`}
                        >
                          {selectedDelivery.quality.status}
                        </Badge>
                      </div>
                      <div className="text-4xl font-bold text-green-600 mb-4">
                        {selectedDelivery.quality.score}%
                      </div>
                      <Progress
                        value={selectedDelivery.quality.score}
                        className="h-4"
                      />
                      <div className="text-sm text-gray-600 mt-3">
                        Based on water quality, temperature, and oxygen levels
                      </div>
                    </div>
                  )}

                  {/* Current Location - Only show if step 2 or higher */}
                  {selectedDelivery.currentStep >= 2 && (
                    <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-6 w-6 text-blue-600" />
                        <span className="font-bold text-lg text-gray-900">
                          Current Location
                        </span>
                      </div>
                      <div className="text-base text-gray-800 font-semibold mb-2">
                        {selectedDelivery.gpsLocation.address}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDelivery.gpsLocation.lat.toFixed(4)},{" "}
                        {selectedDelivery.gpsLocation.lng.toFixed(4)}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Harvest Information */}
                  {selectedDelivery.currentStep === 1 && (
                    <>
                      <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Fish className="h-6 w-6 text-blue-600" />
                          <span className="font-bold text-lg text-gray-900">
                            Harvest Details
                          </span>
                        </div>
                        <div className="space-y-3 text-base">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Species:</span>
                            <span className="font-semibold text-gray-900">
                              {selectedDelivery.fishType}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-semibold text-gray-900">
                              {selectedDelivery.quantity}{" "}
                              {selectedDelivery.unit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Harvest Date:</span>
                            <span className="font-semibold text-gray-900">
                              {safeFormatDate(selectedDelivery.harvestDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Package className="h-6 w-6 text-green-600" />
                          <span className="font-bold text-lg text-gray-900">
                            Collection Status
                          </span>
                        </div>
                        <div className="text-base text-green-700 font-medium">
                          Fish are being collected from the pond and prepared
                          for packaging with optimal water conditions.
                        </div>
                      </div>
                    </>
                  )}

                  {/* Fish Freshness Metrics - Only show if step 2 or higher */}
                  {selectedDelivery.currentStep >= 2 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-xl text-center border-2 border-blue-200">
                        <Thermometer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-gray-600 mb-1">
                          Water Temperature
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {selectedDelivery.temperature}°C
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Optimal Range
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl text-center border-2 border-green-200">
                        <Droplets className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-gray-600 mb-1">
                          Oxygen Level
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {selectedDelivery.humidity}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Excellent
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Fish Freshness Indicators */}
                  {selectedDelivery.currentStep >= 2 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-xl text-center border-2 border-purple-200">
                        <div className="h-8 w-8 mx-auto mb-2 flex items-center justify-center bg-purple-100 rounded-full">
                          <span className="text-purple-600 font-bold text-sm">pH</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-600 mb-1">
                          Water pH
                        </div>
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          7.2
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Ideal
                        </div>
                      </div>
                      <div className="p-4 bg-cyan-50 rounded-xl text-center border-2 border-cyan-200">
                        <div className="h-8 w-8 mx-auto mb-2 flex items-center justify-center bg-cyan-100 rounded-full">
                          <span className="text-cyan-600 font-bold text-xs">TDS</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-600 mb-1">
                          Water Quality
                        </div>
                        <div className="text-2xl font-bold text-cyan-600 mb-1">
                          95%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Pure
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Freshness Alerts */}
                  {selectedDelivery.quality.alerts.length > 0 && (
                    <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800 text-base">
                          Freshness Alerts
                        </span>
                      </div>
                      <div className="space-y-2">
                        {selectedDelivery.quality.alerts.map((alert, index) => (
                          <div
                            key={index}
                            className="text-sm text-yellow-700 font-medium"
                          >
                            {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
