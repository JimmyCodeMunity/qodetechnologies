import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Text } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import apiConfig from "../../config/api";

const contactInfo = [
  {
    icon: <Mail size={20} className="text-lime-500" />,
    label: "Email",
    value: "hello@qodenow.com",
    href: "mailto:hello@qodenow.com",
  },
  {
    icon: <Phone size={20} className="text-orange-500" />,
    label: "Phone",
    value: "+254 141 447 430",
    href: "https://wa.me/254141447430",
  },
  {
    icon: <MapPin size={20} className="text-blue-500" />,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null,
  },
  {
    icon: <Clock size={20} className="text-purple-500" />,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    subscribe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(apiConfig.getEndpoint('/api/v1/contacts/submit'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "", phone: "", subscribe: false });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background blurs */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
            <MessageSquare size={14} className="text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-orange-500">
            Let Us <span className="text-lime-500">Build</span> Together
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Have an idea, a question, or just want to say hello? Drop us a message and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6 text-lime-500">Contact Information</h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-white font-medium hover:text-lime-500 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold mb-3 text-orange-500">Prefer WhatsApp?</h3>
              <p className="text-sm text-neutral-400 mb-4">
                For quick questions or urgent inquiries, chat with us directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/254141447430"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 text-sm font-semibold text-black rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-300"
              >
                <MessageSquare size={16} /> Open Chat
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-lime-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-lime-500">Message Sent!</h3>
                  <p className="text-neutral-400">Thank you for reaching out. We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Email</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Subject</label>
                    <Input
                      type="text"
                      placeholder="Project inquiry, partnership, support..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Phone (Optional)</label>
                    <Input
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Message</label>
                    <Text
                      placeholder="Tell us about your project, timeline, and budget..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-h-[140px]"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-neutral-400">
                    <input
                      type="checkbox"
                      id="subscribe"
                      checked={formData.subscribe}
                      onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                      className="accent-lime-500 rounded w-4 h-4"
                    />
                    <label htmlFor="subscribe" className="cursor-pointer hover:text-white transition-colors">
                      Subscribe to our newsletter for updates and tips
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
