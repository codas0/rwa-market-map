import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Treemap, AreaChart, Area,
  LineChart, Line, Legend
} from "recharts";
import {
  TrendingUp, DollarSign, Users, Layers, Shield, Globe, ChevronDown, ChevronUp,
  Sun, Moon, ExternalLink, ArrowUpRight, ArrowDownRight, Minus, Info
} from "lucide-react";
import {
  treasuryProducts, issuerProfiles, rwaCategories, marketStats,
  type TreasuryProduct, type IssuerProfile
} from "@/lib/data";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";

const COLORS = [
  "hsl(183, 55%, 45%)", "hsl(262, 60%, 52%)", "hsl(43, 74%, 49%)",
  "hsl(27, 87%, 55%)", "hsl(173, 58%, 39%)", "hsl(340, 55%, 55%)",
  "hsl(200, 30%, 55%)", "hsl(120, 40%, 45%)", "hsl(280, 50%, 55%)",
  "hsl(10, 70%, 55%)", "hsl(50, 80%, 50%)", "hsl(220, 60%, 55%)"
];

const accessColors: Record<string, string> = {
  "Retail": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Accredited": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Qualified Purchaser": "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
  "Institutional": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20"
};

function formatBillions(val: number) {
  if (val >= 1) return `$${val.toFixed(2)}B`;
  return `$${(val * 1000).toFixed(0)}M`;
}
function formatMillions(val: number) {
  if (val >= 1000) return `$${(val / 1000).toFixed(2)}B`;
  return `$${val.toFixed(0)}M`;
}
function formatNum(val: number) {
  return val.toLocaleString("en-US");
}

