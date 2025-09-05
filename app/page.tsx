"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Users,
  Calendar,
  BookOpen,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Count-up animation hook
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, hasStarted])

  return { count, startCounting: () => setHasStarted(true) }
}

// Testimonial carousel component
function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "The support I received here changed my life. The community is incredibly welcoming and understanding.",
    },
    {
      name: "Michael R.",
      text: "Finding this group was a turning point in my mental health journey. I finally felt heard and supported.",
    },
    {
      name: "Jennifer L.",
      text: "The resources and weekly meetings have given me tools to manage my anxiety better than ever before.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-card rounded-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={prevTestimonial}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={nextTestimonial}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <blockquote className="text-center">
        <p className="text-lg text-muted-foreground italic mb-4">"{testimonials[currentIndex].text}"</p>
        <footer className="text-sm font-medium text-foreground">— {testimonials[currentIndex].name}</footer>
      </blockquote>
    </div>
  )
}

// Stats counter component
function StatsCounter() {
  const memberCount = useCountUp(2847)
  const groupCount = useCountUp(24)
  const eventCount = useCountUp(156)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            memberCount.startCounting()
            groupCount.startCounting()
            eventCount.startCounting()
          }
        })
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="stats-section" className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center animate-count-up">
        <div className="text-4xl font-bold text-primary mb-2">{memberCount.count.toLocaleString()}+</div>
        <div className="text-muted-foreground">Community Members</div>
      </div>
      <div className="text-center animate-count-up">
        <div className="text-4xl font-bold text-accent mb-2">{groupCount.count}+</div>
        <div className="text-muted-foreground">Support Groups</div>
      </div>
      <div className="text-center animate-count-up">
        <div className="text-4xl font-bold text-primary mb-2">{eventCount.count}+</div>
        <div className="text-muted-foreground">Events Hosted</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10"
          style={{
            backgroundImage: `url('/placeholder-llovp.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-background/60" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up text-balance">
            Your Mental Health Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up text-pretty">
            Join our compassionate community dedicated to mental wellness, crisis support, and healing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              Crisis Support
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-background curved-divider" />
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Our Mission & Values</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-pretty">
                We are defined by compassion, understanding, and unwavering support. Our mission is to create a safe
                space where individuals can find healing, build resilience, and connect with others who understand their
                journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Compassionate Care</h3>
                    <p className="text-muted-foreground">Every interaction is guided by empathy and understanding.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Community Support</h3>
                    <p className="text-muted-foreground">Building connections that foster healing and growth.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Professional Excellence</h3>
                    <p className="text-muted-foreground">Evidence-based approaches delivered with expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder-z5xht.png"
                alt="Support group session"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="/placeholder-j6eks.png" alt="Community members" className="rounded-lg shadow-lg w-full" />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">2,847+</div>
                <div className="text-sm opacity-90">Active Members</div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Join Our Growing Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
                Become part of a supportive network where your voice matters and your journey is valued. Our community
                offers peer support, professional guidance, and resources for every step of your mental health journey.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Join Today
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Groups Banner */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('/placeholder-qlfjb.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
            Find Your Support Group
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Connect with others who understand your experiences. Our specialized support groups provide safe spaces for
            healing and growth.
          </p>
          <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            Explore Support Groups
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Join Banner */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('/placeholder-nywcl.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-accent/80" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6 text-balance">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Registration is simple and confidential. Take the first step towards better mental health today.
          </p>
          <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Donate Banner */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url('/hands-reaching-out-in-support-and-community-care.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
            Support Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Your donation helps us provide free mental health resources and support to those who need it most.
          </p>
          <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            Make a Donation
            <Heart className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Upcoming Events Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Anxiety Support Workshop",
                date: "March 15, 2024",
                image: "/workshop-room-with-people-learning-coping-strategi.jpg",
              },
              {
                title: "Mindfulness Meditation Session",
                date: "March 18, 2024",
                image: "/placeholder-o0txv.png",
              },
              {
                title: "Family Support Group Meeting",
                date: "March 22, 2024",
                image: "/family-members-in-supportive-discussion-circle.jpg",
              },
            ].map((event, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.date}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Blog Carousel */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Latest News & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Understanding Seasonal Depression",
                date: "March 10, 2024",
                excerpt: "Learn about the signs, symptoms, and coping strategies for seasonal affective disorder.",
                image: "/person-looking-out-window-during-winter-season.jpg",
              },
              {
                title: "Building Resilience in Difficult Times",
                date: "March 8, 2024",
                excerpt: "Practical tips for developing emotional resilience and mental strength.",
                image: "/person-climbing-mountain-representing-overcoming-c.jpg",
              },
              {
                title: "The Power of Community Support",
                date: "March 5, 2024",
                excerpt: "How connecting with others can accelerate your mental health journey.",
                image: "/diverse-support-group.png",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {article.date}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Community Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "/group-therapy-session-with-participants-sharing.jpg",
              "/community-event-with-people-socializing.jpg",
              "/workshop-participants-learning-new-skills.jpg",
              "/outdoor-mindfulness-session-in-nature.jpg",
              "/volunteer-appreciation-event.jpg",
              "/placeholder.svg?height=250&width=250",
              "/placeholder.svg?height=250&width=250",
              "/placeholder.svg?height=250&width=250",
            ].map((src, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Trusted by Healthcare Professionals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                title: "Licensed Clinical Psychologist",
                endorsement:
                  "MindCare provides exceptional community-based mental health support that complements professional treatment beautifully.",
              },
              {
                name: "Michael Chen, LCSW",
                title: "Licensed Clinical Social Worker",
                endorsement:
                  "I regularly refer clients to MindCare's support groups. The peer support model is incredibly effective.",
              },
              {
                name: "Dr. Emily Rodriguez",
                title: "Psychiatrist",
                endorsement:
                  "The holistic approach and community focus at MindCare creates lasting positive outcomes for participants.",
              },
            ].map((endorsement, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <p className="text-muted-foreground italic mb-4">"{endorsement.endorsement}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{endorsement.name}</div>
                    <div className="text-sm text-muted-foreground">{endorsement.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Stories of Hope & Healing
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Statistics Counter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Our Impact in Numbers</h2>
          <StatsCounter />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Organization Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
                We're here to support you. Reach out for information about our services, support groups, or if you need
                immediate assistance.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">Crisis Hotline</div>
                    <div className="text-muted-foreground">(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">support@mindcare.org</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">Address</div>
                    <div className="text-muted-foreground">
                      123 Wellness Street
                      <br />
                      Care City, CC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-foreground mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-1">
                      Comments
                    </label>
                    <Textarea id="comments" placeholder="How can we help you today?" rows={4} />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
