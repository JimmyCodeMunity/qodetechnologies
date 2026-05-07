import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Zap, Shield, Clock, Users, Code2, Rocket } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What services does Qode offer?",
    answer: "Qode delivers end-to-end technology solutions including custom software development, web and mobile app development, AI & automation, cloud infrastructure, and DevOps services. We also offer training programs and mentorship in modern programming stacks — React, Node.js, Python, AI/ML, and cloud-native development.",
    icon: Code2,
  },
  {
    id: 2,
    question: "How does the development process work?",
    answer: "We follow an agile methodology with two-week sprints, daily standups, and transparent progress tracking. From discovery and design to development, testing, and deployment, you are involved at every step. Typical projects kick off within 48 hours of engagement confirmation, with a dedicated project manager assigned to ensure seamless delivery.",
    icon: Rocket,
  },
  {
    id: 3,
    question: "Do you provide post-launch support?",
    answer: "Absolutely. We offer maintenance packages, performance monitoring, security updates, and feature enhancements long after launch. Your success is our priority. Our SLAs guarantee fast response times, and our team is available across multiple time zones to ensure your systems run flawlessly around the clock.",
    icon: Shield,
  },
  {
    id: 4,
    question: "What is your typical project timeline?",
    answer: "Timelines vary based on scope and complexity. A simple MVP can be delivered in 4-6 weeks, while enterprise-grade solutions typically take 3-6 months. We provide detailed roadmaps during the discovery phase and maintain transparent communication throughout development.",
    icon: Clock,
  },
  {
    id: 5,
    question: "Can you work with our existing team?",
    answer: "Yes! We seamlessly integrate with in-house teams, acting as an extension of your workforce. Whether you need frontend specialists, backend architects, or full-stack engineers, our developers adapt to your workflows, tools, and communication preferences.",
    icon: Users,
  },
  {
    id: 6,
    question: "What technologies do you specialize in?",
    answer: "Our expertise spans React, Next.js, Vue, Node.js, Python, Go, React Native, Flutter, AWS, GCP, Azure, and various AI/ML frameworks. We choose the right stack for your specific needs rather than forcing a one-size-fits-all approach.",
    icon: Zap,
  },
];

export function Faq() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 py-2 mb-6">
            <HelpCircle size={16} className="text-lime-500" />
            <span className="text-lime-500 text-sm font-medium">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked{" "}
            <span className="text-lime-500">Questions</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about working with Qode. Can't find what you're looking for? Reach out to our team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                      ? "border-lime-500/30 bg-neutral-900/50"
                      : "border-neutral-800 bg-neutral-900/20 hover:border-neutral-700"
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-lime-500/20" : "bg-neutral-800"
                        }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${isOpen ? "text-lime-500" : "text-neutral-400"
                          }`}
                      />
                    </div>
                    <span className="flex-1 text-white font-semibold text-base sm:text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-lime-500" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                          <div className="pl-14">
                            <p className="text-neutral-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
