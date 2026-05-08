import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Code2,
  Smartphone,
  Bot,
  Palette,
  Cloud,
  Building2,
  Zap,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Building,
  FileText
} from "lucide-react";
import { Input } from "../ui/input";
import { Text } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import apiConfig from "../../config/api";

const serviceTypes = [
  { value: "Web Development", icon: Code2, description: "Custom web applications, websites, and platforms" },
  { value: "Mobile Development", icon: Smartphone, description: "iOS and Android mobile applications" },
  { value: "AI & Automation", icon: Bot, description: "AI-powered solutions and workflow automation" },
  { value: "UI/UX Design", icon: Palette, description: "User interface and experience design" },
  { value: "DevOps", icon: Cloud, description: "Cloud infrastructure and deployment solutions" },
  { value: "Other", icon: Zap, description: "Other technology solutions" }
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Over $100,000",
  "To be discussed"
];

const timelines = [
  "ASAP",
  "1-2 weeks",
  "2-4 weeks",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "To be discussed"
];

const priorities = [
  { value: "Low", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  { value: "Medium", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { value: "High", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { value: "Urgent", color: "bg-red-500/10 text-red-400 border-red-500/20" }
];

const ServiceRequestSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    projectTitle: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    priority: "Medium",
    technicalRequirements: "",
    preferredTechnologies: "",
    additionalNotes: "",
    preferredContactMethod: "email"
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ['firstName', 'lastName', 'email', 'serviceType', 'projectTitle', 'projectDescription'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.projectDescription.length < 50) {
      toast.error("Project description must be at least 50 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(apiConfig.getEndpoint('/api/v1/service-requests/submit'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Service request submitted successfully! We'll contact you within 24 hours.");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "",
          projectTitle: "",
          projectDescription: "",
          budget: "",
          timeline: "",
          priority: "Medium",
          technicalRequirements: "",
          preferredTechnologies: "",
          additionalNotes: "",
          preferredContactMethod: "email"
        });
      } else {
        toast.error(data.message || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Service request submission error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-lime-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Request Submitted Successfully!</h2>
            <p className="text-neutral-400 mb-6">
              Thank you for your interest in working with Qode Technologies. Our team has received your service request and will review it carefully.
            </p>
            <p className="text-neutral-400 mb-8">
              You can expect to hear from us within 24 hours to discuss your project requirements and next steps.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-lime-500 text-black hover:bg-lime-600"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Project
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Tell us about your project and we'll provide a detailed proposal with timeline and pricing within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8"
        >
          {/* Client Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User size={20} className="mr-2 text-lime-500" />
              Client Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="bg-neutral-900 border-neutral-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="bg-neutral-900 border-neutral-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="bg-neutral-900 border-neutral-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="bg-neutral-900 border-neutral-700 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Acme Corporation"
                  className="bg-neutral-900 border-neutral-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Service Type Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Code2 size={20} className="mr-2 text-lime-500" />
              Service Type *
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${formData.serviceType === service.value
                        ? "border-lime-500 bg-lime-500/10"
                        : "border-neutral-700 bg-neutral-900 hover:border-neutral-600"
                        }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${formData.serviceType === service.value ? "bg-lime-500 text-black" : "bg-neutral-800 text-neutral-400"
                          }`}>
                          <Icon size={20} />
                        </div>
                        <span className={`font-medium ${formData.serviceType === service.value ? "text-white" : "text-neutral-300"
                          }`}>
                          {service.value}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{service.description}</p>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText size={20} className="mr-2 text-lime-500" />
              Project Details *
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Title *
                </label>
                <Input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="E-commerce Platform Redesign"
                  className="bg-neutral-900 border-neutral-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Project Description *
                  <span className="text-xs text-neutral-500 ml-2">(Minimum 50 characters)</span>
                </label>
                <Text
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your project in detail including goals, target audience, key features, and any specific requirements..."
                  className="bg-neutral-900 border-neutral-700 text-white min-h-[120px]"
                  required
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.projectDescription.length}/2000 characters
                </p>
              </div>
            </div>
          </div>

          {/* Project Requirements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Clock size={20} className="mr-2 text-lime-500" />
              Project Requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <DollarSign size={16} className="inline mr-1" />
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900 border-neutral-700 text-white rounded-lg px-4 py-2 focus:border-lime-500 focus:outline-none"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900 border-neutral-700 text-white rounded-lg px-4 py-2 focus:border-lime-500 focus:outline-none"
                >
                  <option value="">Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Priority Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                      className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${formData.priority === priority.value
                        ? `border-lime-500 ${priority.color}`
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-600"
                        }`}
                    >
                      {priority.value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900 border-neutral-700 text-white rounded-lg px-4 py-2 focus:border-lime-500 focus:outline-none"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Bot size={20} className="mr-2 text-lime-500" />
              Technical Requirements (Optional)
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Technical Requirements
                </label>
                <Text
                  name="technicalRequirements"
                  value={formData.technicalRequirements}
                  onChange={handleInputChange}
                  placeholder="Any specific technical requirements, integrations, or constraints..."
                  className="bg-neutral-900 border-neutral-700 text-white min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Preferred Technologies
                </label>
                <Input
                  type="text"
                  name="preferredTechnologies"
                  value={formData.preferredTechnologies}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB, etc."
                  className="bg-neutral-900 border-neutral-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Additional Notes
                </label>
                <Text
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any other information you'd like to share..."
                  className="bg-neutral-900 border-neutral-700 text-white min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              <AlertCircle size={12} className="inline mr-1" />
              All fields marked with * are required
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-lime-500 text-black hover:bg-lime-600 px-8 py-3"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="inline mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} className="inline mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ServiceRequestSection;
