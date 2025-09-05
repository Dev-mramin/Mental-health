"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  Navigation,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    urgency: "normal",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const validateForm = () => {
    return formData.name && formData.email && formData.message && formData.category
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Message Sent Successfully!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for reaching out to us. We've received your message and will respond within 24 hours.
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• We'll review your message and determine the best person to help</li>
                  <li>• You'll receive a response via email within 24 hours</li>
                  <li>• For urgent matters, we may call you directly</li>
                  <li>• Crisis support is available 24/7 at (555) 123-4567</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/">Return Home</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/support-groups">Explore Support Groups</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              We're here to support you. Reach out for information about our services, support groups, or if you need
              immediate assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Alert */}
      <section className="py-8 bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="max-w-4xl mx-auto border-destructive/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-center">
              <strong>Crisis Support Available 24/7:</strong> If you're experiencing a mental health crisis, please call
              our crisis line at{" "}
              <a href="tel:555-123-4567" className="font-semibold underline">
                (555) 123-4567
              </a>{" "}
              or contact emergency services at 911.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Multiple ways to reach us - choose what works best for you.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>
                            <strong>Crisis Line:</strong>{" "}
                            <a href="tel:555-123-4567" className="text-primary hover:underline">
                              (555) 123-4567
                            </a>{" "}
                            (24/7)
                          </p>
                          <p>
                            <strong>General Info:</strong>{" "}
                            <a href="tel:555-123-4568" className="text-primary hover:underline">
                              (555) 123-4568
                            </a>
                          </p>
                          <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>
                            <strong>General:</strong>{" "}
                            <a href="mailto:support@mindcare.org" className="text-primary hover:underline">
                              support@mindcare.org
                            </a>
                          </p>
                          <p>
                            <strong>Programs:</strong>{" "}
                            <a href="mailto:programs@mindcare.org" className="text-primary hover:underline">
                              programs@mindcare.org
                            </a>
                          </p>
                          <p className="text-sm">Response within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>123 Wellness Street</p>
                          <p>Care City, CC 12345</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent" asChild>
                            <a
                              href="https://maps.google.com/?q=123+Wellness+Street+Care+City+CC+12345"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              Get Directions
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                        <div className="space-y-1 text-muted-foreground text-sm">
                          <p>
                            <strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM
                          </p>
                          <p>
                            <strong>Saturday:</strong> 9:00 AM - 3:00 PM
                          </p>
                          <p>
                            <strong>Sunday:</strong> Closed
                          </p>
                          <p className="text-xs mt-2">Crisis support available 24/7</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="support-groups">Support Groups</SelectItem>
                            <SelectItem value="events">Events & Workshops</SelectItem>
                            <SelectItem value="registration">Registration Help</SelectItem>
                            <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                            <SelectItem value="donations">Donations</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="media">Media Inquiries</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General inquiry</SelectItem>
                            <SelectItem value="normal">Normal - Standard response</SelectItem>
                            <SelectItem value="high">High - Need quick response</SelectItem>
                            <SelectItem value="urgent">Urgent - Same day response needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry or how we can help you..."
                        rows={6}
                        required
                      />
                    </div>

                    {formData.urgency === "urgent" && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          For urgent matters, please consider calling our crisis line at (555) 123-4567 for immediate
                          assistance.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={!validateForm() || isSubmitting}>
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Additional Ways to Connect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore other ways to engage with our community and access mental health resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Join Support Groups</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with others who understand your journey in our professionally facilitated support groups.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/support-groups">Browse Groups</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Volunteer With Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Make a difference in your community by volunteering with our programs and events.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/volunteer">Learn More</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Crisis Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access immediate support and crisis intervention resources available 24/7.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/crisis-resources">Get Help Now</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Us</h2>
            <p className="text-muted-foreground">
              Located in the heart of Care City, easily accessible by public transit.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Interactive map would be displayed here</p>
                <Button variant="outline" asChild>
                  <a
                    href="https://maps.google.com/?q=123+Wellness+Street+Care+City+CC+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
