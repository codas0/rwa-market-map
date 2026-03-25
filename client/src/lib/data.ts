// Research-sourced data for tokenized RWA market map — March 2026

export interface TreasuryProduct {
  name: string;
  ticker: string;
  platform: string;
  aum: number; // in millions USD
  yield7d: number; // percentage
  chains: string[];
  holders: number;
  minInvestment: string;
  managementFee: string;
  yieldMethod: string;
  redemption: string;
  custody: string;
  regFramework: string;
  investorAccess: "Retail" | "Accredited" | "Qualified Purchaser" | "Institutional";
  domicile: string;
  structure: string;
  launched: string;
  maturityProfile: string;  // WAM or duration description
  underlyingAssets: string; // what the fund actually holds
}

export interface IssuerProfile {
  name: string;
  slug: string;
  totalAum: string;
  marketShare: number;
  products: string[];
  chains: string[];
  parentCompany: string;
  founded: string;
  keyStrength: string;
  description: string;
  custody: string;
  regStatus: string;
  retailAccess: boolean;
  recentMilestone: string;
  yieldRange: string;
  holders: number;
  feeRange: string;
}

export interface RwaCategory {
  name: string;
  totalValue: number; // billions
  yoyGrowth: string;
  dominantProducts: string;
  description: string;
  color: string;
}

