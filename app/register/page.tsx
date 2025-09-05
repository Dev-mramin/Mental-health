"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Shield, Heart, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react"
import { useSearchParams } from "next/navigation"

const supportGroups = [
  { id: 1, name: "Anxiety & Panic Support", schedule: "Tuesdays, 7:00 PM" },
  { id: 2, name: "Depression Recovery Circle", schedule: "Thursdays, 6:00 PM" },
  { id: 3, name: "PTSD & Trauma Healing", schedule: "Mondays, 6:30 PM" },
  { id: 4, name: "Grief & Loss Support", schedule: "Wednesdays, 7:00 PM" },
  { id: 5, name: "Addiction Recovery Group", schedule: "Daily, 12:00 PM" },
  { id: 6, name: "Family Support Network", schedule: "Saturdays, 10:00 AM" },
  { id: 7, name: "Young Adults (18-25)", schedule: "Fridays, 7:00 PM" },
  { id: 8, name: "Bipolar Support Alliance", schedule: "Sundays, 2:00 PM" },
]

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const preselectedGroup = searchParams?.get("group")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: "",
    selectedGroups: preselectedGroup ? [preselectedGroup] : [],
    previousTherapy: "",
    currentMedication: "",
    mentalHealthHistory: "",
    goals: "",
    howHeard: "",
    agreesToTerms: false,
    agreesToPrivacy: false,
    agreesToContact: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGroupSelection = (groupId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedGroups: prev.selectedGroups.includes(groupId)
        ? prev.selectedGroups.filter((id) => id !== groupId)
        : [...prev.selectedGroups, groupId],
    }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth
      case 2:
        return formData.selectedGroups.length > 0
      case 3:
        return formData.emergencyContact && formData.emergencyPhone
      case 4:
        return formData.agreesToTerms && formData.agreesToPrivacy
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Registration Successful!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for joining our community. We've received your registration and will contact you within 24
                hours with next steps.
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• You'll receive a confirmation email with group details</li>
                  <li>• A facilitator will call you for a brief orientation</li>
                  <li>• You'll get location and parking information</li>
                  <li>• We'll send you preparation materials for your first session</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/">Return Home</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/support-groups">Browse More Groups</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Join Our Community</h1>
            <p className="text-lg text-muted-foreground">
              Take the first step towards healing and connection. Registration is confidential and secure.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of 4:{" "}
                {currentStep === 1
                  ? "Personal Information"
                  : currentStep === 2
                    ? "Group Selection"
                    : currentStep === 3
                      ? "Health & Emergency Info"
                      : "Terms & Confirmation"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <Users className="h-5 w-5" />}
                  {currentStep === 2 && <Heart className="h-5 w-5" />}
                  {currentStep === 3 && <Shield className="h-5 w-5" />}
                  {currentStep === 4 && <CheckCircle className="h-5 w-5" />}
                  {currentStep === 1
                    ? "Personal Information"
                    : currentStep === 2
                      ? "Select Support Groups"
                      : currentStep === 3
                        ? "Health & Emergency Information"
                        : "Review & Confirm"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
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
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="howHeard">How did you hear about us?</Label>
                      <Select value={formData.howHeard} onValueChange={(value) => handleInputChange("howHeard", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Healthcare Provider Referral</SelectItem>
                          <SelectItem value="friend">Friend or Family</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="community">Community Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Group Selection */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        You can select multiple groups. We recommend starting with one and adding others as you feel
                        comfortable.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 gap-4">
                      {supportGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.selectedGroups.includes(group.id.toString())
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleGroupSelection(group.id.toString())}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{group.name}</h3>
                              <p className="text-sm text-muted-foreground">{group.schedule}</p>
                            </div>
                            <Checkbox
                              checked={formData.selectedGroups.includes(group.id.toString())}
                              onChange={() => handleGroupSelection(group.id.toString())}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.selectedGroups.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-foreground mb-2">Selected Groups:</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedGroups.map((groupId) => {
                            const group = supportGroups.find((g) => g.id.toString() === groupId)
                            return group ? (
                              <Badge key={groupId} variant="secondary">
                                {group.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Health & Emergency Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        This information helps us provide better support and ensures your safety. All information is
                        confidential.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="previousTherapy">Previous Therapy Experience</Label>
                      <RadioGroup
                        value={formData.previousTherapy}
                        onValueChange={(value) => handleInputChange("previousTherapy", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="therapy-none" />
                          <Label htmlFor="therapy-none">No previous therapy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="therapy-individual" />
                          <Label htmlFor="therapy-individual">Individual therapy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="group" id="therapy-group" />
                          <Label htmlFor="therapy-group">Group therapy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="therapy-both" />
                          <Label htmlFor="therapy-both">Both individual and group</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="currentMedication">Current Medications (Optional)</Label>
                      <Textarea
                        id="currentMedication"
                        value={formData.currentMedication}
                        onChange={(e) => handleInputChange("currentMedication", e.target.value)}
                        placeholder="List any current medications or write 'None'"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="mentalHealthHistory">Brief Mental Health History (Optional)</Label>
                      <Textarea
                        id="mentalHealthHistory"
                        value={formData.mentalHealthHistory}
                        onChange={(e) => handleInputChange("mentalHealthHistory", e.target.value)}
                        placeholder="Share what you're comfortable with - this helps us provide better support"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">What are you hoping to gain from support groups? (Optional)</Label>
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={(e) => handleInputChange("goals", e.target.value)}
                        placeholder="Your goals and expectations"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Terms & Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Registration Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Selected Groups:</strong>
                        </p>
                        <ul className="ml-4">
                          {formData.selectedGroups.map((groupId) => {
                            const group = supportGroups.find((g) => g.id.toString() === groupId)
                            return group ? <li key={groupId}>• {group.name}</li> : null
                          })}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreesToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreesToTerms", checked)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </a>{" "}
                          and understand that participation in support groups is voluntary and confidential.
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.agreesToPrivacy}
                          onCheckedChange={(checked) => handleInputChange("agreesToPrivacy", checked)}
                        />
                        <Label htmlFor="privacy" className="text-sm leading-relaxed">
                          I have read and agree to the{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>{" "}
                          and consent to the collection and use of my information as described.
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="contact"
                          checked={formData.agreesToContact}
                          onCheckedChange={(checked) => handleInputChange("agreesToContact", checked)}
                        />
                        <Label htmlFor="contact" className="text-sm leading-relaxed">
                          I consent to being contacted by MindCare staff for orientation, scheduling, and program
                          updates.
                        </Label>
                      </div>
                    </div>

                    <Alert>
                      <Phone className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Crisis Support:</strong> If you're experiencing a mental health crisis, please call our
                        24/7 crisis line at (555) 123-4567 or contact emergency services at 911.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep} disabled={!validateStep(currentStep)}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!validateStep(4) || isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Complete Registration"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Help Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Need Help with Registration?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>Call us: (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>Email: support@mindcare.org</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
