"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, MapPin, Search, Filter, Heart, Brain, Shield, Home } from "lucide-react"
import Link from "next/link"

const supportGroups = [
  {
    id: 1,
    name: "Anxiety & Panic Support",
    description: "A safe space for individuals dealing with anxiety disorders, panic attacks, and related challenges.",
    schedule: "Tuesdays, 7:00 PM - 8:30 PM",
    location: "Room A - Main Building",
    facilitator: "Dr. Sarah Johnson, LCSW",
    members: 12,
    maxMembers: 15,
    category: "anxiety",
    image: "/placeholder.svg?height=200&width=300&text=Anxiety+Support",
  },
  {
    id: 2,
    name: "Depression Recovery Circle",
    description: "Supporting each other through depression with understanding, hope, and practical coping strategies.",
    schedule: "Thursdays, 6:00 PM - 7:30 PM",
    location: "Room B - Main Building",
    facilitator: "Michael Chen, LMFT",
    members: 8,
    maxMembers: 12,
    category: "depression",
    image: "/placeholder.svg?height=200&width=300&text=Depression+Support",
  },
  {
    id: 3,
    name: "PTSD & Trauma Healing",
    description: "A specialized group for trauma survivors focusing on healing, resilience, and post-traumatic growth.",
    schedule: "Mondays, 6:30 PM - 8:00 PM",
    location: "Private Room C",
    facilitator: "Dr. Emily Rodriguez, PhD",
    members: 6,
    maxMembers: 10,
    category: "trauma",
    image: "/placeholder.svg?height=200&width=300&text=PTSD+Support",
  },
  {
    id: 4,
    name: "Grief & Loss Support",
    description: "Compassionate support for those navigating the journey of grief and loss in all its forms.",
    schedule: "Wednesdays, 7:00 PM - 8:30 PM",
    location: "Comfort Room D",
    facilitator: "Lisa Thompson, LCSW",
    members: 10,
    maxMembers: 12,
    category: "grief",
    image: "/placeholder.svg?height=200&width=300&text=Grief+Support",
  },
  {
    id: 5,
    name: "Addiction Recovery Group",
    description:
      "Supporting individuals in recovery from substance use disorders with peer support and accountability.",
    schedule: "Daily, 12:00 PM - 1:00 PM",
    location: "Recovery Center",
    facilitator: "James Wilson, CADC",
    members: 15,
    maxMembers: 20,
    category: "addiction",
    image: "/placeholder.svg?height=200&width=300&text=Addiction+Recovery",
  },
  {
    id: 6,
    name: "Family Support Network",
    description: "For family members and loved ones of individuals struggling with mental health challenges.",
    schedule: "Saturdays, 10:00 AM - 11:30 AM",
    location: "Family Room E",
    facilitator: "Dr. Maria Garcia, LMFT",
    members: 14,
    maxMembers: 16,
    category: "family",
    image: "/placeholder.svg?height=200&width=300&text=Family+Support",
  },
  {
    id: 7,
    name: "Young Adults (18-25)",
    description:
      "Peer support group specifically designed for young adults navigating mental health in early adulthood.",
    schedule: "Fridays, 7:00 PM - 8:30 PM",
    location: "Youth Center",
    facilitator: "Alex Johnson, LCSW",
    members: 9,
    maxMembers: 12,
    category: "youth",
    image: "/placeholder.svg?height=200&width=300&text=Young+Adults",
  },
  {
    id: 8,
    name: "Bipolar Support Alliance",
    description: "Understanding and managing bipolar disorder through shared experiences and professional guidance.",
    schedule: "Sundays, 2:00 PM - 3:30 PM",
    location: "Room F - Main Building",
    facilitator: "Dr. Robert Kim, MD",
    members: 7,
    maxMembers: 10,
    category: "bipolar",
    image: "/placeholder.svg?height=200&width=300&text=Bipolar+Support",
  },
]

const categories = [
  { value: "all", label: "All Groups", icon: Users },
  { value: "anxiety", label: "Anxiety", icon: Brain },
  { value: "depression", label: "Depression", icon: Heart },
  { value: "trauma", label: "Trauma/PTSD", icon: Shield },
  { value: "grief", label: "Grief & Loss", icon: Heart },
  { value: "addiction", label: "Addiction", icon: Shield },
  { value: "family", label: "Family Support", icon: Home },
  { value: "youth", label: "Young Adults", icon: Users },
  { value: "bipolar", label: "Bipolar", icon: Brain },
]

export default function SupportGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredGroups, setFilteredGroups] = useState(supportGroups)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterGroups(term, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterGroups(searchTerm, category)
  }

  const filterGroups = (term: string, category: string) => {
    let filtered = supportGroups

    if (category !== "all") {
      filtered = filtered.filter((group) => group.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(term.toLowerCase()) ||
          group.description.toLowerCase().includes(term.toLowerCase()),
      )
    }

    setFilteredGroups(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Find Your Support Group
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Connect with others who understand your journey. Our professionally facilitated support groups provide
              safe spaces for healing, growth, and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Join a Group Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#groups">Browse Groups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search support groups..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className="flex items-center gap-2"
                >
                  <category.icon className="h-3 w-3" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Groups Grid */}
      <section id="groups" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Available Support Groups ({filteredGroups.length})
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All groups are professionally facilitated and provide a confidential, supportive environment for healing
              and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {group.members}/{group.maxMembers} members
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{group.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      {group.schedule}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      {group.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-accent" />
                      Facilitated by {group.facilitator}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" asChild>
                      <Link href={`/register?group=${group.id}`}>Join Group</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/support-groups/${group.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No support groups found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setFilteredGroups(supportGroups)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Support Groups Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our support groups follow a structured approach designed to create safe, healing environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Register & Attend</h3>
              <p className="text-muted-foreground">
                Complete our simple registration process and attend your first meeting. No commitment required for the
                first session.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Share & Listen</h3>
              <p className="text-muted-foreground">
                Participate at your comfort level. Share your experiences or simply listen - both are valuable
                contributions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Grow & Heal</h3>
              <p className="text-muted-foreground">
                Build connections, learn coping strategies, and experience the healing power of community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of others who have found hope, healing, and community through our support groups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Register for a Group</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/contact">Ask Questions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