export const treasuryProducts: TreasuryProduct[] = [
  {
    name: "Circle USYC",
    ticker: "USYC",
    platform: "Circle",
    aum: 2437,
    yield7d: 3.14,
    chains: ["Ethereum", "Solana"],
    holders: 110,
    minInvestment: "$100,000",
    managementFee: "0% (10% perf. fee)",
    yieldMethod: "NAV appreciation",
    redemption: "Near-instant",
    custody: "BNY Mellon",
    regFramework: "SEC Reg D 506(c)",
    investorAccess: "Qualified Purchaser",
    domicile: "United States",
    structure: "Tokenized Fund",
    launched: "2023",
    maturityProfile: "WAM <60d",
    underlyingAssets: "T-Bills, overnight repo, cash"
  },
  {
    name: "BlackRock BUIDL",
    ticker: "BUIDL",
    platform: "Securitize",
    aum: 2100,
    yield7d: 3.46,
    chains: ["Ethereum", "Solana", "Polygon", "Arbitrum", "Avalanche", "Optimism", "Aptos"],
    holders: 103,
    minInvestment: "$5,000,000",
    managementFee: "0.50%",
    yieldMethod: "Daily token dividend",
    redemption: "T+0 via Securitize",
    custody: "BNY Mellon",
    regFramework: "SEC Reg D 506(c) — Qualified Purchaser",
    investorAccess: "Qualified Purchaser",
    domicile: "British Virgin Islands",
    structure: "Tokenized Money Market Fund",
    launched: "Mar 2024",
    maturityProfile: "WAM ~O/N–30d",
    underlyingAssets: "100% T-Bills, overnight & term repo"
  },
  {
    name: "Ondo USDY",
    ticker: "USDY",
    platform: "Ondo",
    aum: 1200,
    yield7d: 3.47,
    chains: ["Ethereum", "Solana", "Sei", "Mantle", "Aptos", "Sui", "Arbitrum", "Cosmos", "Noble"],
    holders: 43000,
    minInvestment: "$500",
    managementFee: "Spread-based",
    yieldMethod: "Redemption value growth",
    redemption: "T+2 off-chain; instant on DEX",
    custody: "Morgan Stanley / Ankura Trust",
    regFramework: "Reg S (non-US only)",
    investorAccess: "Retail",
    domicile: "United States",
    structure: "Secured Note (SPV)",
    launched: "Aug 2023",
    maturityProfile: "Rolling short-term",
    underlyingAssets: "Short-term T-Bills, bank demand deposits"
  },
  {
    name: "Franklin Templeton FOBXX",
    ticker: "BENJI",
    platform: "Franklin Templeton",
    aum: 1040,
    yield7d: 3.50,
    chains: ["Stellar", "Polygon", "Ethereum", "Avalanche", "Aptos", "Arbitrum", "Base"],
    holders: 16000,
    minInvestment: "$20",
    managementFee: "0.20%",
    yieldMethod: "Monthly cash payout",
    redemption: "T+0 to T+1 via Benji",
    custody: "J.P. Morgan",
    regFramework: "SEC-Registered Mutual Fund (1940 Act)",
    investorAccess: "Retail",
    domicile: "United States",
    structure: "Registered Mutual Fund",
    launched: "Apr 2021",
    maturityProfile: "WAM ≤60d / WAL ≤120d",
    underlyingAssets: "Gov't MMF (Rule 2a-7): T-Bills, agency paper, repo"
  },
  {
    name: "Centrifuge / Anemoy LTF",
    ticker: "LTF",
    platform: "Centrifuge",
    aum: 965,
    yield7d: 3.30,
    chains: ["Ethereum", "Centrifuge Chain"],
    holders: 45,
    minInvestment: "$10,000",
    managementFee: "0.15%",
    yieldMethod: "NAV appreciation",
    redemption: "T+1 to T+3",
    custody: "BNP Paribas",
    regFramework: "BVI Fund",
    investorAccess: "Accredited",
    domicile: "British Virgin Islands",
    structure: "Tokenized Fund Wrapper",
    launched: "2024",
    maturityProfile: "WAM <90d",
    underlyingAssets: "Short-term T-Bills via underlying MMFs"
  },
  {
    name: "Superstate USTB",
    ticker: "USTB",
    platform: "Superstate",
    aum: 794,
    yield7d: 3.44,
    chains: ["Ethereum"],
    holders: 150,
    minInvestment: "$100,000",
    managementFee: "0.15%",
    yieldMethod: "NAV appreciation",
    redemption: "Same-day",
    custody: "UMB Bank",
    regFramework: "SEC Reg D — Qualified Purchaser",
    investorAccess: "Qualified Purchaser",
    domicile: "United States",
    structure: "Private Fund (ERC-20)",
    launched: "Early 2024",
    maturityProfile: "Short duration (<1Y)",
    underlyingAssets: "T-Bills, short-dated US Gov agency securities"
  },
  {
    name: "WisdomTree WTGXX",
    ticker: "WTGXX",
    platform: "WisdomTree",
    aum: 752,
    yield7d: 3.48,
    chains: ["Ethereum", "Stellar", "Arbitrum", "Avalanche", "Base", "Optimism", "Polygon"],
    holders: 320,
    minInvestment: "$1,000",
    managementFee: "0.20%",
    yieldMethod: "Continuous dividend accrual",
    redemption: "24/7 instant via USDC (SEC exemptive relief)",
    custody: "State Street",
    regFramework: "SEC-Registered Fund (1940 Act) + Exemptive Relief",
    investorAccess: "Institutional",
    domicile: "United States",
    structure: "Registered Tokenized Mutual Fund",
    launched: "2023",
    maturityProfile: "WAM ≤60d / WAL ≤120d",
    underlyingAssets: "Gov't MMF (Rule 2a-7): T-Bills, repo, agency paper"
  },
  {
    name: "Ondo OUSG",
    ticker: "OUSG",
    platform: "Ondo",
    aum: 697,
    yield7d: 3.47,
    chains: ["Ethereum", "Polygon", "Solana", "XRP Ledger"],
    holders: 280,
    minInvestment: "$5,000",
    managementFee: "0.15% (waived to Jul 2026)",
    yieldMethod: "Daily NAV growth",
    redemption: "Near-instant USDC",
    custody: "Fidelity / BlackRock (via underlying)",
    regFramework: "SEC Reg D — Accredited Investor",
    investorAccess: "Accredited",
    domicile: "United States",
    structure: "Tokenized Fund Wrapper (LP interests)",
    launched: "Jan 2023",
    maturityProfile: "WAM ~O/N–60d (via underlying)",
    underlyingAssets: "BlackRock, Fidelity, WisdomTree MMFs + stablecoins"
  },
  {
    name: "ChinaAMC CUMIU",
    ticker: "CUMIU",
    platform: "Libeara",
    aum: 546,
    yield7d: 3.78,
    chains: ["Ethereum"],
    holders: 2,
    minInvestment: "$1,000",
    managementFee: "0.05%",
    yieldMethod: "NAV appreciation",
    redemption: "T+1",
    custody: "Standard Chartered",
    regFramework: "HK Professional Investor Exemption",
    investorAccess: "Institutional",
    domicile: "Hong Kong",
    structure: "Digital Money Market Fund",
    launched: "2024",
    maturityProfile: "WAM <60d",
    underlyingAssets: "USD MMF: T-Bills, repo, deposits"
  },
  {
    name: "Spiko USTBL",
    ticker: "USTBL",
    platform: "Spiko",
    aum: 180,
    yield7d: 3.30,
    chains: ["Ethereum", "Polygon", "Solana", "Gnosis"],
    holders: 922,
    minInvestment: "1,000 USDC",
    managementFee: "0.30%",
    yieldMethod: "NAV appreciation",
    redemption: "T+1",
    custody: "CACEIS",
    regFramework: "UCITS (EU) — AMF Regulated",
    investorAccess: "Retail",
    domicile: "France",
    structure: "UCITS Money Market Fund",
    launched: "2024",
    maturityProfile: "WAM ≤60d / WAL ≤120d",
    underlyingAssets: "UCITS MMF: US T-Bills, short-dated gov paper"
  },
  {
    name: "Fidelity FYOXX",
    ticker: "FYOXX",
    platform: "Fidelity",
    aum: 179,
    yield7d: 3.35,
    chains: ["Ethereum"],
    holders: 25,
    minInvestment: "$1,000",
    managementFee: "0.20%",
    yieldMethod: "Daily dividend (FDIT token)",
    redemption: "T+0 to T+1",
    custody: "BNY Mellon",
    regFramework: "SEC-Registered Fund",
    investorAccess: "Institutional",
    domicile: "United States",
    structure: "Registered Fund (On-Chain Class)",
    launched: "Dec 2024",
    maturityProfile: "WAM <60d",
    underlyingAssets: "100% US Treasury securities, cash"
  },
  {
    name: "Matrixdock STBT",
    ticker: "STBT",
    platform: "Matrixdock",
    aum: 140,
    yield7d: 3.25,
    chains: ["Ethereum"],
    holders: 32,
    minInvestment: "$100,000",
    managementFee: "0.30%",
    yieldMethod: "Rebase",
    redemption: "T+1",
    custody: "Regulated custodian",
    regFramework: "BVI SPV",
    investorAccess: "Accredited",
    domicile: "British Virgin Islands",
    structure: "Tokenized T-Bill Note",
    launched: "2023",
    maturityProfile: "≤6M T-Bills",
    underlyingAssets: "6-month US T-Bills, overnight reverse repo"
  }
];

