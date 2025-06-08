import { Pond } from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"

// Helper functions
export const getPondById = (ponds: Pond[], id: string): Pond | undefined => {
  return ponds.find(pond => pond.id === id)
}

export const getTotalPonds = (ponds: Pond[]): number => {
  return ponds.length
}

export const getTotalCapacity = (ponds: Pond[]): string => {
  const totalCapacityKg = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.capacity.replace(/[^0-9]/g, ''))
  }, 0)
  return `${totalCapacityKg.toLocaleString()} kg`
}

export const getTotalCurrentStock = (ponds: Pond[]): string => {
  const totalStockKg = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.currentStock.replace(/[^0-9]/g, ''))
  }, 0)
  return `${totalStockKg.toLocaleString()} kg`
}

export const getTotalActiveTokens = (ponds: Pond[]): number => {
  return ponds.reduce((sum, pond) => sum + parseInt(pond.activeTokens.toString()), 0)
}

export const getTotalValue = (ponds: Pond[]): string => {
  const totalValue = ponds.reduce((sum, pond) => {
    return sum + parseInt(pond.totalValue.replace(/[₱,]/g, ''))
  }, 0)
  return `₱${totalValue.toLocaleString()}`
}