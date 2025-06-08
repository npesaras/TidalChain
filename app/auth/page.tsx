"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Fish, TrendingUp, ShoppingCart, Shield, ArrowRight } from "lucide-react"

// dfx configuration
import { serviceMakeActor } from "@/service/actor"
import { AuthClient } from '@dfinity/auth-client'
import { useRouter } from "next/navigation"
import { canisterId } from "@/components/declarations/tidal_chain_assets"
import { canisterId as frontendCanisterId } from "@/components/declarations/tidal_chain_assets"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "producer"
  const [selectedRole, setSelectedRole] = useState(initialRole)

  const handleInternetIdentityLogin = async (role: string) => {
    const authclient = await AuthClient.create();

    await authclient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: async () => {
        const identity = authclient.getIdentity();
        console.log("Logged in with Internet Identity:", identity.getPrincipal().toText());
        
        localStorage.setItem("userRole", role)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userPrincipal", identity.getPrincipal().toText())
        router.push(`/dashboard/${role}?canisterId=${canisterId}`)
        // unoptiized: will use serviceActor 
        
        // if an error occurs, please just reload the website
        // the optimization
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">TidalChain</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Join 
              <span className="font-bold text-blue-900">TidalChain</span>
            </h1>
            <p className="text-xl text-gray-600">Choose your role and start your sustainable aquaculture journey</p>
          </div>
          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
            <TabsContent value="producer" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Fish Producer
                      </CardTitle>
                      <CardDescription>
                        Tokenize your sustainable fish harvests and access global funding
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">What you can do:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Create tokens for future harvests</li>
                        <li>• Access upfront funding from investors</li>
                        <li>• Manage harvest settlements</li>
                        <li>• Build reputation and certifications</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Government issued certifications</li>
                        <li>• KYC verification</li>
                      </ul>
                    </div>
                  </div>
                  <Button onClick={() => handleInternetIdentityLogin("producer")} className="w-full" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Continue with Internet Identity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