function KpiCard({ title, value, subtitle, icon: Icon, trend }: {
  title: string; value: string; subtitle: string; icon: any; trend?: "up" | "down" | "flat";
}) {
  return (
    <Card className="border border-card-border" data-testid={`kpi-${title.toLowerCase().replace(/\s/g,'-')}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tabular-nums">{value}</span>
          {trend && (
            <span className={`flex items-center text-xs font-medium ${trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-muted-foreground"}`}>
              {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function TreasuryTable({ products, sortKey, sortDir, onSort }: {
  products: TreasuryProduct[]; sortKey: string; sortDir: "asc" | "desc";
  onSort: (key: string) => void;
}) {
  const SortHeader = ({ label, field }: { label: string; field: string }) => (
    <th
      className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none whitespace-nowrap"
      onClick={() => onSort(field)}
      data-testid={`sort-${field}`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === field && (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </span>
    </th>
  );

  return (
    <div className="overflow-x-auto dashboard-scroll">
      <table className="w-full text-sm" data-testid="treasury-table">
        <thead className="sticky top-0 bg-card z-10 border-b border-card-border">
          <tr>
            <SortHeader label="Product" field="name" />
            <SortHeader label="AUM" field="aum" />
            <SortHeader label="Yield" field="yield7d" />
            <SortHeader label="Chains" field="chains" />
            <SortHeader label="Holders" field="holders" />
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Maturity</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Underlying</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Min. Invest</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Fee</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Access</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Structure</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Custody</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.ticker} className="border-b border-card-border/50 hover:bg-muted/30 transition-colors" data-testid={`row-${p.ticker}`}>
              <td className="px-3 py-3 whitespace-nowrap">
                <div>
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground ml-2 text-xs">{p.ticker}</span>
                </div>
                <span className="text-xs text-muted-foreground">{p.platform}</span>
              </td>
              <td className="px-3 py-3 tabular-nums font-medium whitespace-nowrap">{formatMillions(p.aum)}</td>
              <td className="px-3 py-3 tabular-nums whitespace-nowrap">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{p.yield7d.toFixed(2)}%</span>
              </td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {p.chains.slice(0, 3).map(c => (
                    <Badge key={c} variant="secondary" className="text-[10px] px-1.5 py-0">{c}</Badge>
                  ))}
                  {p.chains.length > 3 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 cursor-help">+{p.chains.length - 3}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{p.chains.slice(3).join(", ")}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </td>
              <td className="px-3 py-3 tabular-nums whitespace-nowrap">{formatNum(p.holders)}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs font-medium">{p.maturityProfile}</td>
              <td className="px-3 py-3 text-xs text-muted-foreground max-w-[180px]" title={p.underlyingAssets}>{p.underlyingAssets}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs">{p.minInvestment}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs">{p.managementFee}</td>
              <td className="px-3 py-3 whitespace-nowrap">
                <Badge variant="outline" className={`text-[10px] ${accessColors[p.investorAccess] || ""}`}>{p.investorAccess}</Badge>
              </td>
              <td className="px-3 py-3 text-xs text-muted-foreground max-w-[140px] truncate" title={p.structure}>{p.structure}</td>
              <td className="px-3 py-3 text-xs text-muted-foreground max-w-[120px] truncate" title={p.custody}>{p.custody}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IssuerCard({ issuer }: { issuer: IssuerProfile }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="border border-card-border card-hover" data-testid={`issuer-${issuer.slug}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-base">{issuer.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{issuer.parentCompany}</p>
          </div>
          <Badge variant="outline" className="tabular-nums text-xs">{issuer.marketShare}% share</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total AUM</p>
            <p className="text-sm font-semibold tabular-nums">{issuer.totalAum}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Yield Range</p>
            <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{issuer.yieldRange}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Holders</p>
            <p className="text-sm font-semibold tabular-nums">{formatNum(issuer.holders)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Retail Access</p>
            <Badge variant="outline" className={`text-[10px] mt-0.5 ${issuer.retailAccess ? accessColors["Retail"] : accessColors["Qualified Purchaser"]}`}>
              {issuer.retailAccess ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Chains</p>
          <div className="flex flex-wrap gap-1">
            {issuer.chains.slice(0, 5).map(c => (
              <Badge key={c} variant="secondary" className="text-[10px] px-1.5 py-0">{c}</Badge>
            ))}
            {issuer.chains.length > 5 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">+{issuer.chains.length - 5}</Badge>}
          </div>
        </div>
        <p className="text-xs font-medium text-primary mb-1">Key Strength</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{issuer.keyStrength}</p>

        <Button
          variant="ghost" size="sm"
          className="mt-3 w-full text-xs h-7"
          onClick={() => setExpanded(!expanded)}
          data-testid={`expand-${issuer.slug}`}
        >
          {expanded ? "Less" : "More details"}
          {expanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
        </Button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-card-border space-y-3">
            <div>
              <p className="text-xs font-medium mb-1">Products</p>
              <div className="flex flex-wrap gap-1">
                {issuer.products.map(p => <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-1">Custody</p>
              <p className="text-xs text-muted-foreground">{issuer.custody}</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1">Regulatory Status</p>
              <p className="text-xs text-muted-foreground">{issuer.regStatus}</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1">Fee Structure</p>
              <p className="text-xs text-muted-foreground">{issuer.feeRange}</p>
            </div>
            <div>
              <p className="text-xs font-medium mb-1">Description</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{issuer.description}</p>
            </div>
            <div className="p-2 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-medium text-primary mb-0.5">Latest</p>
              <p className="text-xs text-muted-foreground">{issuer.recentMilestone}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [sortKey, setSortKey] = useState("aum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [accessFilter, setAccessFilter] = useState<string>("all");

  const toggleDark = () => {
    setDarkMode(d => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  // Initialize dark class
  if (darkMode && !document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.add("dark");
  }

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sortedProducts = useMemo(() => {
    let filtered = accessFilter === "all" ? [...treasuryProducts] : treasuryProducts.filter(p => p.investorAccess === accessFilter);
    filtered.sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortKey) {
        case "aum": aVal = a.aum; bVal = b.aum; break;
        case "yield7d": aVal = a.yield7d; bVal = b.yield7d; break;
        case "holders": aVal = a.holders; bVal = b.holders; break;
        case "chains": aVal = a.chains.length; bVal = b.chains.length; break;
        default: aVal = a.name; bVal = b.name;
      }
      if (typeof aVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return filtered;
  }, [sortKey, sortDir, accessFilter]);

  // Chart data
  const aumBarData = treasuryProducts.slice(0, 10).map(p => ({ name: p.ticker, aum: p.aum, fill: COLORS[treasuryProducts.indexOf(p) % COLORS.length] }));
  const chainPieData = marketStats.topChains.map((c, i) => ({ ...c, fill: COLORS[i] }));
  const rwaCatData = rwaCategories.map(c => ({ name: c.name, size: c.totalValue, fill: c.color }));
  const yieldComparison = treasuryProducts.slice(0, 8).map(p => ({
    name: p.ticker,
    yield: p.yield7d,
    fee: parseFloat(p.managementFee.replace(/%.*/, "")) || 0
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="RWA Market Map logo">
              <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" />
              <path d="M8 22V14l4-4 4 4v8" stroke="hsl(183, 55%, 45%)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M18 22V10l6 6v6" stroke="hsl(183, 55%, 45%)" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
            </svg>
            <div>
              <h1 className="text-base font-semibold leading-tight">Tokenized RWA Market Map</h1>
              <p className="text-[10px] text-muted-foreground">Live data as of March 24, 2026 — Sources: RWA.xyz, issuer disclosures</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://app.rwa.xyz" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              RWA.xyz <ExternalLink className="h-3 w-3" />
            </a>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleDark} data-testid="theme-toggle" aria-label="Toggle theme">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3" data-testid="kpi-row">
          <KpiCard title="Total RWA" value={`$${marketStats.totalRwaValue}B`} subtitle={`+${marketStats.yoyRwaGrowth}% YoY`} icon={DollarSign} trend="up" />
          <KpiCard title="Treasuries" value={`$${marketStats.totalTreasuryValue}B`} subtitle={`+${marketStats.yoyTreasuryGrowth}% in 2025`} icon={TrendingUp} trend="up" />
          <KpiCard title="Products" value={`${marketStats.totalProducts}`} subtitle="Tracked on-chain" icon={Layers} />
          <KpiCard title="Holders" value={formatNum(marketStats.totalHolders)} subtitle="Unique wallets" icon={Users} trend="up" />
          <KpiCard title="Avg Yield" value={`${marketStats.treasuryYieldAvg}%`} subtitle="7-day Treasury avg" icon={TrendingUp} />
          <KpiCard title="ETH Dominance" value={`${marketStats.ethereumDominance}%`} subtitle="$15.3B on Ethereum" icon={Globe} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Treasury Growth Timeline */}
          <Card className="lg:col-span-2 border border-card-border">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Tokenized Treasury Market Growth</CardTitle>
              <p className="text-xs text-muted-foreground">Total AUM since Jan 2024 ($ billions)</p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={marketStats.treasuryGrowthTimeline}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(183, 55%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(183, 55%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `$${v}B`} />
                  <Area type="monotone" dataKey="value" stroke="hsl(183, 55%, 45%)" fill="url(#areaGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(183, 55%, 45%)" }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* RWA Category Breakdown */}
          <Card className="border border-card-border">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">RWA Market by Category</CardTitle>
              <p className="text-xs text-muted-foreground">$26.5B total distributed value</p>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                {rwaCategories.map((cat, i) => {
                  const pct = ((cat.totalValue / marketStats.totalRwaValue) * 100).toFixed(1);
                  return (
                    <div key={cat.name} className="group">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium">{cat.name}</span>
                        <span className="tabular-nums text-muted-foreground">{formatBillions(cat.totalValue)} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{cat.yoyGrowth} YoY — {cat.dominantProducts}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* AUM by Product */}
          <Card className="border border-card-border">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Top 10 Treasury Products by AUM</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={aumBarData} layout="vertical" margin={{ left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `$${v >= 1000 ? (v/1000).toFixed(1)+'B' : v+'M'}`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={50} />
                  <Bar dataKey="aum" radius={[0, 4, 4, 0]}>
                    {aumBarData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chain Distribution */}
          <Card className="border border-card-border">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">RWA Value by Chain</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={chainPieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={1}>
                      {chainPieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {chainPieData.map((c, i) => (
                    <div key={c.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        {c.name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{c.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yield Comparison */}
        <Card className="border border-card-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold">Yield vs Fee Comparison (Top 8)</CardTitle>
            <p className="text-xs text-muted-foreground">7-day annualized yield and management fee (%)</p>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yieldComparison} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `${v}%`} domain={[0, 4.5]} />
                <Bar dataKey="yield" name="Yield" fill="hsl(183, 55%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fee" name="Fee" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} opacity={0.6} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Treasury Products Table */}
        <Card className="border border-card-border">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Tokenized Treasury Products</CardTitle>
              <p className="text-xs text-muted-foreground">{sortedProducts.length} products — sortable columns</p>
            </div>
            <div className="flex gap-1">
              {["all", "Retail", "Accredited", "Qualified Purchaser", "Institutional"].map(f => (
                <Button
                  key={f}
                  variant={accessFilter === f ? "default" : "ghost"}
                  size="sm"
                  className="text-[10px] h-6 px-2"
                  onClick={() => setAccessFilter(f)}
                  data-testid={`filter-${f}`}
                >
                  {f === "all" ? "All" : f === "Qualified Purchaser" ? "QP" : f}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <TreasuryTable products={sortedProducts} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
          </CardContent>
        </Card>

        {/* Issuer Profiles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold">Issuer Profiles — Head-to-Head</h2>
              <p className="text-xs text-muted-foreground">Who is winning and why</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="issuer-grid">
            {issuerProfiles.map(ip => <IssuerCard key={ip.slug} issuer={ip} />)}
          </div>
        </section>

        {/* Access / Regulatory Matrix */}
        <Card className="border border-card-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold">Investor Access and Regulatory Framework Matrix</CardTitle>
            <p className="text-xs text-muted-foreground">Which products are accessible to each investor type</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto dashboard-scroll">
              <table className="w-full text-xs" data-testid="access-matrix">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Product</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Maturity</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Underlying</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Domicile</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Regulatory Framework</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Retail</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Accredited</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">QP ($5M+)</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Institutional</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Custody</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Yield Method</th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Redemption</th>
                  </tr>
                </thead>
                <tbody>
                  {treasuryProducts.map(p => {
                    const isRetail = p.investorAccess === "Retail";
                    const isAccredited = p.investorAccess === "Retail" || p.investorAccess === "Accredited";
                    const isQP = isAccredited || p.investorAccess === "Qualified Purchaser";
                    const isInst = true;
                    return (
                      <tr key={p.ticker} className="border-b border-card-border/50">
                        <td className="px-3 py-2 font-medium whitespace-nowrap">{p.ticker}</td>
                        <td className="px-3 py-2 font-medium whitespace-nowrap">{p.maturityProfile}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.underlyingAssets}</td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{p.domicile}</td>
                        <td className="px-3 py-2 text-muted-foreground max-w-[200px]">{p.regFramework}</td>
                        <td className="px-3 py-2 text-center">{isRetail ? <span className="text-emerald-500 font-bold">&#10003;</span> : <span className="text-muted-foreground/40">—</span>}</td>
                        <td className="px-3 py-2 text-center">{isAccredited ? <span className="text-emerald-500 font-bold">&#10003;</span> : <span className="text-muted-foreground/40">—</span>}</td>
                        <td className="px-3 py-2 text-center">{isQP ? <span className="text-emerald-500 font-bold">&#10003;</span> : <span className="text-muted-foreground/40">—</span>}</td>
                        <td className="px-3 py-2 text-center"><span className="text-emerald-500 font-bold">&#10003;</span></td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{p.custody}</td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{p.yieldMethod}</td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{p.redemption}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <div className="text-[10px] text-muted-foreground text-center space-y-1 py-4">
          <p>Data sources: <a href="https://app.rwa.xyz/treasuries" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">RWA.xyz</a>, <a href="https://info.arkm.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Arkham Intelligence</a>, SEC filings, issuer disclosures. Last updated March 24, 2026.</p>
          <p>All data is point-in-time and subject to change. This dashboard is for informational purposes only, not investment advice.</p>
        </div>

        <PerplexityAttribution />
      </main>
    </div>
  );
}
