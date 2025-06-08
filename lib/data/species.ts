import { SpeciesRevenue } from "@/src/declarations/tidal_chain_backend/tidal_chain_backend.did"


// export const speciesRevenue: SpeciesRevenue[] = [
//   {
//     id: "tilapia",
//     name: "Tilapia",
//     revenue: 180450,
//     percentage: 36,
//     color: "bg-blue-500"
//   },
//   {
//     id: "milkfish",
//     name: "Milkfish", 
//     revenue: 150230,
//     percentage: 30,
//     color: "bg-green-500"
//   },
//   {
//     id: "pompano",
//     name: "Pompano",
//     revenue: 120890,
//     percentage: 24,
//     color: "bg-purple-500"
//   }
// ]

export function getSpeciesRevenue(speciesRevenue: SpeciesRevenue[]): SpeciesRevenue[] {
  return speciesRevenue
}

export function getTotalSpeciesRevenue(speciesRevenue: SpeciesRevenue[]): number {
  return speciesRevenue.reduce((total, species) => total + parseInt(species.revenue.toString()), 0)
}

export function getSpeciesById(speciesRevenue: SpeciesRevenue[], id: string): SpeciesRevenue | undefined {
  return speciesRevenue.find(species => species.id === id)
}

export function formatCurrency(amount: number): string {
  return `₱${amount.toLocaleString()}`
}
