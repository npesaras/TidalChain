
export interface IoTSensor {
  id: string
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical"
  lastUpdate: string
}

export interface DeliveryStep {
  id: number
  name: string
  status: "completed" | "active" | "pending"
  timestamp?: string
  location?: string
}

export interface StepDetails {
  title: string
  description: string
  color: string
  bgColor: string
  borderColor: string
}

export interface Delivery {
  id: string
  tokenId: string
  fishType: string
  quantity: number
  unit: string
  harvestDate: string
  packagedDate: string
  courierName: string
  courierContact: string
  destination: string
  currentStep: number
  estimatedDelivery: string
  iotSensors: IoTSensor[]
  steps: DeliveryStep[]
  temperature: number
  humidity: number
  gpsLocation: {
    lat: number
    lng: number
    address: string
  }
  quality: {
    score: number
    status: "excellent" | "good" | "fair" | "poor"
    alerts: string[]
  }
}

// Sample delivery data
export const deliveries: Delivery[] = [
  {
    id: "DEL-001",
    tokenId: "TKN-001",
    fishType: "Tilapia",
    quantity: 25,
    unit: "kg",
    harvestDate: "2025-06-05T08:00:00Z",
    packagedDate: "2025-06-05T10:30:00Z",
    courierName: "FastFish Logistics",
    courierContact: "+63 912 345 6789",
    destination: "Manila Seafood Market",
    currentStep: 2,
    estimatedDelivery: "2025-06-06T14:00:00Z",
    temperature: 2.5,
    humidity: 85,
    gpsLocation: {
      lat: 14.5995,
      lng: 120.9842,
      address: "EDSA, Quezon City"
    },
    quality: {
      score: 92,
      status: "excellent",
      alerts: []
    },
    iotSensors: [
      {
        id: "TEMP-001",
        name: "Temperature",
        value: 2.5,
        unit: "°C",
        status: "normal",
        lastUpdate: "2025-06-06T10:45:00Z"
      },
      {
        id: "HUM-001",
        name: "Humidity",
        value: 85,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-06T10:45:00Z"
      },
      {
        id: "SHOCK-001",
        name: "Shock Detection",
        value: 0.2,
        unit: "G",
        status: "normal",
        lastUpdate: "2025-06-06T10:45:00Z"
      },
      {
        id: "GPS-001",
        name: "GPS Signal",
        value: 95,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-06T10:45:00Z"
      }
    ],    steps: [
      {
        id: 1,
        name: "Basket",
        status: "completed",
        timestamp: "2025-06-05T08:00:00Z",
        location: "Pond Site A"
      },
      {
        id: 2,
        name: "Delivery",
        status: "active",
        timestamp: "2025-06-05T12:00:00Z",
        location: "En Route"
      },
      {
        id: 3,
        name: "Arrived",
        status: "pending"
      },
      {
        id: 4,
        name: "Payment",
        status: "pending"
      }
    ]
  },
  {
    id: "DEL-002",
    tokenId: "TKN-002",
    fishType: "Milkfish",
    quantity: 30,
    unit: "kg",
    harvestDate: "2025-06-04T07:30:00Z",
    packagedDate: "2025-06-04T09:15:00Z",
    courierName: "Ocean Express",
    courierContact: "+63 917 876 5432",
    destination: "Cebu Fish Port",
    currentStep: 3,
    estimatedDelivery: "2025-06-06T16:00:00Z",
    temperature: 1.8,
    humidity: 88,
    gpsLocation: {
      lat: 10.3157,
      lng: 123.8854,
      address: "Cebu City Port Area"
    },
    quality: {
      score: 95,
      status: "excellent",
      alerts: []
    },
    iotSensors: [
      {
        id: "TEMP-002",
        name: "Temperature",
        value: 1.8,
        unit: "°C",
        status: "normal",
        lastUpdate: "2025-06-06T10:30:00Z"
      },
      {
        id: "HUM-002",
        name: "Humidity",
        value: 88,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-06T10:30:00Z"
      },
      {
        id: "SHOCK-002",
        name: "Shock Detection",
        value: 0.1,
        unit: "G",
        status: "normal",
        lastUpdate: "2025-06-06T10:30:00Z"
      },
      {
        id: "GPS-002",
        name: "GPS Signal",
        value: 98,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-06T10:30:00Z"
      }
    ],
    steps: [
      {
        id: 1,
        name: "Basket",
        status: "completed",
        timestamp: "2025-06-04T07:30:00Z",
        location: "Pond Site B"
      },
      {
        id: 2,
        name: "Delivery",
        status: "completed",
        timestamp: "2025-06-04T11:00:00Z",
        location: "Transport Hub"
      },      {
        id: 3,
        name: "Arrived",
        status: "active",
        timestamp: "2025-06-06T10:00:00Z",
        location: "Destination"
      },
      {
        id: 4,
        name: "Payment",
        status: "pending"
      }
    ]
  },
  {
    id: "DEL-003",
    tokenId: "TKN-003",
    fishType: "Pompano",
    quantity: 18,
    unit: "kg",
    harvestDate: "2025-06-03T06:45:00Z",
    packagedDate: "2025-06-03T08:30:00Z",
    courierName: "Fresh Catch Delivery",
    courierContact: "+63 925 111 2233",
    destination: "Davao Wholesale Market",
    currentStep: 4,
    estimatedDelivery: "2025-06-05T18:00:00Z",
    temperature: 2.0,
    humidity: 82,
    gpsLocation: {
      lat: 7.1907,
      lng: 125.4553,
      address: "Davao City Market"
    },
    quality: {
      score: 98,
      status: "excellent",
      alerts: []
    },
    iotSensors: [
      {
        id: "TEMP-003",
        name: "Temperature",
        value: 2.0,
        unit: "°C",
        status: "normal",
        lastUpdate: "2025-06-05T18:00:00Z"
      },
      {
        id: "HUM-003",
        name: "Humidity",
        value: 82,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-05T18:00:00Z"
      },
      {
        id: "SHOCK-003",
        name: "Shock Detection",
        value: 0.0,
        unit: "G",
        status: "normal",
        lastUpdate: "2025-06-05T18:00:00Z"
      },
      {
        id: "GPS-003",
        name: "GPS Signal",
        value: 100,
        unit: "%",
        status: "normal",
        lastUpdate: "2025-06-05T18:00:00Z"
      }
    ],
    steps: [
      {
        id: 1,
        name: "Basket",
        status: "completed",
        timestamp: "2025-06-03T06:45:00Z",
        location: "Pond Site C"
      },
      {
        id: 2,
        name: "Delivery",
        status: "completed",
        timestamp: "2025-06-03T10:30:00Z",
        location: "Transport Complete"
      },      {
        id: 3,
        name: "Arrived",
        status: "completed",
        timestamp: "2025-06-05T17:45:00Z",
        location: "Davao Market"
      },
      {
        id: 4,
        name: "Payment",
        status: "completed",
        timestamp: "2025-06-05T18:00:00Z",
        location: "Delivered"
      }
    ]
  }
]

// Helper functions
export const getActiveDeliveries = () => {
  return deliveries.filter(delivery => delivery.currentStep < 4)
}

export const getCompletedDeliveries = () => {
  return deliveries.filter(delivery => delivery.currentStep === 4)
}

export const getDeliveryById = (id: string) => {
  return deliveries.find(delivery => delivery.id === id)
}

export const getDeliveryStats = () => {
  const total = deliveries.length
  const active = getActiveDeliveries().length
  const completed = getCompletedDeliveries().length
  const avgQuality = deliveries.reduce((sum, d) => sum + d.quality.score, 0) / total

  return {
    total,
    active,
    completed,
    avgQuality: Math.round(avgQuality)
  }
}

export const getStepDetails = (stepId: number): StepDetails => {
  const details = {
    1: {
      title: "Basket",
      description: "Fish being harvested from pond and collected in baskets",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    2: {
      title: "Delivery",
      description: "Fish packaged with ice and loaded for delivery",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    3: {
      title: "Arrived",
      description: "Package arrived at destination, awaiting confirmation",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    4: {
      title: "Payment",
      description: "Fish successfully delivered and payment processed",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  };
  return details[stepId as keyof typeof details];
}

export const formatDeliveryTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ago`
  }
  return `${minutes}m ago`
}