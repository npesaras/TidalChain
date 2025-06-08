module {
    public type Producer = {
        account: Text;
        location: Text;
        avatar: Text;
        rating: Float;
        totalHarvests: Nat;
        sustainabilityScore: Nat;
        certifications: [Text];
        joinDate: Text;
        bio: Text;
    };

    public type HarvestDetails = {
        quantity: Text;
        totalValue: Text;
        pricePerKg: Text;
        location: Text;
        coordinates: Text;
        WaterDepth: Text;
        cageSize: Text;
        stockingDate: Text;
        expectedYield: Text;
        currentWeight: Text;
        growthProcess: ?Text ;
        status: ?Text;
    };

    public type Investment = {
        totalValue: Nat;
        funded: Nat;
        fundingProgress: Nat;
        expectedROI: Text;
        daysLeft: Nat;
        investors: ?Nat;
        soldTokens: Nat;
    };

    public type Certificate = {
        name: Text;
        status: Text;
        expires: Text;
    };

    public type SustainabilityMetrics = {
        overallScore: Nat;
        waterQuality: Nat;
        feedEfficiency: Nat;
        carbonFootprint: Nat;
        animalWelfare: Nat;
        certifications: [Certificate];
    };

    public type IoTData = {
        temperature: Float;
        oxygen: Float;
        ph: Float;
        salinity: Float;
        turbidity: Float;
        lastUpdated: Text;
        alerts: [Text];
    };

    public type TimelineEvent = {
        date: Text;
        description: Text;
        timelineType: Text; 
        details: Text; 
    };

    public type Transaction = {
        date: Text;
        investor: Text;
        amount: Text;
        tokens: Nat;
        transactionType: Text;
    };
    
    public type Document = {
        name: Text;
        documentType: Text;
        size: Text;
    };

    public type DetailedToken = {
        id: Text;
        species: Text;
        producer: Producer;
        harvest: HarvestDetails;
        investment : Investment;
        sustainability: SustainabilityMetrics;
        ioTData: IoTData;
        timeline: [TimelineEvent];
        transactions: [Transaction];
        documents: [Document];
    };

    public func getMockData() : [DetailedToken] {
    var detailedTokensData: [DetailedToken] = [
      {
        id = "TF-001";
        species = "Atlantic Salmon";
        producer = {
          account = "Nordic Aqua Farm";
          location = "Trondheim, Norway";
          avatar = "/placeholder.svg?height=40&width=40";
          rating = 4.9;
          totalHarvests = 47;
          sustainabilityScore = 95;
          certifications = ["ASC", "BAP 4-Star", "Carbon Neutral"];
          joinDate = "2019";
          bio = "Family-owned sustainable salmon farm operating in the pristine fjords of Norway for over 30 years.";
        };
        harvest = {
          quantity = "2,500 kg";
          totalValue = "₱25,000";
          pricePerKg = "₱10.00";
          location = "Farm A - Sector 3";
          coordinates = "63.4305° N, 10.3951° E";
          WaterDepth = "25 meters";
          cageSize = "50m x 50m";
          stockingDate = "2023-05-01";
          expectedYield = "2,500 kg";
          currentWeight = "4.2 kg avg";
          growthProcess = null;
          status = ?"Growing";
        };
        investment = {
          totalValue = 25000;
          funded = 18750;
          fundingProgress = 75;
          expectedROI = "0"; // Not a string in Motoko type, so set to 0 or adjust type if needed
          daysLeft = 12;
          soldTokens = 1875;
          investors = ?0;
        };
        sustainability = {
          overallScore = 95;
          waterQuality = 92;
          feedEfficiency = 98;
          carbonFootprint = 94;
          animalWelfare = 96;
          certifications = [
            { name = "ASC"; status = "Active"; expires = "2025-06-01"; },
            { name = "BAP 4-Star"; status = "Active"; expires = "2024-12-15"; },
            { name = "Carbon Neutral"; status = "Active"; expires = "2024-11-30"; }
          ];
        };
        ioTData = {
          temperature = 18;
          oxygen = 8;
          ph = 7;
          salinity = 34;
          turbidity = 2;
          lastUpdated = "2024-01-20T10:30:00Z";
          alerts = [];
        };
        timeline = [
          { date = "2024-01-20"; description = "IoT sensors report optimal conditions"; timelineType = "monitoring"; details = "All parameters within ideal ranges"; },
          { date = "2024-01-18"; description = "Monthly health inspection completed"; timelineType = "inspection"; details = "100% fish health score, no mortality detected"; },
          { date = "2024-01-15"; description = "Feeding optimization implemented"; timelineType = "management"; details = "New AI-driven feeding schedule reduces waste by 12%"; },
          { date = "2024-01-10"; description = "Funding milestone reached"; timelineType = "funding"; details = "75% funding target achieved"; }
        ];
        transactions = [
          { date = "2024-01-20"; investor = "EcoInvestor.icp"; amount = "₱2,500"; tokens = 250; transactionType = "purchase"; },
          { date = "2024-01-18"; investor = "GreenFund.icp"; amount = "₱5,000"; tokens = 500; transactionType = "purchase"; },
          { date = "2024-01-15"; investor = "SustainableCapital.icp"; amount = "₱1,000"; tokens = 100; transactionType = "purchase"; }
        ];
        documents = [
          { name = "Sustainability Report Q4 2023"; documentType = "PDF"; size = "2.4 MB"; },
          { name = "Health Inspection Certificate"; documentType = "PDF"; size = "1.1 MB"; },
          { name = "ASC Certification"; documentType = "PDF"; size = "856 KB"; }
        ];
      },
      {
        id = "TF-002";
        species = "Rainbow Trout";
        producer = {
          account = "Mountain Stream Farms";
          location = "Colorado, USA";
          avatar = "/placeholder.svg?height=40&width=40";
          rating = 4.7;
          totalHarvests = 32;
          sustainabilityScore = 88;
          certifications = ["Organic Certified", "BAP 4-Star"];
          joinDate = "2020";
          bio = "High-altitude sustainable trout farming with focus on clean mountain water and organic practices.";
        };
        harvest = {
          quantity = "1,800 kg";
          totalValue = "₱15,000";
          pricePerKg = "₱8.33";
          location = "Mountain Farm - Tank B";
          coordinates = "39.7392° N, 104.9903° W";
          WaterDepth = "3 meters";
          cageSize = "30m x 20m";
          stockingDate = "2023-04-15";
          expectedYield = "1,800 kg";
          currentWeight = "1.2 kg avg";
          growthProcess = ?"90";
          status = ?"Ready Soon";
        };
        investment = {
          totalValue = 15000;
          funded = 13500;
          investors = ?0;
          fundingProgress = 98;
          expectedROI = "10-12%"; // Not a string in Motoko type, so set to 0 or adjust type if needed
          daysLeft = 5;
          soldTokens = 1350;
        };
        sustainability = {
          overallScore = 88;
          waterQuality = 95;
          feedEfficiency = 85;
          carbonFootprint = 90;
          animalWelfare = 82;
          certifications = [
            { name = "Organic Certified"; status = "Active"; expires = "2025-03-01";  },
            { name = "BAP 4-Star"; status = "Active"; expires = "2024-10-15" },
          ];
        };
        ioTData = {
          temperature = 12.8;
          oxygen = 9.1;
          ph = 7.3;
          salinity = 0.1;
          turbidity = 1.8;
          lastUpdated = "2024-01-20T09:15:00Z";
          alerts = [];
        };
        timeline = [
          { date = "2024-01-19"; description = "Pre-harvest quality assessment"; timelineType = "inspection"; details = "Fish quality excellent, ready for harvest soon"; },
          { date = "2024-01-12"; description = "Final feeding cycle completed"; timelineType = "management"; details = "Stopped feeding in preparation for harvest"; },
          { date = "2024-01-05"; description =  "90% funding milestone reached"; timelineType = "funding"; details = "Successfully reached funding target"; },
        ];
        transactions = [

          { date = "2024-01-19"; investor = "TroutLover.icp"; amount = "₱1,500"; tokens = 180; transactionType = "purchase";},
          { date = "2024-01-10"; investor = "MountainInvest.icp"; amount = "₱3,000"; tokens = 360; transactionType = "purchase";},
        ];
        documents = [
          { name = "Organic Certification"; documentType = "PDF"; size = "1.8 MB"; },
          { name = "Water Quality Report"; documentType = "PDF"; size = "980 kB"; },
          { name = "Growth Progress Report"; documentType = "PDF"; size = "1.2 MB"; }
        ];
      },
      {
        id = "TF-003";
        species = "Sea Bass";
        producer = {
          account = "Mediterranean Aqua";
          location = "Barcelona, Spain";
          avatar = "/placeholder.svg?height=40&width=40";
          rating = 4.8;
          totalHarvests = 28;
          sustainabilityScore = 92;
          certifications = ["ASC", "EU Organic", "Global GAP"];
          joinDate = "2021";
          bio = "Mediterranean sea bass farming with traditional methods and modern sustainability practices.";
        };
        harvest = {
          quantity = "3,200 kg";
          totalValue = "₱15,000";
          pricePerKg = "₱8.33";
          location = "Mountain Farm - Tank B";
          coordinates = "39.7392° N, 104.9903° W";
          WaterDepth = "3 meters";
          cageSize = "30m x 20m";
          stockingDate = "2023-04-15";
          expectedYield = "1,800 kg";
          currentWeight = "1.2 kg avg";
          growthProcess = ?"90";
          status = ?"Ready Soon";
        };
        investment = {
          totalValue = 15000;
          investors = ?0;
          funded = 13500;
          fundingProgress = 98;
          expectedROI = "10-12%"; // Not a string in Motoko type, so set to 0 or adjust type if needed
          daysLeft = 5;
          soldTokens = 1350;
        };
        sustainability = {
          overallScore = 88;
          waterQuality = 95;
          feedEfficiency = 85;
          carbonFootprint = 90;
          animalWelfare = 82;
          certifications = [
            { name = "Organic Certified"; status = "Active"; expires = "2025-03-01";  },
            { name = "BAP 4-Star"; status = "Active"; expires = "2024-10-15" },
          ];
        };
        ioTData = {
          temperature = 12.8;
          oxygen = 9.1;
          ph = 7.3;
          salinity = 0.1;
          turbidity = 1.8;
          lastUpdated = "2024-01-20T09:15:00Z";
          alerts = [];
        };
        timeline = [
          { date = "2024-01-19"; description = "Pre-harvest quality assessment"; timelineType = "inspection"; details = "Fish quality excellent, ready for harvest soon"; },
          { date = "2024-01-12"; description = "Final feeding cycle completed"; timelineType = "management"; details = "Stopped feeding in preparation for harvest"; },
          { date = "2024-01-05"; description =  "90% funding milestone reached"; timelineType = "funding"; details = "Successfully reached funding target"; },
        ];
        transactions = [

          { date = "2024-01-19"; investor = "TroutLover.icp"; amount = "₱1,500"; tokens = 180; transactionType = "purchase";},
          { date = "2024-01-10"; investor = "MountainInvest.icp"; amount = "₱3,000"; tokens = 360; transactionType = "purchase";},
        ];
        documents = [
          { name = "ASC Sustainability Report"; documentType = "PDF"; size = "2.1 MB"; },
          { name = "EU Organic Certificate"; documentType = "PDF"; size = "1.5 MB"; },
          { name = "Growth Tracking Report"; documentType = "PDF"; size = "1.8 MB"; },
        ];
      },
      
    ];

    
    return detailedTokensData;
  };
}