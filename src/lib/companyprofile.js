const QodeSolutions = () => {
    // company identity
    const company = {
        name: "Qode Solutions",
        mission: "Building Scalable Digital Solutions",
        location: "Wherever You Are"
    }
    // services
    const services = [
        "Custom & Coperate Websites",
        "Mobile Development",
        "Cyber Security services",
        "Programming & AI classes",
        "Business Solution systems(POS,Inventory,Automation tools)"
    ]
    // how qode works
    function buildSolution(client) {
        const solution = {};
        solution.discovery = `We dive deep into your ${vision}, ${users}, and ${market}.`;
        solution.strategyAndDesign = `Wireframes, prototypes, and a technical roadmap.`;
        solution.development = `weekly sprints, daily standups, and ${transparent} demos.`;
        solution.launch = `${Rigorous} QA, performance testing, and smooth deployment to production.`;
        solution.scalingAndOptimization = `Post-launch monitoring, user feedback loops, and continuous improvement`;
        solution.success = `Post-launch monitoring, user feedback loops, and continuous improvement. `;
        return solution;
    }
    // whycode
    function whyQodeSolutions() {
        return `Fast,Affordable,Mobile-first platforms built for all businesses`;
    }
    // Call to Action
    function CallAction() {
        const plan = buildSolution({ name: clientName });
        console.log(`Welcome to Qode Solutions, ${clientName}`);
    }
    return { company, services, whyQodeSolutions, CallAction }
} 