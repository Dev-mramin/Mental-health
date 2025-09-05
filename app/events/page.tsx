"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, Filter, Heart, Brain, BookOpen, Mic, Coffee, Star } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "Anxiety Management Workshop",
    description:
      "Learn practical techniques for managing anxiety in daily life, including breathing exercises, mindfulness, and cognitive strategies.",
    date: "2024-03-15",
    time: "2:00 PM - 4:00 PM",
    location: "Main Conference Room",
    category: "workshop",
    facilitator: "Dr. Sarah Johnson, LCSW",
    capacity: 25,
    registered: 18,
    price: "Free",
    image: "/workshop-room-with-people-learning-coping-strategi.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Mindfulness Meditation Session",
    description: "Guided meditation session focusing on present-moment awareness and stress reduction techniques.",
    date: "2024-03-18",
    time: "7:00 PM - 8:00 PM",
    location: "Meditation Garden",
    category: "meditation",
    facilitator: "Michael Chen, LMFT",
    capacity: 15,
    registered: 12,
    price: "Free",
    image: "/outdoor-mindfulness-session-in-nature.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Family Support Group Meeting",
    description: "Monthly meeting for families and loved ones of individuals with mental health challenges.",
    date: "2024-03-22",
    time: "10:00 AM - 12:00 PM",
    location: "Family Room E",
    category: "support-group",
    facilitator: "Dr. Maria Garcia, LMFT",
    capacity: 20,
    registered: 14,
    price: "Free",
    image: "/family-members-in-supportive-discussion-circle.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Mental Health First Aid Training",
    description:
      "Comprehensive training on how to identify, understand, and respond to signs of mental illness and substance use disorders.",
    date: "2024-03-25",
    time: "9:00 AM - 5:00 PM",
    location: "Training Center",
    category: "training",
    facilitator: "Certified MHFA Instructors",
    capacity: 30,
    registered: 22,
    price: "$75",
    image: "/hands-reaching-out-in-support-and-community-care.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Art Therapy Workshop",
    description: "Express yourself through creative art activities designed to promote healing and self-discovery.",
    date: "2024-03-28",
    time: "1:00 PM - 3:00 PM",
    location: "Art Studio",
    category: "therapy",
    facilitator: "Jennifer Martinez, ATR-BC",
    capacity: 12,
    registered: 8,
    price: "$20",
    image: "/placeholder.svg?height=200&width=300&text=Art+Therapy",
    featured: false,
  },
  {
    id: 6,
    title: "Grief Support Circle",
    description: "A safe space to share experiences and find comfort with others who understand the journey of grief.",
    date: "2024-04-02",
    time: "6:30 PM - 8:00 PM",
    location: "Comfort Room D",
    category: "support-group",
    facilitator: "Lisa Thompson, LCSW",
    capacity: 15,
    registered: 9,
    price: "Free",
    image: "/placeholder.svg?height=200&width=300&text=Grief+Support",
    featured: false,
  },
  {
    id: 7,
    title: "Stress Management Seminar",
    description: "Learn evidence-based strategies for managing stress in work, relationships, and daily life.",
    date: "2024-04-05",
    time: "11:00 AM - 1:00 PM",
    location: "Seminar Hall",
    category: "seminar",
    facilitator: "Dr. Robert Kim, PhD",
    capacity: 40,
    registered: 28,
    price: "$15",
    image: "/placeholder.svg?height=200&width=300&text=Stress+Management",
    featured: false,
  },
  {
    id: 8,
    title: "Community Mental Health Fair",
    description:
      "Annual fair featuring local mental health resources, screenings, and wellness activities for the whole family.",
    date: "2024-04-12",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center Plaza",
    category: "community",
    facilitator: "Multiple Organizations",
    capacity: 500,
    registered: 156,
    price: "Free",
    image: "/community-event-with-people-socializing.jpg",
    featured: true,
  },
]

const categories = [
  { value: "all", label: "All Events", icon: Calendar },
  { value: "workshop", label: "Workshops", icon: BookOpen },
  { value: "meditation", label: "Meditation", icon: Brain },
  { value: "support-group", label: "Support Groups", icon: Users },
  { value: "training", label: "Training", icon: Star },
  { value: "therapy", label: "Therapy", icon: Heart },
  { value: "seminar", label: "Seminars", icon: Mic },
  { value: "community", label: "Community", icon: Coffee },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState(events)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterEvents(term, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterEvents(searchTerm, category)
  }

  const filterEvents = (term: string, category: string) => {
    let filtered = events

    if (category !== "all") {
      filtered = filtered.filter((event) => event.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term.toLowerCase()) ||
          event.description.toLowerCase().includes(term.toLowerCase()),
      )
    }

    setFilteredEvents(filtered)
  }

  const featuredEvents = events.filter((event) => event.featured)
  const upcomingEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Upcoming Events & Workshops
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join our community events, workshops, and training sessions designed to support your mental health journey
              and build connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#events">Browse Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Featured</Badge>
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{event.price}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-accent" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" asChild>
                      <Link href={`/events/${event.id}/register`}>Register</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${event.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
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

      {/* All Events */}
      <section id="events" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">All Events ({upcomingEvents.length})</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover workshops, support groups, and community events designed to support your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">{event.price}</Badge>
                  {event.registered >= event.capacity * 0.9 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      Almost Full
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {event.category.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {event.registered}/{event.capacity} spots
                    </span>
                  </div>
                  <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-accent" />
                      Facilitated by {event.facilitator}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      disabled={event.registered >= event.capacity}
                      asChild={event.registered < event.capacity}
                    >
                      {event.registered >= event.capacity ? (
                        "Full"
                      ) : (
                        <Link href={`/events/${event.id}/register`}>Register</Link>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${event.id}`}>Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setFilteredEvents(events)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated on New Events</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter to be the first to know about new workshops, support groups, and community
            events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="bg-background text-foreground" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
