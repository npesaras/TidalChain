import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Waves, Shield, Leaf, BarChart3, Calendar, Truck, Coins } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white scroll-smooth">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">TidalChain</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="#platform-features" className="text-gray-600 hover:text-blue-600">
              Platform Features
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button className="font-bol" asChild>
              <Link href="/auth" >Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
            Investing in a
            <span className="text-blue-600 block font-bold ">Bountiful Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect sustainable fish producers with global investors and buyers through blockchain-powered tokenization.
            Transparent, traceable, and profitable aquaculture for everyone.
          </p>
        </div>
      </section>     

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How TidalChain Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-800 rounded-2xl p-8 text-white text-center">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Monitor Fish Market Demand and Trends</h3>
            </div>
            
            <div className="bg-blue-800 rounded-2xl p-8 text-white text-center">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Optimize Scheduling and sure-demand Farming</h3>
            </div>
            
            <div className="bg-blue-800 rounded-2xl p-8 text-white text-center">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Track Fish Delivery Quality</h3>
            </div>
            
            <div className="bg-blue-800 rounded-2xl p-8 text-white text-center">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Tokenization of Assets for Funding and Selling</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="platform-features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                Built on ICP with Internet Identity for secure, decentralized transactions
              </p>
            </div>            
            <div className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability Tracking</h3>
              <p className="text-gray-600">Real-time IoT monitoring and Government issued certifications</p>
            </div>            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Revenue Analytics</h3>
              <p className="text-gray-600">Comprehensive financial dashboards and performance tracking for producers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
