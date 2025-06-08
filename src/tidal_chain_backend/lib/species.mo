module {
    public type SpeciesRevenue = {
        id: Text;
        name: Text;
        revenue: Nat;
        percentage: Nat;
        color: Text;
    };

    public func getSpeciesRevenueMockData() : [SpeciesRevenue] {
        var mock_data: [SpeciesRevenue] = [
            {
                id = "tilapia";
                name = "Tilapia";
                revenue = 180450;
                percentage = 36;
                color = "bg-blue-500";
            },
            {
                id = "milkfish";
                name = "Milkfish";
                revenue = 150230;
                percentage = 30;
                color = "bg-green-500";
            },
            {
                id = "pompano";
                name = "Pompano";
                revenue = 120890;
                percentage = 24;
                color = "bg-purple-500";
            },
        ];
        return mock_data;
    };


}