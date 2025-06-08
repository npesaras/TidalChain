// Detailed token data for TidalFi platform
// This file contains comprehensive token information including producer details, 
// harvest data, sustainability metrics, IoT monitoring, and transaction history
import {
  DetailedToken, 
  HarvestDetails, 
  Investment, 
  Certificate, 
  SustainabilityMetrics, 
  IoTData, 
  TimelineEvent, 
  Transaction,
  Document
} from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"

// export interface Producer {
//   name: string
//   location: string
//   avatar: string
//   rating: number
//   totalHarvests: number
//   sustainabilityScore: number
//   certifications: string[]
//   joinDate: string
//   bio: string
// }

// export interface HarvestDetails {
//   quantity: string
//   totalValue: string
//   pricePerKg: string
//   harvestDate: string
//   location: string
//   coordinates: string
//   waterDepth: string
//   cageSize: string
//   stockingDate: string
//   expectedYield: string
//   currentWeight: string
//   growthProgress?: number
//   status?: string
// }

// export interface Investment {
//   totalValue: number
//   funded: number
//   fundingProgress: number
//   investors: number
//   expectedROI: string
//   daysLeft: number
//   soldTokens: number
// }

// export interface SustainabilityMetrics {
//   overallScore: number
//   waterQuality: number
//   feedEfficiency: number
//   carbonFootprint: number
//   animalWelfare: number
//   certifications: Array<{
//     name: string
//     status: string
//     expires: string
//   }>
// }

// export interface IoTData {
//   temperature: number
//   oxygen: number
//   ph: number
//   salinity: number
//   turbidity: number
//   lastUpdated: string
//   alerts: string[]
// }

// export interface TimelineEvent { 
//   date: string
//   event: string
//   type: string
//   details: string
// }

// export interface Transaction {
//   date: string
//   investor: string
//   amount: string
//   tokens: number
//   type: string
// }

// export interface Document {
//   name: string
//   type: string
//   size: string
// }

// export interface DetailedToken {
//   id: string
//   species: string
//   producer: Producer
//   harvest: HarvestDetails
//   investment: Investment
//   sustainability: SustainabilityMetrics
//   iotData: IoTData
//   timeline: TimelineEvent[]
//   transactions: Transaction[]
//   documents: Document[]
// }

import { serviceMakeActor } from "@/service/actor";

// Helper functions
export const getDetailedTokenById = (detailedTokens: DetailedToken[], id: string): DetailedToken | undefined => {
  return detailedTokens.find(token => token.id === id)
}

export const getTokensByProducer = (detailedTokens: DetailedToken[], producerName: string): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.producer.account.toLowerCase().includes(producerName.toLowerCase())
  )
}

export const getTokensBySpecies = (detailedTokens: DetailedToken[], species: string): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.species.toLowerCase().includes(species.toLowerCase())
  )
}

export const getActiveDetailedTokens = (detailedTokens: DetailedToken[]): DetailedToken[] => {
  return detailedTokens.filter(token => 
    (token.harvest.status.length == 0) || (token.harvest.status[0] !== "Harvested") // debug later
  )
}

export const getTokensByFundingProgress = (detailedTokens: DetailedToken[], minProgress: number): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.investment.fundingProgress >= minProgress
  )
}

export const getHighPerformingTokens = (detailedTokens: DetailedToken[], ): DetailedToken[] => {
  return detailedTokens.filter(token => 
    token.sustainability.overallScore >= 90
  )
}

export const getTotalDetailedTokenValue = (detailedTokens: DetailedToken[], ): number => {
  return detailedTokens.reduce((sum, token) => sum + parseInt(token.investment.totalValue.toString()), 0)
}

export const getTotalFundedAmount = (detailedTokens: DetailedToken[], ): number => {
  return detailedTokens.reduce((sum, token) => sum + parseInt(token.investment.funded.toString()), 0)
}

export const getAverageSustainabilityScore = (detailedTokens: DetailedToken[], ): number => {
  const totalScore = detailedTokens.reduce((sum, token) => sum + parseInt(token.sustainability.overallScore.toString()), 0)
  return Math.round(totalScore / detailedTokens.length)
}

export const getTokensNearHarvest = (detailedTokens: DetailedToken[], daysThreshold: number = 30): DetailedToken[] => {
  return detailedTokens.filter(token => token.investment.daysLeft <= daysThreshold)
}
