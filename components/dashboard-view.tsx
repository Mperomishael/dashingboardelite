"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { auth } from "@/lib/firebase"
import { getUserProfile } from "@/lib/auth-service"
import { AnimatedBackground } from "@/components/animated-background"

interface DashboardViewProps {
  userName: string
  onNavigate: (view: "deposit" | "withdraw") => void
}

export function DashboardView({ userName, onNavigate }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [cryptoPrices, setCryptoPrices] = useState({
    bitcoin: { price: 0, change: 0 },
    ethereum: { price: 0, change: 0 },
    tether: { price: 0, change: 0 },
    binancecoin: { price: 0, change: 0 },
    ripple: { price: 0, change: 0 },
    cardano: { price: 0, change: 0 },
    solana: { price: 0, change: 0 },
    polkadot: { price: 0, change: 0 },
  })
  const [balance, setBalance] = useState(0)
  const [profitBalance, setProfitBalance] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "400",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      plotLineColorGrowing: "rgba(16, 185, 129, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(16, 185, 129, 0.12)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(16, 185, 129, 0)",
      belowLineFillColorFallingBottom: "rgba(239, 68, 68, 0)",
      symbolActiveColor: "rgba(16, 185, 129, 0.12)",
      tabs: [
        {
          title: "Crypto",
          symbols: [
            { s: "BINANCE:BTCUSDT", d: "Bitcoin" },
            { s: "BINANCE:ETHUSDT", d: "Ethereum" },
            { s: "BINANCE:BNBUSDT", d: "BNB" },
            { s: "BINANCE:SOLUSDT", d: "Solana" },
            { s: "BINANCE:XRPUSDT", d: "Ripple" },
          ],
          originalTitle: "Crypto",
        },
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD", d: "EUR/USD" },
            { s: "FX:GBPUSD", d: "GBP/USD" },
            { s: "FX:USDJPY", d: "USD/JPY" },
            { s: "FX:USDCHF", d: "USD/CHF" },
            { s: "FX:AUDUSD", d: "AUD/USD" },
          ],
          originalTitle: "Forex",
        },
      ],
    })

    const widgetContainer = document.getElementById("tradingview-market-overview")
    if (widgetContainer) {
      widgetContainer.appendChild(script)
    }

    return () => {
      if (widgetContainer && widgetContainer.contains(script)) {
        widgetContainer.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,ripple,cardano,solana,polkadot&vs_currencies=usd&include_24hr_change=true",
        )
        const data = await response.json()
        setCryptoPrices({
          bitcoin: { price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
          ethereum: { price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
          tether: { price: data.tether.usd, change: data.tether.usd_24h_change },
          binancecoin: { price: data.binancecoin.usd, change: data.binancecoin.usd_24h_change },
          ripple: { price: data.ripple.usd, change: data.ripple.usd_24h_change },
          cardano: { price: data.cardano.usd, change: data.cardano.usd_24h_change },
          solana: { price: data.solana.usd, change: data.solana.usd_24h_change },
          polkadot: { price: data.polkadot.usd, change: data.polkadot.usd_24h_change },
        })
      } catch (error) {
        console.log("[v0] Error fetching crypto prices:", error)
      }
    }

    fetchCryptoPrices()
    const interval = setInterval(fetchCryptoPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const profile = await getUserProfile(user.uid)
        if (profile) {
          setBalance(profile.balance)
          setProfitBalance(profile.profitBalance)
          setSelectedCurrency(profile.currency || "USD")
        }
      }
    }
    fetchUserData()
  }, [])

  const cryptoData = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿", color: "orange" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "purple" },
    { id: "tether", name: "Tether", symbol: "USDT", icon: "₮", color: "emerald" },
    { id: "binancecoin", name: "BNB", symbol: "BNB", icon: "◆", color: "yellow" },
    { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕", color: "blue" },
    { id: "cardano", name: "Cardano", symbol: "ADA", icon: "₳", color: "cyan" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "◎", color: "violet" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", icon: "●", color: "pink" },
  ]

  return (
    <>
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto space-y-3 pb-6 relative z-10 px-3 md:px-0">
        {/* Futuristic Balance Section - Glass Morphism */}
        <div className="bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-950 rounded-2xl p-5 md:p-6 border border-lime-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          {/* Animated gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/10 to-lime-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"></div>
          
          <p className="text-lime-400/80 text-xs uppercase tracking-widest font-bold mb-3 relative z-1">💎 Elite Account</p>
          <div className="flex items-end gap-2 mb-4 relative z-1">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-lime-300 via-lime-400 to-lime-300 bg-clip-text text-transparent">${(balance + profitBalance).toFixed(2)}</h1>
            {balance + profitBalance > 0 && (
              <span className="text-lime-400 text-base md:text-lg font-bold mb-1 animate-pulse">↗ +0.00%</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 relative z-1">
            <div className="bg-slate-950/60 backdrop-blur-sm rounded-lg p-3 border border-lime-500/20 hover:border-lime-500/50 hover:bg-lime-500/5 transition-all duration-300">
              <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-1">Trading</p>
              <p className="text-lime-300 font-bold text-lg">${balance.toFixed(2)}</p>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-sm rounded-lg p-3 border border-lime-500/20 hover:border-lime-500/50 hover:bg-lime-500/5 transition-all duration-300">
              <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-1">Profit</p>
              <p className="text-lime-300 font-bold text-lg">${profitBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Time Period Tabs - Futuristic */}
        <div className="flex gap-2 bg-slate-900/50 backdrop-blur-md rounded-lg p-2 border border-lime-500/20">
          {(["daily", "weekly", "monthly", "yearly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold capitalize transition-all rounded-md relative ${
                activeTab === tab 
                  ? "text-slate-900 bg-gradient-to-r from-lime-400 to-lime-300 shadow-lg shadow-lime-500/50" 
                  : "text-lime-400/70 hover:text-lime-400 hover:bg-lime-500/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Futuristic Chart */}
        <div className="bg-gradient-to-br from-slate-900/70 to-slate-950 rounded-lg p-4 md:p-5 relative border border-lime-500/20 shadow-xl overflow-hidden backdrop-blur-md" style={{ height: "260px" }}>
          <div className="absolute top-3 right-3 bg-gradient-to-r from-lime-500/30 to-lime-400/20 text-lime-300 px-3 py-1 rounded-full text-xs font-bold border border-lime-500/30">LIVE</div>
          <div className="absolute top-3 left-3 text-xs text-lime-400/60">$10,500</div>
          <div className="absolute bottom-16 left-3 text-xs text-lime-400/60">$8,250</div>
          <div className="absolute bottom-2 left-3 text-xs text-lime-400/60">$2,100</div>

          {/* SVG Chart - Lime Theme */}
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="futuristicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7fff00" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#7fff00" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7fff00" stopOpacity="0" />
              </linearGradient>
              <filter id="futuristicGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 0 200 Q 100 180, 200 150 T 400 120 Q 500 100, 600 80 T 800 50"
              fill="url(#futuristicGradient)"
              stroke="none"
            />
            <path
              d="M 0 200 Q 100 180, 200 150 T 400 120 Q 500 100, 600 80 T 800 50"
              fill="none"
              stroke="#7fff00"
              strokeWidth="3"
              filter="url(#futuristicGlow)"
              opacity="0.9"
            />
            {/* Data points */}
            <circle cx="400" cy="120" r="6" fill="#7fff00" opacity="0.4" />
            <circle cx="400" cy="120" r="3" fill="#7fff00" />
          </svg>

          {/* Tooltip */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-lime-500/60">
            ▲ 23.5% Growth
          </div>
        </div>

        {/* Futuristic Stats Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 md:p-4 border border-lime-500/20 hover:border-lime-500/40 transition-all hover:bg-lime-500/5">
            <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-2">Wallet</p>
            <p className="text-xl md:text-2xl font-black text-lime-300">+ 73.5%</p>
            <p className="text-xs text-lime-500/60 mt-1">Performance</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 md:p-4 border border-lime-500/20 hover:border-lime-500/40 transition-all hover:bg-lime-500/5">
            <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-2">Market</p>
            <p className="text-xl md:text-2xl font-black text-lime-300">- 12.0%</p>
            <p className="text-xs text-lime-500/60 mt-1">Monitor</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 md:p-4 border border-lime-500/20 hover:border-lime-500/40 transition-all hover:bg-lime-500/5">
            <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-2">Equity</p>
            <p className="text-xl md:text-2xl font-black text-lime-300">2,71.50</p>
            <p className="text-xs text-lime-500/60 mt-1">Net Worth</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 md:p-4 border border-lime-500/20 hover:border-lime-500/40 transition-all hover:bg-lime-500/5">
            <p className="text-lime-400/70 text-xs uppercase tracking-wide font-semibold mb-2">Avg Cost</p>
            <p className="text-xl md:text-2xl font-black text-lime-300">89.10</p>
            <p className="text-xs text-lime-500/60 mt-1">Entry</p>
          </div>
        </div>

        {/* Market Overview */}
        <div className="space-y-2">
          <h3 className="text-sm md:text-base font-black text-lime-300 uppercase tracking-wider">📊 Market Overview</h3>
          <div className="bg-slate-900/60 backdrop-blur-md rounded-lg overflow-hidden border border-lime-500/20 shadow-lg">
            <div id="tradingview-market-overview" className="tradingview-widget-container">
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>
        </div>

        {/* Live Crypto Prices */}
        <div className="space-y-2">
          <h3 className="text-sm md:text-base font-black text-lime-300 uppercase tracking-wider">⚡ Live Prices</h3>
          <div className="grid grid-cols-1 gap-2">
            {cryptoData.map((crypto) => {
              const priceData = cryptoPrices[crypto.id as keyof typeof cryptoPrices]
              return (
                <div key={crypto.id} className="bg-slate-900/60 backdrop-blur-md rounded-lg p-3 flex items-center justify-between border border-lime-500/20 hover:border-lime-500/40 hover:bg-lime-500/5 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 bg-${crypto.color}-500/20 rounded-full flex items-center justify-center border border-${crypto.color}-500/30`}
                    >
                      <span className="text-sm font-bold">{crypto.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-lime-300">{crypto.name}</p>
                      <p className="text-xs text-lime-500/50">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-lime-300">
                      ${priceData.price < 1 ? priceData.price.toFixed(4) : priceData.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      {priceData.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-lime-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <p className={`text-xs font-bold ${priceData.change >= 0 ? "text-lime-400" : "text-red-400"}`}>
                        {priceData.change >= 0 ? "+" : ""}
                        {priceData.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Futuristic Action Buttons */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2">
          <button
            onClick={() => onNavigate("deposit")}
            className="bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-slate-900 font-black py-3 md:py-4 rounded-lg transition-all active:scale-95 text-sm md:text-base shadow-lg shadow-lime-500/40 hover:shadow-lime-500/60 uppercase tracking-wide border border-lime-300/20"
          >
            💰 Add Fund
          </button>
          <button
            onClick={() => onNavigate("withdraw")}
            className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-white font-black py-3 md:py-4 rounded-lg transition-all active:scale-95 text-sm md:text-base shadow-lg shadow-red-500/40 hover:shadow-red-500/60 uppercase tracking-wide border border-red-300/20"
          >
            🔴 Withdraw
          </button>
        </div>

        {/* Currency Selector */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-lime-500/20">
          <label className="text-xs md:text-sm text-lime-400 mb-3 block uppercase font-semibold tracking-wide">💱 Currency</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full bg-slate-950/80 border border-lime-500/30 rounded-lg px-4 py-3 text-lime-300 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent font-semibold hover:border-lime-500/50 transition-all backdrop-blur-sm"
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="AUD">Australian Dollar (AUD)</option>
            <option value="CAD">Canadian Dollar (CAD)</option>
            <option value="CHF">Swiss Franc (CHF)</option>
            <option value="CNY">Chinese Yuan (CNY)</option>
            <option value="INR">Indian Rupee (INR)</option>
            <option value="ZAR">South African Rand (ZAR)</option>
          </select>
        </div>
      </div>
    </>
  )