export const issuerProfiles: IssuerProfile[] = [
  {
    name: "Ondo Finance",
    slug: "ondo",
    totalAum: "$1.9B (OUSG + USDY combined)",
    marketShare: 16.31,
    products: ["OUSG", "USDY", "rOUSG"],
    chains: ["Ethereum", "Solana", "Polygon", "XRP Ledger", "Sei", "Mantle", "Aptos", "Sui", "Arbitrum"],
    parentCompany: "Ondo Finance Inc.",
    founded: "2022",
    keyStrength: "Widest multi-chain reach (9 chains). USDY is permissionless with retail access for non-US. Lowest minimums ($500 USDY, $5K OUSG).",
    description: "Largest pure-play tokenized Treasury issuer. USDY is a bankruptcy-remote secured note targeting non-US retail; OUSG is a fund wrapper for qualified US investors. Backed by partnerships with BlackRock, Fidelity, and Morgan Stanley.",
    custody: "Morgan Stanley / Ankura Trust (USDY SPV); Fidelity & BlackRock MMFs (OUSG underlying)",
    regStatus: "SEC investigation closed without charges. Reg S (USDY), Reg D (OUSG).",
    retailAccess: true,
    recentMilestone: "Crossed $2.5B TVL across all products (Feb 2026). SEC investigation resolved favorably.",
    yieldRange: "3.47–3.75% APY",
    holders: 43000,
    feeRange: "0.15% mgmt (OUSG, waived to Jul 2026); spread-based (USDY)"
  },
  {
    name: "Securitize",
    slug: "securitize",
    totalAum: "$2.1B (platform total $4.6B)",
    marketShare: 17.95,
    products: ["BUIDL (BlackRock)", "ArCoin (Arca)", "Hamilton Lane funds", "KKR funds"],
    chains: ["Ethereum", "Solana", "Polygon", "Arbitrum", "Avalanche", "Optimism", "Aptos", "+8 more"],
    parentCompany: "Securitize Inc. (backed by BlackRock)",
    founded: "2017",
    keyStrength: "Platform & infrastructure leader. SEC-registered transfer agent & broker-dealer. Operates across 15 blockchains. 25% market share. BlackRock's exclusive on-chain partner for BUIDL.",
    description: "The dominant tokenization infrastructure provider. Transfer agent for BUIDL ($2.1B). Also tokenizes PE (KKR, Hamilton Lane), credit, and plans natively tokenized equities in 2026. Revenue up 841% YoY.",
    custody: "BNY Mellon (BUIDL); varies by product",
    regStatus: "SEC-registered Transfer Agent, ATS Operator & Broker-Dealer. EU TSS on Avalanche.",
    retailAccess: false,
    recentMilestone: "BUIDL integrated with Uniswap via RFQ (Feb 2026). Launching tokenized public equities early 2026. EU Trading & Settlement System live.",
    yieldRange: "3.46–4.00% (BUIDL)",
    holders: 103,
    feeRange: "0.50% (BUIDL); varies by product"
  },
  {
    name: "Franklin Templeton",
    slug: "franklin",
    totalAum: "$1.04B (FOBXX/BENJI)",
    marketShare: 8.77,
    products: ["FOBXX (BENJI)", "Franklin OnChain Equity"],
    chains: ["Stellar", "Polygon", "Ethereum", "Avalanche", "Aptos", "Arbitrum", "Base"],
    parentCompany: "Franklin Resources Inc. ($1.6T AUM)",
    founded: "1947 (digital since 2021)",
    keyStrength: "First SEC-registered mutual fund on a public blockchain (2021). True retail access with $20 minimum. Blockchain is the official shareholder ledger.",
    description: "Pioneer of regulated on-chain funds. FOBXX was the first US-registered mutual fund using blockchain as its official share register. Now on 7 chains via Benji platform. Expanding to Canton Network.",
    custody: "J.P. Morgan",
    regStatus: "SEC-Registered Mutual Fund under 1940 Investment Company Act. Fully regulated.",
    retailAccess: true,
    recentMilestone: "Crossed $1B AUM. Expanded to Canton Network (Nov 2025). Available via Benji app on mobile.",
    yieldRange: "3.33–3.50% APY",
    holders: 16000,
    feeRange: "0.20% management fee"
  },
  {
    name: "WisdomTree",
    slug: "wisdomtree",
    totalAum: "$758M (tokenized funds)",
    marketShare: 6.39,
    products: ["WTGXX (Treasury MMF)", "WTSYX (Short-Term Gov)", "+5 digital funds"],
    chains: ["Ethereum", "Stellar", "Arbitrum", "Avalanche", "Base", "Optimism", "Polygon"],
    parentCompany: "WisdomTree Inc. (NYSE: WT, $159B total AUM)",
    founded: "2006 (digital since 2022)",
    keyStrength: "First to get SEC exemptive relief for 24/7 trading of registered fund shares against USDC. Continuous dividend accrual with intraday precision. WisdomTree Connect institutional platform.",
    description: "NYSE-listed global ETF provider pivoting into tokenized funds. Grew tokenized AUM from $30M to $770M in 2025. 7 tokenized digital funds across multiple asset classes. WisdomTree Prime retail wallet.",
    custody: "State Street",
    regStatus: "SEC-Registered Funds (1940 Act). FINRA-approved broker-dealer subsidiary for principal trading.",
    retailAccess: false,
    recentMilestone: "SEC exemptive relief for 24/7 trading (Feb 2026). FINRA approval for principal trading. Record $159B total AUM.",
    yieldRange: "3.48% (WTGXX)",
    holders: 320,
    feeRange: "0.20% management fee"
  },
  {
    name: "Superstate",
    slug: "superstate",
    totalAum: "$794M (USTB)",
    marketShare: 6.69,
    products: ["USTB (Short Duration US Gov)", "USCC (Crypto Carry Fund)"],
    chains: ["Ethereum"],
    parentCompany: "Superstate Inc. (Invesco partnership)",
    founded: "2023",
    keyStrength: "Purpose-built digital transfer agent. Invesco ($2.2T) taking over portfolio management in Q2 2026. 150+ institutional investors. Strongest DeFi integration of any qualified-purchaser fund.",
    description: "Fintech startup built by ex-Compound founder. USTB is one of the top 5 tokenized Treasury funds. Invesco partnership announced Mar 2026 brings institutional-grade management while keeping on-chain infrastructure.",
    custody: "UMB Bank",
    regStatus: "SEC Reg D — Qualified Purchaser. Digital Transfer Agent.",
    retailAccess: false,
    recentMilestone: "Invesco announced as investment manager (Mar 24, 2026). USTB to be renamed Invesco Short Duration US Gov Securities Fund in Q2 2026.",
    yieldRange: "3.44%",
    holders: 150,
    feeRange: "0.15%"
  },
  {
    name: "Fidelity",
    slug: "fidelity",
    totalAum: "$179M (FYOXX)",
    marketShare: 1.5,
    products: ["FYOXX (Treasury Digital Fund)", "FDIT token"],
    chains: ["Ethereum"],
    parentCompany: "Fidelity Investments ($5.8T AUM)",
    founded: "1946 (digital fund Dec 2024)",
    keyStrength: "Largest asset manager in tokenized space by parent AUM. Stealth-mode launch, rapidly scaled. Ondo holds $202M in FYOXX, validating cross-platform composability.",
    description: "Launched tokenized Treasury fund in stealth mode (Dec 2024). FDIT token mirrors one FYOXX share on Ethereum. Primarily serves as underlying investment vehicle for other tokenized protocols (notably Ondo OUSG). Fidelity Digital Assets is a separate entity focused on crypto custody and research.",
    custody: "BNY Mellon",
    regStatus: "SEC-Registered Fund. On-Chain share class filed and approved.",
    retailAccess: false,
    recentMilestone: "Surpassed $300M by Aug 2025. Ondo increased allocation to $202M. Published 2026 Look Ahead on token holder rights.",
    yieldRange: "~3.35%",
    holders: 25,
    feeRange: "0.20% expense ratio"
  }
];

