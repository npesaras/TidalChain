// Data Structures
import detailedTokens "lib/detailedTokens";

import Market "lib/market";
import Transactions "lib/transactions";
import Tokens "lib/tokens";
import Species "lib/species";
import Ponds "lib/ponds";
// import Principal "mo:base/Principal";

actor {
  // stable variables for mock data

  /*
  for future deployment of TidalChain on the Internet Computer as a complete dapp

  public stable var stablePrincipal: TrieMap<Text, Text> = TrieMap.empty<Text, Text>()
  */

  stable var stableDetailedTokensData: [detailedTokens.DetailedToken] = [];

  stable var stableRestaurantsData: [Market.Restaurant] = [];
  stable var stableMarketDemandData: [Market.MarketDemand] = [];
  stable var stableQualityPremiumData: [Market.QualityPremium] = [];
  stable var stableDemandChartData: [Market.DemandChartData] = [];
  stable var stablePriceChartData: [Market.PriceChartData] = [];
  stable var stableDemandVolumeData: [Market.DemandVolumeData] = [];

  stable var stablePondsData: [Ponds.Pond] = [];
  
  stable var stableSpeciesRevenueData: [Species.SpeciesRevenue] = [];
  
  stable var stableTokensData: [Tokens.Token] = [];

  stable var stableTransactionsData: [Transactions.Transaction] = [];

  system func preupgrade() {
    // pass
  };

  system func postupgrade() {
    // pass
  };
  
  public shared func populateAll() : async () {
    let detailed_token_mock_data: [detailedTokens.DetailedToken] = detailedTokens.getMockData();
   
    let restaurant_mock_data: [Market.Restaurant] = Market.getMockData();
    let market_demand_mock_data: [Market.MarketDemand] = Market.getMarketDemandMockData();
    let quality_premium_mock_data: [Market.QualityPremium] = Market.getQualityPremiumMockData();
    let demand_chart_data_mock: [Market.DemandChartData] = Market.getDemandChartDataMock();
    let price_chart_data_mock: [Market.PriceChartData] = Market.getPriceChartMockData();
    let demand_volume_data_mock: [Market.DemandVolumeData] = Market.getDemandVolumeMockData();
    
    let ponds_mock_data: [Ponds.Pond] = Ponds.getPondMockData();
    
    let species_revenue_mock_data: [Species.SpeciesRevenue] = Species.getSpeciesRevenueMockData();
    
    let tokens_mock_data: [Tokens.Token] = Tokens.getTokenMockData();
    
    let transactions_mock_data: [Transactions.Transaction] = Transactions.getTransactionMockData();

    
    stableDetailedTokensData := detailed_token_mock_data;

    stableRestaurantsData := restaurant_mock_data;
    stableMarketDemandData := market_demand_mock_data;
    stableQualityPremiumData := quality_premium_mock_data;
    stableDemandChartData := demand_chart_data_mock;
    stablePriceChartData := price_chart_data_mock;
    stableDemandVolumeData := demand_volume_data_mock;

    stablePondsData := ponds_mock_data;

    stableSpeciesRevenueData := species_revenue_mock_data;

    stableTokensData := tokens_mock_data;

    stableTransactionsData := transactions_mock_data;

  };

  /* For future deployment of TidalChain on the Internet Computer as a complete dapp


  public func getPrincipal(): async Principal.Principal {
    return Principal.fromTetext()}
  */

  public shared func getDetailedTokens(): async [detailedTokens.DetailedToken] {
    return stableDetailedTokensData;
  };

  public shared func getRestaurants(): async [Market.Restaurant] {
    return stableRestaurantsData;
  };

  public shared func getMarketDemand(): async [Market.MarketDemand] {
    return stableMarketDemandData;
  };

  public shared func getQualityPremium(): async [Market.QualityPremium] {
    return stableQualityPremiumData;
  };

  public shared func getDemandChartData(): async [Market.DemandChartData] {
    return stableDemandChartData;
  };

  public shared func getPriceChartData(): async [Market.PriceChartData] {
    return stablePriceChartData;
  };

  public shared func getDemandVolumeData(): async [Market.DemandVolumeData] {
    return stableDemandVolumeData;
  };

  public shared func getPondData(): async [Ponds.Pond] {
    return stablePondsData;
  };

  public shared func getSpeciesRevenueData(): async [Species.SpeciesRevenue] {
    return stableSpeciesRevenueData;
  };

  public shared func getTokensData(): async [Tokens.Token] {
    return stableTokensData;
  };

  public shared func getTransactionsData(): async [Transactions.Transaction] {
    return stableTransactionsData;
  };

};