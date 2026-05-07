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
import { Textarea } from "./textarea";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

const ServiceDialog = ({ title, className }) => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    softwareDev: { projectType: "", teamSize: "", timeline: "" },
    learnProgramming: {
      frontEnd: [],
      backend: [],
      mobile: [],
      methodology: "",
      constraints: "",
      experience: "",
    },
    mobileDev: { platform: "", appType: "", backend: "" },
  });

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setFormData({ ...formData, service: e.target.value });
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [section]: { ...formData[section], [name]: value },
    });
  };

  const handleCheckboxChange = (e, section, category) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCategory = checked
        ? [...prev[section][category], value]
        : prev[section][category].filter((item) => item !== value);
      return {
        ...prev,
        [section]: { ...prev[section], [category]: updatedCategory },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Replace with API call or other logic
  };
  return (
    <div>
      <Dialog className="">
        <DialogTrigger>
          <Button className={className}>
            {title}
            <ArrowRight color="white" size={25} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto mx-4 sm:mx-auto w-[calc(100%-2rem)] sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-white">Fill in your details.</DialogTitle>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col space-y-4">
                  {/* Common Fields */}
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full"
                  />

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Select a Service:</p>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center text-neutral-300 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value="softwareDev"
                          checked={selectedService === "softwareDev"}
                          onChange={handleServiceChange}
                          className="mr-2 accent-lime-500"
                        />
                        Software Development
                      </label>
                      <label className="flex items-center text-neutral-300 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value="learnProgramming"
                          checked={selectedService === "learnProgramming"}
                          onChange={handleServiceChange}
                          className="mr-2 accent-lime-500"
                        />
                        Learn Programming
                      </label>
                      <label className="flex items-center text-neutral-300 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value="mobileDev"
                          checked={selectedService === "mobileDev"}
                          onChange={handleServiceChange}
                          className="mr-2 accent-lime-500"
                        />
                        Mobile Development
                      </label>
                    </div>
                  </div>

                  {/* Dynamic Questions */}
                  {selectedService === "softwareDev" && (
                    <div className="space-y-4">
                      <Input
                        type="text"
                        name="projectType"
                        placeholder="What type of project? (e.g., web, desktop)"
                        value={formData.softwareDev.projectType}
                        onChange={(e) => handleInputChange(e, "softwareDev")}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        name="teamSize"
                        placeholder="Estimated team size?"
                        value={formData.softwareDev.teamSize}
                        onChange={(e) => handleInputChange(e, "softwareDev")}
                        className="w-full"
                      />
                      <Input
                        type="text"
                        name="timeline"
                        placeholder="Project timeline? (e.g., 3 months)"
                        value={formData.softwareDev.timeline}
                        onChange={(e) => handleInputChange(e, "softwareDev")}
                        className="w-full"
                      />
                    </div>
                  )}

                  {selectedService === "learnProgramming" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Front End Languages:
                        </p>
                        <div className="flex flex-col space-y-2">
                          {["HTML", "CSS", "JavaScript", "React", "Vue"].map(
                            (lang) => (
                              <label key={lang} className="flex items-center text-neutral-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="frontEnd"
                                  value={lang}
                                  checked={formData.learnProgramming.frontEnd.includes(
                                    lang
                                  )}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      "learnProgramming",
                                      "frontEnd"
                                    )
                                  }
                                  className="mr-2 accent-lime-500"
                                />
                                {lang}
                              </label>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Backend Languages:
                        </p>
                        <div className="flex flex-col space-y-2">
                          {["Python", "Node.js", "Java", "Ruby", "PHP"].map(
                            (lang) => (
                              <label key={lang} className="flex items-center text-neutral-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="backend"
                                  value={lang}
                                  checked={formData.learnProgramming.backend.includes(
                                    lang
                                  )}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      "learnProgramming",
                                      "backend"
                                    )
                                  }
                                  className="mr-2 accent-lime-500"
                                />
                                {lang}
                              </label>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Mobile Languages:</p>
                        <div className="flex flex-col space-y-2">
                          {["Swift", "Kotlin", "Flutter", "React Native"].map(
                            (lang) => (
                              <label key={lang} className="flex items-center text-neutral-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="mobile"
                                  value={lang}
                                  checked={formData.learnProgramming.mobile.includes(
                                    lang
                                  )}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      "learnProgramming",
                                      "mobile"
                                    )
                                  }
                                  className="mr-2 accent-lime-500"
                                />
                                {lang}
                              </label>
                            )
                          )}
                        </div>
                      </div>
                      <Input
                        type="text"
                        name="methodology"
                        placeholder="Preferred learning methodology? (e.g., online courses, mentorship)"
                        value={formData.learnProgramming.methodology}
                        onChange={(e) =>
                          handleInputChange(e, "learnProgramming")
                        }
                        className="w-full"
                      />
                      <Textarea
                        name="constraints"
                        placeholder="Learning constraints? (e.g., time availability, budget)"
                        value={formData.learnProgramming.constraints}
                        onChange={(e) =>
                          handleInputChange(e, "learnProgramming")
                        }
                        className="w-full"
                      />
                      <Input
                        type="text"
                        name="experience"
                        placeholder="Current programming experience level?"
                        value={formData.learnProgramming.experience}
                        onChange={(e) =>
                          handleInputChange(e, "learnProgramming")
                        }
                        className="w-full"
                      />
                    </div>
                  )}

                  {selectedService === "mobileDev" && (
                    <div className="space-y-4">
                      <select
                        name="platform"
                        value={formData.mobileDev.platform}
                        onChange={(e) => handleInputChange(e, "mobileDev")}
                        className="w-full border border-neutral-700 rounded-md p-2 bg-neutral-900 text-white"
                      >
                        <option value="" disabled>
                          Select target platform
                        </option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Both">Both</option>
                      </select>
                      <select
                        name="appType"
                        value={formData.mobileDev.appType}
                        onChange={(e) => handleInputChange(e, "mobileDev")}
                        className="w-full border border-neutral-700 rounded-md p-2 bg-neutral-900 text-white"
                      >
                        <option value="" disabled>
                          Select app type
                        </option>
                        <option value="Game">Game</option>
                        <option value="Utility">Utility</option>
                        <option value="Social">Social</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Other">Other</option>
                      </select>
                      <Textarea
                        name="backend"
                        placeholder="Backend requirements? (e.g., API, database)"
                        value={formData.mobileDev.backend}
                        onChange={(e) => handleInputChange(e, "mobileDev")}
                        className="w-full"
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-orange-500">
                    Submit
                    <ArrowRight color="white" size={25} />
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDialog;
