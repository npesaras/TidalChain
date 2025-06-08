// Market data for TidalFi platform
import {
  Restaurant,
  MarketDemand,
  QualityPremium,
  DemandChartData,
  PriceChartData,
  DemandVolumeData
} from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"


// export interface Restaurant {
//   id: string
//   name: string
//   type: string
//   location: string
//   rating: number
//   preferredFish: string[]
//   orderFrequency: string
//   avgOrderSize: string
//   priceRange: string
//   specialRequirements: string
//   lastOrder: string
//   totalOrders: number
//   preferredDelivery: string
//   chefRating: string
//   paymentTerms: string
//   status: "Active" | "High Volume" | "Premium Partner" | "Growing"
//   image?: string
// }

// export interface MarketDemand {
//   species: string
//   demandLevel: "Hot" | "High" | "Medium" | "Low"
//   avgFundingTime: string
//   currentPrice: string
//   priceChange: string
// }

// export interface QualityPremium {
//   grade: string
//   premiumPercentage: string
// }

// // Chart data interfaces
// export interface DemandChartData {
//   month: string
//   Tilapia: number
//   Milkfish: number
//   Pompano: number
// }

// export interface PriceChartData {
//   month: string
//   Tilapia: number
//   Milkfish: number
//   Pompano: number
// }

// export interface DemandVolumeData {
//   species: string
//   volume: number
//   percentage: number
// }


// Helper functions
export const getRestaurantById = (restaurants: Restaurant[], id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id)
}

export const getRestaurantsByType = (restaurants: Restaurant[], type: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.marketType.toLowerCase().includes(type.toLowerCase()))
}

export const getRestaurantsBySpecies = (restaurants: Restaurant[], species: string): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.preferredFish.some(fish => 
      fish.toLowerCase().includes(species.toLowerCase())
    )
  )
}

export const getHighVolumeRestaurants = (restaurants: Restaurant[], ): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.status === "High Volume" || restaurant.status === "Premium Partner"
  )
}

export const getMarketDemandBySpecies = (marketDemand: MarketDemand[], species: string): MarketDemand | undefined => {
  return marketDemand.find(demand => 
    demand.species.toLowerCase().includes(species.toLowerCase())
  )
}

export const getHighDemandSpecies = (marketDemand: MarketDemand[]): MarketDemand[] => {
  return marketDemand.filter(demand => 
    demand.demandLevel === "Hot" || demand.demandLevel === "High"
  )
}

export const getAverageMarketPrice = (marketDemand: MarketDemand[]): string => {
  const totalPrice = marketDemand.reduce((sum, demand) => {
    const price = parseFloat(demand.currentPrice.replace(/[₱,]/g, ''))
    return sum + price
  }, 0)
  const avgPrice = totalPrice / marketDemand.length
  return `₱${avgPrice.toFixed(2)}/kg`
}

export const getTotalRestaurants = (restaurants: Restaurant[]): number => {
  return restaurants.length
}

export const getRestaurantsByStatus = (restaurants: Restaurant[], status: Restaurant['status']): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.status === status)
}

// Chart helper functions
export const getDemandTrend = (demandChartData: DemandChartData[], species: string): number => {
  if (!demandChartData || demandChartData.length === 0) return 0;
  const latest = demandChartData[demandChartData.length - 1]
  if (!latest) return 0;
  const previous = demandChartData[demandChartData.length - 2]
  if (!previous) return 0;
  
  const latestValue = latest[species as keyof DemandChartData] as number
  const previousValue = previous[species as keyof DemandChartData] as number
  
  return ((latestValue - previousValue) / previousValue) * 100
}

export const getPriceTrend = (priceChartData: PriceChartData[], species: string): number => {
  if (!priceChartData || priceChartData.length === 0) return 0;
  const latest = priceChartData[priceChartData.length - 1]
  if (!latest) return 0;
  const previous = priceChartData[priceChartData.length - 2]
  if (!previous) return 0;

  const latestValue = latest[species as keyof PriceChartData] as number
  const previousValue = previous[species as keyof PriceChartData] as number
  
  return ((latestValue - previousValue) / previousValue) * 100
}

export const getTopDemandSpecies = (demandChartData: DemandChartData[]): { species: string; demand: number }[] => {
  if (!demandChartData || demandChartData.length === 0) return [];
  const latest = demandChartData[demandChartData.length - 1]
  if (!latest) return [];
  return [
    { species: 'Tilapia', demand: latest.Tilapia },
    { species: 'Milkfish', demand: latest.Milkfish },
    { species: 'Pompano', demand: latest.Pompano }
  ].sort((a, b) => b.demand - a.demand)
}

export const getHighestPriceSpecies = (priceChartData: PriceChartData[]): { species: string; price: number }[] => {
  if (!priceChartData || priceChartData.length === 0) return [];

  const latest = priceChartData[priceChartData.length - 1]
  if (!latest) return [];
  return [
    { species: 'Tilapia', price: latest.Tilapia },
    { species: 'Milkfish', price: latest.Milkfish },
    { species: 'Pompano', price: latest.Pompano }
  ].sort((a, b) => b.price - a.price)
}
