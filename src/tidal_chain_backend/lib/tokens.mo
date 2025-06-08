module {
    public type Token = {
        id: Text;
        species: Text;
        pond: Text;
        quantity: Text;
        harvestDate: Text;
        progress: Nat;
        status: Text; // e.g., "Active", "Harvested", "Sold"
        funded: Text;
        total: Text;
        daysRemaining: Nat;
        image: ?Text;
    };

    public func getTokenMockData() : [Token] {
        var mock_data: [Token] = [
            {
                id = "TF-001";
                species = "Tilapia";
                pond = "pond-a";
                quantity = "2,500 kg";
                harvestDate = "2024-03-15";
                progress = 75;
                status = "Growing";
                funded = "₱18;750";
                total = "₱25;000";
                daysRemaining = 12;
                image = ?"/fishTilapia.jpg";
            },
            {
                id = "TF-002";
                species = "Milkfish";
                pond = "pond-b";
                quantity = "1;800 kg";
                harvestDate = "2024-02-28";
                progress = 90;
                status = "Ready Soon";
                funded = "₱13;500";
                total = "₱15;000";
                daysRemaining = 5;
                image = ?"/fishMilkfish.jpg";
            },
            {
                id = "TF-003";
                species = "Pompano";
                pond = "pond-c";
                quantity = "3;200 kg";
                harvestDate = "2024-04-20";
                progress = 45;
                status = "Growing";
                funded = "₱28;800";
                total = "₱32;000";
                daysRemaining = 28;
                image = ?"/fishPompano.jpeg";
            },
        ];
        return mock_data;
    }
}