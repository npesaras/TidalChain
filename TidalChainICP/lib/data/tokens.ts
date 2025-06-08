import { 
  Token 
} from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"


// export const tokens: Token[] = [
//   {
//     id: "TF-001",
//     species: "Tilapia",
//     pond: "pond-a",
//     quantity: "2,500 kg",
//     harvestDate: "2024-03-15",
//     progress: 75,
//     status: "Growing",
//     funded: "₱18,750",
//     total: "₱25,000",
//     daysRemaining: 12,
//     image: "/fishTilapia.jpg",
//   },
//   {
//     id: "TF-002",
//     species: "Milkfish",
//     pond: "pond-b",
//     quantity: "1,800 kg",
//     harvestDate: "2024-02-28",
//     progress: 90,
//     status: "Ready Soon",
//     funded: "₱13,500",
//     total: "₱15,000",
//     daysRemaining: 5,
//     image: "/fishMilkfish.jpg",
//   },
//   {
//     id: "TF-003",
//     species: "Pompano",
//     pond: "pond-c",
//     quantity: "3,200 kg",
//     harvestDate: "2024-04-20",
//     progress: 45,
//     status: "Growing",
//     funded: "₱28,800",
//     total: "₱32,000",
//     daysRemaining: 28,
//     image: "/fishPompano.jpeg",
//   },
// ]

// Helper functions
export const getTokenById = (tokens: Token[], id: string): Token | undefined => {
  return tokens.find(token => token.id === id)
}

export const getTokensByPond = (tokens: Token[], pondId: string): Token[] => {
  return tokens.filter(token => token.pond === pondId)
}

export const getTotalTokensCount = (tokens: Token[], ): number => {
  return tokens.length
}

export const getTotalTokenValue = (tokens: Token[], ): number => {
  return tokens.reduce((sum, token) => {
    return sum + parseInt(token.total.replace(/[₱,]/g, ''))
  }, 0)
}

export const getTokensByStatus = (tokens: Token[], status: String): Token[] => {
  return tokens.filter(token => token.status.toLowerCase() === status.toLowerCase())
}

export const getActiveTokensCount = (tokens: Token[]): number => {
  return tokens.filter(token => token.status !== "Harvested").length
}