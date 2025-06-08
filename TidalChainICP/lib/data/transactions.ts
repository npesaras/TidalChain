// Transaction/Activity data for TidalFi platform
import { Transaction } from "@/components/declarations/tidal_chain_backend.did"

// export interface Transaction {
//   id: string
//   type: "investment" | "token_creation" | "harvest" | "payment" | "withdrawal" | "funding_complete"
//   title: string
//   description: string
//   amount?: string
//   timestamp: string
//   status: "completed" | "pending" | "failed"
//   relatedTokenId?: string
//   relatedPondId?: string
//   investorName?: string
//   icon: string
// }

// export const transactions: Transaction[] = [
//   {
//     id: "txn_001",
//     type: "investment",
//     title: "New Investment Received",
//     description: "Maria Santos invested in Atlantic Salmon Token #AST-001",
//     amount: "₱15,000",
//     timestamp: "2025-06-03T08:30:00Z",
//     status: "completed",
//     relatedTokenId: "AST-001",
//     investorName: "Maria Santos",
//     icon: "TrendingUp"
//   },
//   {
//     id: "txn_002",
//     type: "funding_complete",
//     title: "Token Fully Funded",
//     description: "Rainbow Trout Token #RTT-002 reached 100% funding goal",
//     amount: "₱85,000",
//     timestamp: "2025-06-03T07:15:00Z",
//     status: "completed",
//     relatedTokenId: "RTT-002",
//     icon: "CheckCircle"
//   },
//   {
//     id: "txn_003",
//     type: "harvest",
//     title: "Harvest Completed",
//     description: "Successfully harvested 2,500kg Sea Bass from Pond A1",
//     amount: "₱390,000",
//     timestamp: "2025-06-02T14:20:00Z",
//     status: "completed",
//     relatedTokenId: "SBT-003",
//     relatedPondId: "pond_001",
//     icon: "Fish"
//   },
//   {
//     id: "txn_004",
//     type: "payment",
//     title: "Investor Payment Sent",
//     description: "ROI payment distributed to 12 investors for Token #AST-001",
//     amount: "₱52,750",
//     timestamp: "2025-06-02T11:45:00Z",
//     status: "completed",
//     relatedTokenId: "AST-001",
//     icon: "DollarSign"
//   },
//   {
//     id: "txn_005",
//     type: "token_creation",
//     title: "New Token Created",
//     description: "Arctic Char Token #ACT-005 created for Pond B2",
//     amount: "₱120,000",
//     timestamp: "2025-06-01T16:30:00Z",
//     status: "completed",
//     relatedTokenId: "ACT-005",
//     relatedPondId: "pond_003",
//     icon: "Plus"
//   },
//   {
//     id: "txn_006",
//     type: "investment",
//     title: "Investment Received",
//     description: "Carlos Rodriguez invested in Sea Bass Token #SBT-003",
//     amount: "₱25,000",
//     timestamp: "2025-06-01T13:22:00Z",
//     status: "completed",
//     relatedTokenId: "SBT-003",
//     investorName: "Carlos Rodriguez",
//     icon: "TrendingUp"
//   },
//   {
//     id: "txn_007",
//     type: "withdrawal",
//     title: "Funds Withdrawn",
//     description: "Withdrew earnings to bank account ending in 4521",
//     amount: "₱75,000",
//     timestamp: "2025-05-31T10:15:00Z",
//     status: "completed",
//     icon: "ArrowUpRight"
//   },
//   {
//     id: "txn_008",
//     type: "investment",
//     title: "Investment Received",
//     description: "Ana Dela Cruz invested in Rainbow Trout Token #RTT-002",
//     amount: "₱18,500",
//     timestamp: "2025-05-31T09:08:00Z",
//     status: "completed",
//     relatedTokenId: "RTT-002",
//     investorName: "Ana Dela Cruz",
//     icon: "TrendingUp"
//   },
//   {
//     id: "txn_009",
//     type: "payment",
//     title: "Investor Payment Pending",
//     description: "Processing ROI payment for Token #RTT-001 investors",
//     amount: "₱43,200",
//     timestamp: "2025-05-30T15:45:00Z",
//     status: "pending",
//     relatedTokenId: "RTT-001",
//     icon: "Clock"
//   },
//   {
//     id: "txn_010",
//     type: "harvest",
//     title: "Harvest Scheduled",
//     description: "Atlantic Salmon harvest scheduled for Pond A3",
//     amount: "₱320,000",
//     timestamp: "2025-05-30T08:00:00Z",
//     status: "pending",
//     relatedTokenId: "AST-004",
//     relatedPondId: "pond_002",
//     icon: "Calendar"
//   }
// ]

// Helper functions


function getValidDate(value: any): Date {
  if (Array.isArray(value)) {
    if (value.length > 0) return new Date(value[0]);
    return new Date(0); // epoch, as fallback for empty array
  }
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    return new Date(value);
  }
  return new Date(0); // fallback for other invalid values
}

export const getRecentTransactions = (transactions: Transaction[], limit: number = 5): Transaction[] => {
  return transactions
    .sort(
      (a, b) =>
        getValidDate(b.timestamp).getTime() - getValidDate(a.timestamp).getTime()
    )
    .slice(0, limit);
};

export const getTransactionsByType = (transactions: Transaction[], type: Transaction['transactionType']): Transaction[] => {
  return transactions.filter(txn => txn.transactionType === type)
}

export const getTransactionsByStatus = (transactions: Transaction[], status: Transaction['status']): Transaction[] => {
  return transactions.filter(txn => txn.status === status)
}

export const getTotalTransactionValue = (transactions: Transaction[], ): string => {
  const total = transactions
    .filter(txn => txn.amount && txn.status === 'completed')
    .reduce((sum, txn) => {
      const amount = parseInt(txn.amount[0]!.replace(/[^0-9]/g, ''))
      return sum + amount
    }, 0)
  
  return `₱${total.toLocaleString()}`
}

export const formatTransactionTime = (timestamp: string): string => {
  const now = new Date()
  const txnTime = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - txnTime.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - txnTime.getTime()) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}