export const rwaCategories: RwaCategory[] = [
  { name: "US Treasuries", totalValue: 12.03, yoyGrowth: "+85%", dominantProducts: "USYC, BUIDL, USDY, BENJI", description: "Government T-Bills, notes, bonds, and MMFs tokenized on-chain", color: "hsl(221, 83%, 53%)" },
  { name: "Private Credit", totalValue: 5.2, yoyGrowth: "+62%", dominantProducts: "Centrifuge, Maple, Goldfinch", description: "On-chain lending protocols backed by real-world loan portfolios", color: "hsl(262, 83%, 48%)" },
  { name: "Commodities", totalValue: 3.8, yoyGrowth: "+45%", dominantProducts: "Tether Gold (XAUT), PAX Gold (PAXG)", description: "Tokenized precious metals (gold ~70%), oil, agriculture", color: "hsl(43, 74%, 49%)" },
  { name: "Real Estate", totalValue: 1.5, yoyGrowth: "+120%", dominantProducts: "RealT, Lofty, Propy", description: "Fractional property ownership and rental yield tokens", color: "hsl(27, 87%, 55%)" },
  { name: "Equities", totalValue: 0.96, yoyGrowth: "+2,900%", dominantProducts: "Securitize, Backed.fi, Dinari", description: "Tokenized stocks on-chain. Nasdaq & NYSE exploring venues.", color: "hsl(173, 58%, 39%)" },
  { name: "Corporate Bonds", totalValue: 0.8, yoyGrowth: "+55%", dominantProducts: "Obligate, Backed, Canton Network", description: "Tokenized corporate fixed income instruments", color: "hsl(340, 60%, 50%)" },
  { name: "Other / Specialty", totalValue: 2.21, yoyGrowth: "+40%", dominantProducts: "Carbon credits, pharma, reinsurance", description: "Emerging categories: carbon, drug royalties, reinsurance, Bitcoin mining notes", color: "hsl(200, 30%, 55%)" }
];

