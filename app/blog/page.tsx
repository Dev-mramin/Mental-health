"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, Filter, Heart, Brain, Shield, BookOpen, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Seasonal Affective Disorder: Signs, Symptoms, and Solutions",
    excerpt:
      "As the days grow shorter and darker, many people experience changes in mood and energy. Learn about seasonal affective disorder (SAD) and effective coping strategies.",
    content:
      "Seasonal Affective Disorder (SAD) is a type of depression that occurs at specific times of the year, most commonly during fall and winter months...",
    author: "Dr. Sarah Johnson, LCSW",
    date: "2024-03-10",
    readTime: "8 min read",
    category: "mental-health",
    tags: ["depression", "seasonal", "coping-strategies"],
    image: "/person-looking-out-window-during-winter-season.jpg",
    featured: true,
    views: 1247,
  },
  {
    id: 2,
    title: "Building Resilience in Difficult Times: A Practical Guide",
    excerpt:
      "Resilience isn't something you're born with - it's a skill that can be developed. Discover practical strategies for building emotional strength and bouncing back from adversity.",
    content:
      "Resilience is the ability to adapt and bounce back when things don't go as planned. It's not about avoiding stress or hardship...",
    author: "Michael Chen, LMFT",
    date: "2024-03-08",
    readTime: "6 min read",
    category: "resilience",
    tags: ["resilience", "coping", "mental-strength"],
    image: "/person-climbing-mountain-representing-overcoming-c.jpg",
    featured: true,
    views: 892,
  },
  {
    id: 3,
    title: "The Power of Community Support in Mental Health Recovery",
    excerpt:
      "Research shows that social connections play a crucial role in mental health recovery. Learn how community support can accelerate your healing journey.",
    content:
      "Human beings are inherently social creatures. Our connections with others profoundly impact our mental health and well-being...",
    author: "Dr. Emily Rodriguez, PhD",
    date: "2024-03-05",
    readTime: "7 min read",
    category: "community",
    tags: ["community", "support", "recovery"],
    image: "/diverse-support-group.png",
    featured: false,
    views: 654,
  },
  {
    id: 4,
    title: "Mindfulness Techniques for Anxiety Management",
    excerpt:
      "Discover simple yet powerful mindfulness practices that can help reduce anxiety and bring more peace to your daily life.",
    content: "Mindfulness is the practice of purposeful, non-judgmental awareness of the present moment...",
    author: "Lisa Thompson, LCSW",
    date: "2024-03-02",
    readTime: "5 min read",
    category: "mindfulness",
    tags: ["mindfulness", "anxiety", "meditation"],
    image: "/outdoor-mindfulness-session-in-nature.jpg",
    featured: false,
    views: 1156,
  },
  {
    id: 5,
    title: "Breaking the Stigma: Talking About Mental Health at Work",
    excerpt:
      "Creating mentally healthy workplaces starts with open conversations. Learn how to advocate for mental health awareness in your workplace.",
    content:
      "Mental health stigma in the workplace remains a significant barrier to seeking help and creating supportive environments...",
    author: "Dr. Robert Kim, MD",
    date: "2024-02-28",
    readTime: "9 min read",
    category: "workplace",
    tags: ["stigma", "workplace", "advocacy"],
    image: "/placeholder.svg?height=200&width=300&text=Workplace+Mental+Health",
    featured: false,
    views: 743,
  },
  {
    id: 6,
    title: "Supporting a Loved One Through Depression",
    excerpt:
      "When someone you care about is struggling with depression, knowing how to help can feel overwhelming. Here's a guide for family and friends.",
    content:
      "Supporting someone with depression requires patience, understanding, and knowledge about the condition...",
    author: "Dr. Maria Garcia, LMFT",
    date: "2024-02-25",
    readTime: "6 min read",
    category: "family-support",
    tags: ["depression", "family", "support"],
    image: "/family-members-in-supportive-discussion-circle.jpg",
    featured: false,
    views: 987,
  },
  {
    id: 7,
    title: "The Science Behind Gratitude and Mental Health",
    excerpt:
      "Research reveals the powerful connection between gratitude practices and improved mental well-being. Learn how to harness this simple yet effective tool.",
    content:
      "Gratitude isn't just a feel-good emotion - it's a scientifically-backed practice that can significantly impact mental health...",
    author: "Dr. Jennifer Martinez, PhD",
    date: "2024-02-22",
    readTime: "7 min read",
    category: "wellness",
    tags: ["gratitude", "research", "well-being"],
    image: "/placeholder.svg?height=200&width=300&text=Gratitude+Practice",
    featured: true,
    views: 1334,
  },
  {
    id: 8,
    title: "Understanding Trauma: Types, Effects, and Healing Pathways",
    excerpt:
      "Trauma affects everyone differently. Learn about different types of trauma, their impacts, and evidence-based approaches to healing.",
    content:
      "Trauma is the emotional response to a deeply distressing or disturbing event that overwhelms an individual's ability to cope...",
    author: "Dr. Alex Johnson, LCSW",
    date: "2024-02-18",
    readTime: "10 min read",
    category: "trauma",
    tags: ["trauma", "healing", "therapy"],
    image: "/placeholder.svg?height=200&width=300&text=Trauma+Healing",
    featured: false,
    views: 876,
  },
]

const categories = [
  { value: "all", label: "All Posts", icon: BookOpen },
  { value: "mental-health", label: "Mental Health", icon: Brain },
  { value: "resilience", label: "Resilience", icon: Shield },
  { value: "community", label: "Community", icon: Users },
  { value: "mindfulness", label: "Mindfulness", icon: Heart },
  { value: "workplace", label: "Workplace", icon: Lightbulb },
  { value: "family-support", label: "Family Support", icon: Heart },
  { value: "wellness", label: "Wellness", icon: Lightbulb },
  { value: "trauma", label: "Trauma", icon: Shield },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterPosts(term, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterPosts(searchTerm, category)
  }

  const filterPosts = (term: string, category: string) => {
    let filtered = blogPosts

    if (category !== "all") {
      filtered = filtered.filter((post) => post.category === category)
    }

    if (term) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Mental Health Resources & Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Expert articles, research insights, and practical guidance to support your mental health journey and help
              you thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#blog">Read Articles</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support-groups">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Featured</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {post.category.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.views} views</span>
                  </div>
                  <CardTitle className="text-xl text-foreground line-clamp-2">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2 text-accent" />
                      {post.author}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-accent" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-accent" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
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
                  placeholder="Search articles..."
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

      {/* All Posts */}
      <section id="blog" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">All Articles ({recentPosts.length})</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of mental health articles, research insights, and practical guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {post.category.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.views} views</span>
                  </div>
                  <CardTitle className="text-xl text-foreground line-clamp-2">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2 text-accent" />
                      {post.author}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-accent" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-accent" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {recentPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setFilteredPosts(blogPosts)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter for the latest mental health insights, research updates, and practical tips
            delivered to your inbox.
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
