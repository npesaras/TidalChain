"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Waves, User, Settings, LogOut, Bell, Fish, TrendingUp, ShoppingCart, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { canisterId } from "@/components/declarations/tidal_chain_assets"

interface DashboardHeaderProps {
  userRole?: "producer"
  forceRole?: "producer" // Force a specific role
}

export function DashboardHeader({ userRole: propUserRole, forceRole }: DashboardHeaderProps) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<"producer" | "investor" | "buyer">("producer")

  useEffect(() => {
    // Force role takes precedence, then prop, then localStorage
    if (forceRole) {
      setUserRole(forceRole)
      localStorage.setItem("userRole", forceRole)
    } else if (propUserRole) {
      setUserRole(propUserRole)
      localStorage.setItem("userRole", propUserRole)
    } else {
      const storedRole = localStorage.getItem("userRole") as "producer" | "investor" | "buyer"
      if (storedRole) {
        setUserRole(storedRole)
      }
    }
  }, [propUserRole, forceRole])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("isAuthenticated")
    router.push(`/?canisterId=${canisterId}`)
  }

  const getRoleIcon = () => {
    switch (userRole) {
      case "producer":
        return <Fish className="h-4 w-4" />
    }
  }

  const getRoleColor = () => {
    switch (userRole) {
      case "producer":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-green-100 text-green-800"
      case "buyer":
        return "bg-purple-100 text-purple-800"
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">TidalChain</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href={`/dashboard/${userRole}`} className="text-gray-600 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            {userRole === "producer" && (
              <>
                <Link href={`/dashboard/producer/pond?canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
                  My Pond
                </Link>
                <Link href={`/dashboard/producer/tokens?canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
                  My Tokens
                </Link>
                <Link href={`/dashboard/producer/delivery?canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
                  Delivery
                </Link>
                <Link href={`/dashboard/producer/revenue?canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
                  Revenue
                </Link>
              </>
            )}
            <Link href={`/marketplace?role=${userRole}&canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
              Marketplace
            </Link>
            <Link href={`/governance?role=${userRole}&canisterId=${canisterId}`} className="text-gray-600 hover:text-blue-600">
              Governance
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Badge className={getRoleColor()}>
            {getRoleIcon()}
            <span className="ml-1 capitalize">{userRole}</span>
          </Badge>

          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account ({userRole})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/profile?canisterId=${canisterId}`}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/settings?canisterId=${canisterId}`}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
              <Link href={`/help?canisterId=${canisterId}`}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
