// Static token data for the viewToken page
// This represents a single token that will be displayed on the static viewToken page

import { DetailedToken } from "./detailedTokens"

export const staticToken: DetailedToken = {
  id: "TF-001",
  species: "Tilapia",
  producer: {
    name: "Philippine Aqua Farm",
    location: "Laguna, Philippines",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalHarvests: 52,
    sustainabilityScore: 92,
    certifications: ["BAP 3-Star", "Organic Certified", "Local Sustainable"],
    joinDate: "2020",
    bio: "Local Filipino aquaculture farm specializing in sustainable tilapia production in freshwater ponds for over 15 years.",
  },
  harvest: {
    quantity: "2,500 kg",
    totalValue: "₱25,000",
    pricePerKg: "₱10.00",
    harvestDate: "2024-03-15",
    location: "Pond A - Section 2",
    coordinates: "14.1753° N, 121.1348° E",
    waterDepth: "3 meters",
    cageSize: "30m x 20m",
    stockingDate: "2023-05-01",
    expectedYield: "2,500 kg",
    currentWeight: "450g avg",
    growthProgress: 75,
    status: "Growing",
  },
  investment: {
    totalValue: 25000,
    funded: 18750,
    fundingProgress: 75,
    investors: 37,
    expectedROI: "12-15%",
    daysLeft: 12,
    soldTokens: 1875,
  },
  sustainability: {
    overallScore: 92,
    waterQuality: 88,
    feedEfficiency: 95,
    carbonFootprint: 90,
    animalWelfare: 94,
    certifications: [
      { name: "BAP 3-Star", status: "Active", expires: "2025-08-01" },
      { name: "Organic Certified", status: "Active", expires: "2024-12-15" },
      { name: "Local Sustainable", status: "Active", expires: "2025-03-30" },
    ],
  },
  iotData: {
    temperature: 28.5,
    oxygen: 6.8,
    ph: 7.2,
    salinity: 0.5,
    turbidity: 15,
    lastUpdated: "2024-01-15 14:30:00",
    alerts: [],
  },
  timeline: [
    {
      date: "2024-01-15",
      event: "Growth Milestone Reached",
      type: "milestone",
      details: "Our tilapia have reached an average weight of 450g, marking excellent growth progress.",
    },
    {
      date: "2024-01-10",
      event: "Water Quality Update",
      type: "update",
      details: "All water parameters remain within optimal ranges. Recent heavy rains required minor adjustments to pH levels.",
    },
    {
      date: "2024-01-05",
      event: "Feeding Schedule Optimization",
      type: "update",
      details: "Implemented new feeding schedule based on latest growth data, expecting 5% improvement in feed efficiency.",
    },
  ],
  transactions: [
    {
      date: "2024-01-15",
      investor: "Maria Santos",
      amount: "₱500",
      tokens: 50,
      type: "Purchase",
    },
    {
      date: "2024-01-14",
      investor: "John Dela Cruz",
      amount: "₱250",
      tokens: 25,
      type: "Purchase",
    },
    {
      date: "2024-01-13",
      investor: "Investment Group Alpha",
      amount: "₱1,000",
      tokens: 100,
      type: "Purchase",
    },
    {
      date: "2024-01-12",
      investor: "Sarah Johnson",
      amount: "₱750",
      tokens: 75,
      type: "Purchase",
    },
    {
      date: "2024-01-11",
      investor: "Local Seafood Co.",
      amount: "₱300",
      tokens: 30,
      type: "Purchase",
    },
  ],
  documents: [
    {
      name: "Harvest Plan 2024",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      name: "Sustainability Report",
      type: "PDF",
      size: "1.8 MB",
    },
    {
      name: "Water Quality Analysis",
      type: "PDF",
      size: "950 KB",
    },
  ],
}
