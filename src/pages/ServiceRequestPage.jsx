import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ServiceRequestSection from "../components/sections/ServiceRequestSection";

const ServiceRequestPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <ServiceRequestSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceRequestPage;
