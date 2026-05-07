import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function Faq() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-black text-white space-y-5">
      <div className="text-center w-full flex flex-row items-center justify-center space-y-6">
        <p className="text-white text-3xl">Frequently Asked Questions</p>
      </div>
      <div className="w-[60%] bg-neutral-900 rounded-xl p-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What services does Qode offer?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Qode delivers end-to-end technology solutions including custom software development, web and mobile app development, AI & automation, cloud infrastructure, and DevOps services.
              </p>
              <p>
                We also offer training programs and mentorship in modern programming stacks — React, Node.js, Python, AI/ML, and cloud-native development.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does the development process work?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                We follow an agile methodology with two-week sprints, daily standups, and transparent progress tracking. From discovery and design to development, testing, and deployment, you are involved at every step.
              </p>
              <p>
                Typical projects kick off within 48 hours of engagement confirmation, with a dedicated project manager assigned to ensure seamless delivery.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you provide post-launch support?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Absolutely. We offer maintenance packages, performance monitoring, security updates, and feature enhancements long after launch. Your success is our priority.
              </p>
              <p>
                Our SLAs guarantee fast response times, and our team is available across multiple time zones to ensure your systems run flawlessly around the clock.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
