"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Calendar, Users, Heart, Camera, Video, Award, Play } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "Community Support Group Session",
    description: "Weekly anxiety support group meeting in our main conference room",
    type: "photo",
    category: "support-groups",
    date: "2024-03-10",
    image: "/group-therapy-session-with-participants-sharing.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Mindfulness Workshop in the Garden",
    description: "Outdoor meditation session focusing on nature-based mindfulness practices",
    type: "photo",
    category: "workshops",
    date: "2024-03-08",
    image: "/outdoor-mindfulness-session-in-nature.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Family Support Network Meeting",
    description: "Monthly gathering for families and loved ones of individuals with mental health challenges",
    type: "photo",
    category: "family-support",
    date: "2024-03-05",
    image: "/family-members-in-supportive-discussion-circle.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Art Therapy Workshop Highlights",
    description: "Creative expression session where participants explore emotions through art",
    type: "video",
    category: "workshops",
    date: "2024-03-02",
    image: "/placeholder.svg?height=300&width=400&text=Art+Therapy+Video",
    videoUrl: "/placeholder-video.mp4",
    featured: true,
  },
  {
    id: 5,
    title: "Community Mental Health Fair",
    description: "Annual event bringing together local mental health resources and community members",
    type: "photo",
    category: "events",
    date: "2024-02-28",
    image: "/community-event-with-people-socializing.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Volunteer Appreciation Ceremony",
    description: "Celebrating our dedicated volunteers who make our programs possible",
    type: "photo",
    category: "events",
    date: "2024-02-25",
    image: "/volunteer-appreciation-event.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "Coping Skills Workshop",
    description: "Interactive session teaching practical techniques for managing stress and anxiety",
    type: "photo",
    category: "workshops",
    date: "2024-02-22",
    image: "/workshop-participants-learning-new-skills.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Peer Support Training Session",
    description: "Training new peer support specialists in our evidence-based program",
    type: "video",
    category: "training",
    date: "2024-02-18",
    image: "/placeholder.svg?height=300&width=400&text=Training+Video",
    videoUrl: "/placeholder-video.mp4",
    featured: false,
  },
  {
    id: 9,
    title: "Wellness Fair Setup",
    description: "Behind-the-scenes preparation for our community wellness fair",
    type: "photo",
    category: "events",
    date: "2024-02-15",
    image: "/placeholder.svg?height=300&width=400&text=Event+Setup",
    featured: false,
  },
  {
    id: 10,
    title: "Success Stories Interview",
    description: "Community member sharing their recovery journey and hope for others",
    type: "video",
    category: "testimonials",
    date: "2024-02-12",
    image: "/placeholder.svg?height=300&width=400&text=Success+Story",
    videoUrl: "/placeholder-video.mp4",
    featured: true,
  },
  {
    id: 11,
    title: "Group Meditation Circle",
    description: "Weekly meditation practice bringing peace and mindfulness to participants",
    type: "photo",
    category: "support-groups",
    date: "2024-02-08",
    image: "/placeholder.svg?height=300&width=400&text=Meditation+Circle",
    featured: false,
  },
  {
    id: 12,
    title: "Mental Health Awareness Campaign",
    description: "Community outreach efforts to reduce stigma and promote mental health awareness",
    type: "photo",
    category: "advocacy",
    date: "2024-02-05",
    image: "/placeholder.svg?height=300&width=400&text=Awareness+Campaign",
    featured: false,
  },
]

const categories = [
  { value: "all", label: "All Media", icon: Camera },
  { value: "support-groups", label: "Support Groups", icon: Users },
  { value: "workshops", label: "Workshops", icon: Heart },
  { value: "events", label: "Events", icon: Calendar },
  { value: "family-support", label: "Family Support", icon: Heart },
  { value: "training", label: "Training", icon: Award },
  { value: "testimonials", label: "Testimonials", icon: Video },
  { value: "advocacy", label: "Advocacy", icon: Heart },
]

const mediaTypes = [
  { value: "all", label: "All Types" },
  { value: "photo", label: "Photos" },
  { value: "video", label: "Videos" },
]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterItems(term, selectedCategory, selectedType)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterItems(searchTerm, category, selectedType)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    filterItems(searchTerm, selectedCategory, type)
  }

  const filterItems = (term: string, category: string, type: string) => {
    let filtered = galleryItems

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category)
    }

    if (type !== "all") {
      filtered = filtered.filter((item) => item.type === type)
    }

    if (term) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const featuredItems = galleryItems.filter((item) => item.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Community Gallery</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Explore moments of connection, healing, and hope from our community events, workshops, and support group
              sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#gallery">Browse Gallery</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/events">Join Our Events</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Featured Moments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.slice(0, 6).map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        {item.type === "video" ? (
                          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <Camera className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Featured</Badge>
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{item.category.replace("-", " ")}</span>
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {item.type === "video" ? (
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Video content would be displayed here</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{item.category.replace("-", " ")}</span>
                        <span>{formatDate(item.date)}</span>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
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
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {mediaTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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

      {/* Gallery Grid */}
      <section id="gallery" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">All Media ({filteredItems.length})</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our collection of photos and videos showcasing the heart of our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative aspect-square">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        {item.type === "video" ? (
                          <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground capitalize text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1 mb-1">{item.title}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{item.category.replace("-", " ")}</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {item.type === "video" ? (
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Video content would be displayed here</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full rounded-lg object-cover max-h-96"
                      />
                    )}
                    <div>
                      <p className="text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{item.category.replace("-", " ")}</span>
                        <span>{formatDate(item.date)}</span>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No media found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedType("all")
                  setFilteredItems(galleryItems)
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
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Story</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community and create your own moments of healing, connection, and hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/register">Join Our Community</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <a href="/events">Attend an Event</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
