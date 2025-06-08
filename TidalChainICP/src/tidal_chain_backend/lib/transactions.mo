module {
    public type Transaction = {
        id: Text;
        transactionType: Text; // e.g., "Investment", "Harvest", "Sale"
        title: Text;
        description: Text;
        amount: Text;
        timestamp: Text;
        status: Text; // "Pending", "Completed", "Failed"
        relatedTokenId: ?Text;
        relatedPondId: ?Text;
        investorName: ?Text;
        icon: Text; // the data of the icon is to be used in the frontend
    };

    public func getTransactionMockData(): [Transaction] {
        var mock_data: [Transaction] = [
            {
                id = "txn_001";
                transactionType = "investment";
                title = "New Investment Received";
                description = "Maria Santos invested in Atlantic Salmon Token #AST-001";
                amount = "₱15,000";
                timestamp = "2025-06-03T08:30:00Z";
                status = "completed";
                relatedTokenId = ?"AST-001";
                relatedPondId = null;
                investorName = ?"Maria Santos";
                icon = "TrendingUp";
            },
            {
                id = "txn_002";
                transactionType = "funding_complete";
                title = "Token Fully Funded";
                description = "Rainbow Trout Token #RTT-002 reached 100% funding goal";
                amount ="₱85,000";
                timestamp = "2025-06-03T07:15:00Z";
                status = "completed";
                relatedTokenId = ?"RTT-002";
                relatedPondId = null;
                investorName = null;
                icon = "CheckCircle";
            },
            {
                id = "txn_003";
                transactionType = "harvest";
                title = "Harvest Completed";
                description = "Successfully harvested 2,500kg Sea Bass from Pond A1";
                amount = "₱390,000";
                timestamp = "2025-06-02T14:20:00Z";
                status = "completed";
                relatedTokenId = ?"SBT-003";
                relatedPondId = ?"pond_001";
                investorName = null;
                icon = "Fish";
            },
            {
                id = "txn_004";
                transactionType = "payment";
                title = "Investor Payment Sent";
                description = "ROI payment distributed to 12 investors for Token #AST-001";
                amount = "₱52,750";
                timestamp = "2025-06-02T11:45:00Z";
                status = "completed";
                relatedTokenId = ?"AST-001";
                relatedPondId = null;
                investorName = null;
                icon = "DollarSign";
            },
            {
                id = "txn_005";
                transactionType = "token_creation";
                title = "New Token Created";
                description = "Arctic Char Token #ACT-005 created for Pond B2";
                amount = "₱120,000";
                timestamp = "2025-06-01T16:30:00Z";
                status = "completed";
                relatedTokenId = ?"ACT-005";
                relatedPondId = ?"pond_003";
                investorName = null;
                icon = "Plus";
            },
            {
                id = "txn_006";
                transactionType = "investment";
                title = "Investment Received";
                description = "Carlos Rodriguez invested in Sea Bass Token #SBT-003";
                amount = "₱25,000";
                timestamp = "2025-06-01T13:22:00Z";
                status = "completed";
                relatedTokenId = ?"SBT-003";
                relatedPondId = null;
                investorName = ?"Carlos Rodriguez";
                icon = "TrendingUp";
            },
            {
                id = "txn_007";
                transactionType = "withdrawal";
                title = "Funds Withdrawn";
                description = "Withdrew earnings to bank account ending in 4521";
                amount = "₱75,000";
                timestamp = "2025-05-31T10:15:00Z";
                status = "completed";
                relatedTokenId = null;
                relatedPondId = null;
                investorName = null;
                icon = "ArrowUpRight";
            },
            {
                id = "txn_008";
                transactionType = "investment";
                title = "Investment Received";
                description = "Ana Dela Cruz invested in Rainbow Trout Token #RTT-002";
                amount = "₱18,500";
                timestamp = "2025-05-31T09:08:00Z";
                status = "completed";
                relatedTokenId = ?"RTT-002";
                relatedPondId = null;
                investorName = ?"Ana Dela Cruz";
                icon = "TrendingUp";
            },
            {
                id = "txn_009";
                transactionType = "payment";
                title = "Investor Payment Pending";
                description = "Processing ROI payment for Token #RTT-001 investors";
                amount = "₱43,200";
                timestamp = "2025-05-30T15:45:00Z";
                status = "pending";
                relatedTokenId = ?"RTT-001";
                relatedPondId = null;
                investorName = null;
                icon = "Clock";
            },
            {
                id = "txn_010";
                transactionType = "harvest";
                title = "Harvest Scheduled";
                description = "Atlantic Salmon harvest scheduled for Pond A3";
                amount = "₱320,000";
                timestamp = "2025-05-30T08:00:00Z";
                status = "pending";
                relatedTokenId = ?"AST-004";
                relatedPondId = ?"pond_002";
                investorName = null;
                icon = "Calendar";
            }
        ];
        return mock_data;
    }
}