import Float "mo:base/Float";

module {
    public type Restaurant = {
        id: Text;
        name: Text;
        marketType: Text;
        location: Text;
        rating: Float;
        preferredFish: [Text];
        orderFrequency: Text;
        avgOrderSize: Text;
        priceRange: Text;
        specialRequirements: Text;
        lastOrder: Text;
        totalOrders: Float;
        preferredDelivery: Text;
        chefRating: Text;
        paymentTerms: Text;
        status: Text;
        image: ?Text;
    };

    public type MarketDemand = {
        species: Text;
        demandLevel: Text; // Hot, High, Medium, Low 
        avgFundingTime: Text; // will be changed to date for real implementation
        currentPrice: Text; // price types and price history will be implemented
        priceChange: Text; // percentage change in price
    };

    public type QualityPremium = {
        grade: Text;
        premiumPercentage: Text;
    };

    public type DemandChartData = {
        month: Text;
        Tilapia: Float;
        Milkfish: Float;
        Pompano: Float;
    };

    public type PriceChartData = {
        month: Text;
        Tilapia: Float;
        Milkfish: Float;
        Pompano: Float;
    };

    public type DemandVolumeData = {
        species: Text;
        volume: Nat;
        percentage: Nat;
    };

    public func getMockData() : [Restaurant] {
        var mock_data: [Restaurant] = [
            {
                id = "rai-food";
                name = "Rai-Food";
                marketType = "Fine Dining";
                location = "Iligan City, Philippines";
                rating = 4.8;
                preferredFish = ["Tilapia", "Milkfish", "Pompano"];
                orderFrequency = "Weekly";
                avgOrderSize= "150-200 kg";
                priceRange= "₱12-18/kg";
                specialRequirements= "Super Premium grade only";
                lastOrder= "3 days ago";
                totalOrders= 24;
                preferredDelivery= "Tuesday & Friday";
                chefRating= "Michelin 2-Star";
                paymentTerms= "Net 15";
                status= "Active";
                image= ?"/rai-rock.JPG";
            },
            {
                id = "sea-food-tail";
                name = "Sea Food Tail";
                marketType = "Seafood Specialist";
                location = "Iligan City, Philippines";
                rating = 4.7;
                preferredFish = ["Pompano", "Milkfish", "Tilapia"];
                orderFrequency = "Weekly";
                avgOrderSize = "100-150 kg";
                priceRange = "₱11-16/kg";
                specialRequirements = "Fresh daily delivery required";
                lastOrder = "5 days ago";
                totalOrders = 31;
                preferredDelivery = "Wednesday & Saturday";
                chefRating = "AAA Five Diamond";
                paymentTerms = "Net 15";
                status = "High Volume";
                image = ?"/seafood-tail.jpg";
            },
            {
                id = "sea-food-tail";
                name = "Sea Food Tail";
                marketType = "Seafood Specialist";
                location = "Iligan City, Philippines";
                rating = 4.7;
                preferredFish = ["Pompano", "Milkfish", "Tilapia"];
                orderFrequency = "Weekly";
                avgOrderSize = "100-150 kg";
                priceRange = "₱11-16/kg";
                specialRequirements = "Fresh daily delivery required";
                lastOrder = "5 days ago";
                totalOrders = 31;
                preferredDelivery = "Wednesday & Saturday";
                chefRating = "AAA Five Diamond";
                paymentTerms = "Net 15";
                status = "High Volume";
                image = ?"/seafood-tail.jpg";
            }
        ];
        return mock_data;
    };

    public func getMarketDemandMockData(): [MarketDemand] {
        var mock_data: [MarketDemand] = [
            {
                species = "Tilapia";
                demandLevel = "Hot";
                avgFundingTime = "1.8 days";
                currentPrice = "₱8.50/kg";
                priceChange = "+15.2%";
            },
            {
                species = "Milkfish";
                demandLevel = "High";
                avgFundingTime = "2.3 days";
                currentPrice = "₱12.80/kg";
                priceChange = "+10.5%";
            },
            {
                species = "Pompano";
                demandLevel = "High";
                avgFundingTime = "2.1 days";
                currentPrice = "₱16.20/kg";
                priceChange = "+18.7%";
            }
        ];
        return mock_data;
    };

    public func getQualityPremiumMockData(): [QualityPremium] {
        var mock_data: [QualityPremium] = [
            {
                grade = "Premium Grade";
                premiumPercentage = "+15%";
            },
            {
                grade = "Super Premium";
                premiumPercentage = "+25%";
            },
            {
                grade = "Organic Certified";
                premiumPercentage = "+30%";
            },
        ];
        return mock_data;
    };

    public func getDemandChartDataMock(): [DemandChartData] {
        var mock_data: [DemandChartData] = [
            { month = "Jan"; Tilapia = 85; Milkfish = 78; Pompano = 92; },
            { month = "Feb"; Tilapia = 88; Milkfish = 82; Pompano = 95; },
            { month = "Mar"; Tilapia = 92; Milkfish = 85; Pompano = 98; },
            { month = "Apr"; Tilapia = 95; Milkfish = 88; Pompano = 94; },
            { month = "May"; Tilapia = 98; Milkfish = 92; Pompano = 96; },
            { month = "Jun"; Tilapia = 100; Milkfish = 95; Pompano = 100; },
        ];
        return mock_data;
    };

    public func getPriceChartMockData(): [PriceChartData] {
        var mock_data: [PriceChartData] = [
            { month = "Jan"; Tilapia = 8; Milkfish = 12; Pompano = 16; },
            { month = "Feb"; Tilapia = 8.5; Milkfish = 12.5; Pompano = 16.5; },
            { month = "Mar"; Tilapia = 9; Milkfish = 13; Pompano = 17; },
            { month = "Apr"; Tilapia = 9.5; Milkfish = 13.5; Pompano = 17.5; },
            { month = "May"; Tilapia = 10; Milkfish = 14; Pompano = 18; },
            { month = "Jun"; Tilapia = 10.5; Milkfish = 14.5; Pompano = 18.5; },
        ];
        return mock_data;
    };

    public func getDemandVolumeMockData(): [DemandVolumeData] {
        var mock_data: [DemandVolumeData] = [
            { species = "Tilapia"; volume = 2450; percentage = 42;},
            { species = "Milkfish"; volume = 1890; percentage = 32;},
            { species = "Pompano"; volume = 1520; percentage = 26;},
        ];
        return mock_data;
    };
}