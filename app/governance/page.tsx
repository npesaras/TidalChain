"use client"


// this page is for the DAO governance, further development will be done on the motoko backend
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Vote, Plus, Clock, CheckCircle, XCircle, Users, DollarSign, Shield } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function GovernancePage() {
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState<"producer" | "investor" | "buyer">("producer")

  useEffect(() => {
    // Get user role from URL params or localStorage
    const roleFromUrl = searchParams.get("role") as "producer" | "investor" | "buyer"
    const storedRole = localStorage.getItem("userRole") as "producer" | "investor" | "buyer"

    if (roleFromUrl) {
      setUserRole(roleFromUrl)
      localStorage.setItem("userRole", roleFromUrl)
    } else if (storedRole) {
      setUserRole(storedRole)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-blue-100">
      <DashboardHeader forceRole={userRole} />
      <div className="container mx-auto px-4 py-8">        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DAO Governance</h1>
            <p className="text-gray-600">Participate in platform decisions and community proposals</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Proposal
          </Button>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Voting Power</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-muted-foreground">TF tokens held</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Awaiting votes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participation Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Community engagement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Votes Cast</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Proposals</TabsTrigger>
            <TabsTrigger value="history">Voting History</TabsTrigger>
            <TabsTrigger value="analytics">DAO Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="space-y-6">
              {[
                {
                  id: "PROP-001",
                  title: "Reduce Platform Transaction Fees",
                  description:
                    "Proposal to reduce transaction fees from 2.5% to 2.0% to make the platform more accessible to smaller producers and investors.",
                  category: "Platform Economics",
                  proposer: "Smallproducer.icp",
                  timeLeft: "3 days",
                  votesFor: 12450,
                  votesAgainst: 3200,
                  totalVotes: 15650,
                  quorum: 20000,
                  status: "Active",
                  yourVote: null,
                  icon: <DollarSign className="h-5 w-5 text-blue-600" />,
                },
                {
                  id: "PROP-002",
                  title: "Implement Multi-Signature Escrow",
                  description:
                    "Add multi-signature escrow functionality to enhance security for large token transactions and settlements.",
                  category: "Security & Infrastructure",
                  proposer: "SecurityDAO.icp",
                  timeLeft: "5 days",
                  votesFor: 8900,
                  votesAgainst: 5600,
                  totalVotes: 14500,
                  quorum: 20000,
                  status: "Active",
                  yourVote: "For",
                  icon: <Shield className="h-5 w-5 text-purple-600" />,
                },
                {
                  id: "PROP-003",
                  title: "Establish producer Support Fund",
                  description:
                    "Create a community fund to help new producers with initial setup costs and technology implementation.",
                  category: "Community Support",
                  proposer: "producerSupport.icp",
                  timeLeft: "1 week",
                  votesFor: 15200,
                  votesAgainst: 2100,
                  totalVotes: 17300,
                  quorum: 20000,
                  status: "Active",
                  yourVote: null,
                  icon: <Users className="h-5 w-5 text-green-600" />,
                },
              ].map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {proposal.icon}
                        <div>
                          <CardTitle className="text-lg">{proposal.title}</CardTitle>
                          <CardDescription className="mt-1">{proposal.description}</CardDescription>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>By {proposal.proposer}</span>
                            <Badge variant="outline">{proposal.category}</Badge>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {proposal.timeLeft} left
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={proposal.status === "Active" ? "default" : "secondary"}>{proposal.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Votes For</p>
                        <p className="font-medium text-green-600">{proposal.votesFor.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Votes Against</p>
                        <p className="font-medium text-red-600">{proposal.votesAgainst.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Quorum Progress</p>
                        <p className="font-medium">{((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Voting Progress</span>
                        <span>
                          {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Support</span>
                        <span>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% For</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500"
                          style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                        ></div>
                        <div
                          className="bg-red-500"
                          style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {proposal.yourVote ? (
                        <Badge variant={proposal.yourVote === "For" ? "default" : "destructive"}>
                          You voted: {proposal.yourVote}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-600">You haven't voted yet</span>
                      )}
                      <div className="flex space-x-2">
                        {!proposal.yourVote && (
                          <>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Vote Against
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Vote For
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Voting History</CardTitle>
                <CardDescription>Track your participation in DAO governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "PROP-004",
                      title: "Increase Marketplace Listing Duration",
                      result: "Passed",
                      yourVote: "For",
                      finalVotes: "18,450 For / 4,200 Against",
                      date: "2024-01-15",
                    },
                    {
                      id: "PROP-005",
                      title: "Implement Premium Membership Tier",
                      result: "Failed",
                      yourVote: "Against",
                      finalVotes: "8,900 For / 15,600 Against",
                      date: "2024-01-08",
                    }
                  ].map((vote) => (
                    <div key={vote.id} className="border rounded-lg p-4 flex items-center justify-between bg-gray-100">
                      <div>
                        <h4 className="font-semibold">{vote.title}</h4>
                        <p className="text-sm text-gray-600">{vote.finalVotes}</p>
                        <p className="text-xs text-gray-500">{vote.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={vote.result === "Passed" ? "default" : "destructive"}>{vote.result}</Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          You voted: <span className="font-medium">{vote.yourVote}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>DAO Participation</CardTitle>
                  <CardDescription>Community engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Token Holders</span>
                      <span className="font-semibold">3,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Voters</span>
                      <span className="font-semibold">2,208 (68%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Proposal Participation</span>
                      <span className="font-semibold">72%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proposals This Quarter</span>
                      <span className="font-semibold">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proposal Categories</CardTitle>
                  <CardDescription>Distribution of governance topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Platform Economics</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Security & Infrastructure</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Community Support</span>
                      <span className="font-semibold">22%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Governance Rules</span>
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
