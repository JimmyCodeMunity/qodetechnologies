import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Text } from "./textarea";
import { Button } from "./button";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Loader2, Globe, Code2, Smartphone, Bot, Palette, Cloud, Zap, Send } from "lucide-react";
import { toast } from "sonner";
import apiConfig from "../../config/api";

const serviceOptions = [
  { id: "web", label: "Web Development", icon: Code2, description: "Custom websites, web apps, SaaS platforms, and e-commerce solutions" },
  { id: "mobile", label: "Mobile Development", icon: Smartphone, description: "Native & cross-platform iOS and Android applications" },
  { id: "ai", label: "AI & Automation", icon: Bot, description: "Machine learning, NLP, chatbots, and workflow automation" },
  { id: "design", label: "UI/UX Design", icon: Palette, description: "User interface design, prototyping, and user experience research" },
  { id: "devops", label: "DevOps & Cloud", icon: Cloud, description: "Cloud infrastructure, CI/CD, deployment, and server management" },
  { id: "other", label: "Other", icon: Zap, description: "Custom solutions that don't fit into the categories above" },
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Over $100,000",
  "To be discussed",
];

const timelines = [
  "ASAP",
  "1-2 weeks",
  "2-4 weeks",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "To be discussed",
];

const priorities = [
  { value: "Low", label: "Low - Flexible timeline", color: "border-green-500/30 text-green-400 bg-green-500/10" },
  { value: "Medium", label: "Medium - Standard delivery", color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" },
  { value: "High", label: "High - Urgent", color: "border-orange-500/30 text-orange-400 bg-orange-500/10" },
  { value: "Urgent", label: "Urgent - Critical", color: "border-red-500/30 text-red-400 bg-red-500/10" },
];

const ServiceDialog = ({ title, className }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    // Step 2: Service
    serviceType: "",
    // Step 3: Project Details
    projectTitle: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    priority: "Medium",
    technicalRequirements: "",
    preferredTechnologies: "",
    additionalNotes: "",
    // Step 4: Contact Preference
    preferredContactMethod: "email",
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    if (step === 2) {
      if (!formData.serviceType) newErrors.serviceType = "Please select a service type";
    }
    if (step === 3) {
      if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required";
      if (!formData.projectDescription.trim()) {
        newErrors.projectDescription = "Project description is required";
      } else if (formData.projectDescription.length < 50) {
        newErrors.projectDescription = "Description must be at least 50 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    try {
      const response = await fetch(apiConfig.getEndpoint('/api/v1/service-requests/submit'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          serviceType: serviceOptions.find(s => s.id === formData.serviceType)?.label || formData.serviceType,
          projectTitle: formData.projectTitle,
          projectDescription: formData.projectDescription,
          budget: formData.budget,
          timeline: formData.timeline,
          priority: formData.priority,
          technicalRequirements: formData.technicalRequirements,
          preferredTechnologies: formData.preferredTechnologies,
          additionalNotes: formData.additionalNotes,
          preferredContactMethod: formData.preferredContactMethod,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("Service request submitted! We'll contact you within 24 hours.");
      } else {
        toast.error(data.message || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setErrors({});
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
      preferredContactMethod: "email",
    });
  };

  const steps = [
    { label: "Personal Info", description: "Your contact details" },
    { label: "Service", description: "Choose service type" },
    { label: "Project Details", description: "Tell us about your project" },
    { label: "Review", description: "Confirm and submit" },
  ];

  return (
    <div>
      <Dialog className="">
        <DialogTrigger>
          <Button className={className}>
            {title}
            <ArrowRight color="white" size={25} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-[calc(100%-2rem)] sm:w-full max-w-3xl mx-auto bg-neutral-950 border-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-white text-xl mb-2">
              {submitted ? "Request Submitted" : "Request a Service"}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              {submitted
                ? "Thank you for reaching out to Qode Technologies."
                : "Fill in the details below and we'll get back to you within 24 hours."}
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-lime-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-lime-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Thank You!</h3>
              <p className="text-neutral-400 mb-6 max-w-sm mx-auto">
                Your service request has been submitted. Our team will review it and contact you within 24 hours.
              </p>
              <Button onClick={resetForm} className="bg-lime-500 text-black hover:bg-lime-600">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <>
              {/* Stepper */}
              <div className="flex items-center justify-between mb-6 px-2">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step > i + 1
                          ? "bg-lime-500 text-black"
                          : step === i + 1
                            ? "bg-lime-500/20 text-lime-400 border border-lime-500/40"
                            : "bg-neutral-800 text-neutral-500"
                          }`}
                      >
                        {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
                      </div>
                      <span className={`text-xs mt-1 hidden sm:block ${step >= i + 1 ? "text-lime-400" : "text-neutral-500"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 transition-all ${step > i + 1 ? "bg-lime-500" : "bg-neutral-800"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className={`w-full ${errors.firstName ? "border-red-500" : ""}`}
                        />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          className={`w-full ${errors.lastName ? "border-red-500" : ""}`}
                        />
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`w-full ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Select a Service</h3>
                    {errors.serviceType && <p className="text-red-400 text-sm">{errors.serviceType}</p>}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => {
                        const Icon = service.icon;
                        const isSelected = formData.serviceType === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => updateField("serviceType", service.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${isSelected
                              ? "border-lime-500 bg-lime-500/10"
                              : "border-neutral-700 bg-neutral-900 hover:border-neutral-600"
                              }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-lime-500 text-black" : "bg-neutral-800 text-neutral-400"
                              }`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <h4 className={`font-medium ${isSelected ? "text-white" : "text-neutral-300"}`}>
                                {service.label}
                              </h4>
                              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{service.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Project Details */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>

                    <div>
                      <Input
                        type="text"
                        placeholder="Project Title *"
                        value={formData.projectTitle}
                        onChange={(e) => updateField("projectTitle", e.target.value)}
                        className={`w-full ${errors.projectTitle ? "border-red-500" : ""}`}
                      />
                      {errors.projectTitle && <p className="text-red-400 text-xs mt-1">{errors.projectTitle}</p>}
                    </div>

                    <div>
                      <Text
                        placeholder="Describe your project in detail (min. 50 chars) *"
                        value={formData.projectDescription}
                        onChange={(e) => updateField("projectDescription", e.target.value)}
                        className={`w-full min-h-[100px] ${errors.projectDescription ? "border-red-500" : ""}`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.projectDescription && <p className="text-red-400 text-xs">{errors.projectDescription}</p>}
                        <p className={`text-xs ml-auto ${formData.projectDescription.length < 50 ? "text-neutral-500" : "text-lime-500"}`}>
                          {formData.projectDescription.length}/50 chars
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <select
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                      >
                        <option value="">Budget Range (Optional)</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                      >
                        <option value="">Timeline (Optional)</option>
                        {timelines.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neutral-300 mb-2">Priority Level</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {priorities.map((p) => (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => updateField("priority", p.value)}
                            className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${formData.priority === p.value
                              ? `border-lime-500 ${p.color}`
                              : "border-neutral-700 text-neutral-400 hover:border-neutral-600"
                              }`}
                          >
                            {p.value}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Text
                      placeholder="Technical Requirements (Optional) - e.g., specific technologies, integrations"
                      value={formData.technicalRequirements}
                      onChange={(e) => updateField("technicalRequirements", e.target.value)}
                      className="w-full min-h-[80px]"
                    />

                    <Input
                      type="text"
                      placeholder="Preferred Technologies (Optional) - e.g., React, Node.js, Python"
                      value={formData.preferredTechnologies}
                      onChange={(e) => updateField("preferredTechnologies", e.target.value)}
                      className="w-full"
                    />

                    <Text
                      placeholder="Additional Notes (Optional)"
                      value={formData.additionalNotes}
                      onChange={(e) => updateField("additionalNotes", e.target.value)}
                      className="w-full min-h-[60px]"
                    />
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Review & Submit</h3>

                    <div className="bg-neutral-900 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                        <span className="text-neutral-400 text-sm">Name</span>
                        <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                        <span className="text-neutral-400 text-sm">Email</span>
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                      {formData.phone && (
                        <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                          <span className="text-neutral-400 text-sm">Phone</span>
                          <span className="text-white font-medium">{formData.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                        <span className="text-neutral-400 text-sm">Service Type</span>
                        <span className="text-lime-400 font-medium">
                          {serviceOptions.find(s => s.id === formData.serviceType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                        <span className="text-neutral-400 text-sm">Project Title</span>
                        <span className="text-white font-medium text-right max-w-[200px] truncate">{formData.projectTitle}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                        <span className="text-neutral-400 text-sm">Priority</span>
                        <span className="text-white font-medium">{formData.priority}</span>
                      </div>
                      {formData.budget && (
                        <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                          <span className="text-neutral-400 text-sm">Budget</span>
                          <span className="text-white font-medium">{formData.budget}</span>
                        </div>
                      )}
                      {formData.timeline && (
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400 text-sm">Timeline</span>
                          <span className="text-white font-medium">{formData.timeline}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neutral-300 mb-2">Preferred Contact Method</p>
                      <div className="flex gap-3">
                        {["email", "phone", "both"].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => updateField("preferredContactMethod", method)}
                            className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all capitalize ${formData.preferredContactMethod === method
                              ? "border-lime-500 bg-lime-500/10 text-lime-400"
                              : "border-neutral-700 text-neutral-400 hover:border-neutral-600"
                              }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4 border-t border-neutral-800">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 py-2.5 rounded-xl border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    >
                      <ChevronLeft size={16} className="mr-1" /> Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-2.5 rounded-xl bg-lime-500 text-black hover:bg-lime-600 font-semibold"
                    >
                      Next <ChevronRight size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded-xl bg-lime-500 text-black hover:bg-lime-600 font-semibold disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request <Send size={16} className="ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDialog;