export const marketStats = {
  totalRwaValue: 26.5,    // billions
  totalTreasuryValue: 12.03,  // billions
  totalHolders: 55331,
  totalProducts: 73,
  treasuryYieldAvg: 3.42,
  totalStablecoinValue: 300.17, // billions
  yoyRwaGrowth: 266,
  yoyTreasuryGrowth: 85,
  ethereumDominance: 57.75,
  topChains: [
    { name: "Ethereum", share: 57.75, value: 15.3 },
    { name: "BNB Chain", share: 12.17, value: 3.2 },
    { name: "Solana", share: 6.40, value: 1.7 },
    { name: "Stellar", share: 5.39, value: 1.4 },
    { name: "Polygon", share: 3.8, value: 1.0 },
    { name: "Avalanche", share: 2.9, value: 0.77 },
    { name: "Others", share: 11.59, value: 3.13 }
  ],
  treasuryGrowthTimeline: [
    { date: "Jan 2024", value: 0.85 },
    { date: "Mar 2024", value: 1.10 },
    { date: "Jun 2024", value: 1.80 },
    { date: "Sep 2024", value: 2.50 },
    { date: "Dec 2024", value: 3.90 },
    { date: "Mar 2025", value: 4.80 },
    { date: "Jun 2025", value: 5.50 },
    { date: "Jul 2025", value: 6.60 },
    { date: "Sep 2025", value: 7.20 },
    { date: "Nov 2025", value: 9.00 },
    { date: "Jan 2026", value: 10.00 },
    { date: "Feb 2026", value: 10.80 },
    { date: "Mar 2026", value: 12.03 }
  ]
};
