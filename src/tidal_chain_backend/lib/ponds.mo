module {
    public type Pond = {
        id: Text;
        name: Text;
        location: Text;
        size: Text; // in square meters
        capacity: Text;
        utilization: Nat;
        currentStock: Text;
        status: Text;
        waterTemp: Text;
        oxygenLevel: Text;
        phLevel: Text;
        lastFed: Text;
        activeTokens: Nat;
        totalValue: Text;
        image: ?Text; // Optional image of the pond
    };

    public func getPondMockData() : [Pond] {
        var mock_data: [Pond] = [
            {
                id = "pond-a";
                name = "Pond A";
                location = "North Sector";
                size = "2,500 m²";
                capacity = "15,000 kg";
                currentStock = "12,500 kg";
                utilization = 83;
                status = "optimal";
                waterTemp = "18.5°C";
                oxygenLevel = "8.2 mg/L";
                phLevel = "7.1";
                lastFed = "2 hours ago";
                activeTokens = 3;
                totalValue = "₱45,000";
                image = ?"/pondA.jpg";
            },
            {
                id = "pond-b";
                name = "Pond B";
                location = "East Sector";
                size = "1,800 m²";
                capacity = "10,000 kg";
                currentStock = "8,200 kg";
                utilization = 82;
                status = "good";
                waterTemp = "17.8°C";
                oxygenLevel = "7.9 mg/L";
                phLevel = "7.3";
                lastFed = "1 hour ago";
                activeTokens = 2;
                totalValue = "₱28,000";
                image = ?"/pondB.jpg";
            },
            {
                id = "pond-c";
                name = "Pond C";
                location = "South Sector";
                size = "3,200 m²";
                capacity = "20,000 kg";
                currentStock = "16,800 kg";
                utilization = 84;
                status = "attention";
                waterTemp = "19.2°C";
                oxygenLevel = "7.5 mg/L";
                phLevel = "6.9";
                lastFed = "30 minutes ago";
                activeTokens = 4;
                totalValue = "₱62,000";
                image = ?"/pondC.jpg";
            }
        ];
        return mock_data;
    };
}