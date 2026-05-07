import React from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Twitter } from "lucide-react";
import { blogPosts } from "./BlogPage";
import Footer from "../components/sections/Footer";
import ServiceDialog from "../components/ui/ServiceDialog";

const fallbackContent = {
  "why-we-chose-nextjs": `When we started building enterprise applications for clients, the performance expectations were non-negotiable. Users expect instant page loads, seamless interactions, and SEO that dominates search rankings. After evaluating multiple frameworks, Next.js emerged as the clear winner — not just for its popularity, but for its architecture.

## App Router & Server Components

The introduction of the App Router in Next.js 13+ fundamentally changed how we build applications. Server Components allow us to render heavy logic on the server, reducing client-side JavaScript bundles significantly. For our e-commerce clients, this translated to 40% faster Time to Interactive scores.

## Edge Runtime & Caching

Vercel's edge network combined with Next.js caching strategies means content is served from locations closest to users. We configure ISR (Incremental Static Regeneration) for content that changes frequently, ensuring fresh data without sacrificing speed.

## Our Playbook

1. Start with the App Router for all greenfield projects
2. Use Server Components for data-heavy sections
3. Implement streaming for slow-loading components
4. Configure proper revalidation strategies for dynamic content
5. Monitor Core Web Vitals continuously with real user metrics

The result? Clients see measurable improvements in conversion rates, bounce rates, and search rankings. Next.js isn't just a framework choice — it's a competitive advantage.`,
  "ai-automation-2026": `The AI landscape in 2026 looks dramatically different from the chatbot frenzy of 2023. The companies winning today are not those with the biggest models — they are the ones with the smartest orchestration.

## Beyond Single LLM Calls

Modern AI systems are architectures, not prompts. We build agentic systems that combine multiple LLMs, vector databases, tool use, and memory layers. A customer support agent doesn't just answer questions — it retrieves documentation, checks order status, escalates to humans, and learns from every interaction.

## The Orchestration Layer

Our proprietary orchestration framework handles:
- **Context management**: Maintaining conversation state across long sessions
- **Tool routing**: Deciding when to call APIs, search databases, or generate responses
- **Memory**: Storing and retrieving relevant past interactions
- **Fallbacks**: Graceful degradation when models hallucinate or APIs fail

## Real Results

One logistics client reduced their support ticket resolution time from 4 hours to 8 minutes. A SaaS platform we built handles 50,000 AI-driven workflow automations daily with 99.97% reliability.

The future belongs to systems that think, not just models that talk.`,
  "mobile-first-design": `Mobile-first is not a checkbox. It is a complete rethink of how users interact with digital products. The constraints of mobile — smaller screens, touch inputs, variable connectivity — force better design decisions that ultimately improve every platform.

## The Thumb Zone

Research shows 75% of mobile interactions happen with the thumb. Navigation, primary actions, and critical content must sit within the natural thumb arc. We map heat zones for every app we build.

## Context is Everything

Mobile users are not sitting at desks. They are walking, waiting, multitasking. Attention spans are shorter, interruptions are constant. Our designs account for:
- Quick resume states after interruption
- Progressive disclosure of complex features
- Offline-first architecture for connectivity gaps
- Voice input as a primary interaction method

## Conversion Patterns

We have identified three patterns that consistently improve mobile conversion:
1. **Single-thumb checkout**: Reduce form fields, use autofill, support digital wallets
2. **Micro-interactions**: Haptic feedback, animated transitions, and instant validation
3. **Social proof moments**: Reviews, live counters, and scarcity indicators at decision points

Design for the thumb, build for the context, and watch your metrics climb.`,
  "scaling-react-native": `React Native has matured into a production-ready platform that powers some of the world's most used applications. But scaling to millions of users requires discipline in architecture, performance, and deployment.

## Monorepo Strategy

We organize mobile projects in monorepos with shared packages for:
- UI components (universal design system)
- API clients (typed, cached, offline-aware)
- State management (Zustand + MMKV for persistence)
- Analytics and error tracking

This ensures consistency and enables code sharing between iOS, Android, and web targets.

## Performance at Scale

Key optimizations we implement:
- **Hermes engine**: Reduced bundle size and faster startup
- **FlashList**: Replacement for FlatList with 10x better performance
- **Native modules**: Heavy computations offloaded to native threads
- **Image optimization**: WebP, responsive sizing, and aggressive caching
- **Memory management**: Proper cleanup, image recycling, and state pruning

## Over-the-Air Updates

Using CodePush and Expo Updates, we ship critical fixes without app store delays. Our CI/CD pipeline runs E2E tests on real devices before any update reaches production.

A single codebase. Multiple platforms. Enterprise scale. That is the React Native promise we deliver on.`,
  "cloud-cost-optimization": `Cloud bills can spiral quickly. We have seen clients spending $50,000/month on infrastructure that could cost $15,000 with the right architecture. Here is our proven cost-optimization playbook.

## Audit Everything

Start with visibility. We instrument every service with detailed cost allocation tags and set up billing alerts at 50%, 75%, and 90% thresholds. You cannot optimize what you do not measure.

## Right-Sizing

The biggest waste comes from over-provisioned resources. Our automated right-sizing analysis examines:
- CPU and memory utilization patterns
- Disk IOPS vs. provisioned capacity
- Network transfer costs by region
- Idle resources and orphaned assets

## Architectural Wins

- **Serverless for variable workloads**: Lambda + API Gateway for APIs with sporadic traffic
- **Spot instances for batch jobs**: 60-90% savings on non-critical compute
- **Edge caching**: Serve static and dynamic content from Vercel/CloudFront
- **Database optimization**: Read replicas, connection pooling, query optimization
- **Storage tiering**: Automate transitions to cheaper storage classes

## One Client's Results

A fintech client cut their AWS bill from $42,000 to $18,000 monthly while improving API response times by 35%. The secret was not spending less — it was spending smarter.

Cost optimization is a continuous process, not a one-time project.`,
  "future-of-programming": `The developer landscape is evolving faster than ever. AI coding assistants, low-code platforms, and autonomous agents are reshaping what it means to write software. At Qode, we believe the future belongs to developers who embrace these tools — not fear them.

## AI as a Pair Programmer

Every engineer on our team uses AI assistants daily. But the key is using them as amplifiers, not replacements:
- **Code generation**: Boilerplate, tests, and repetitive logic
- **Code review**: Catching bugs, security issues, and performance anti-patterns
- **Documentation**: Keeping docs in sync with code changes
- **Learning**: Exploring new libraries and patterns faster

## The Human Edge

What AI cannot replace:
- **Architectural thinking**: Designing systems that scale and evolve
- **User empathy**: Understanding real human needs and contexts
- **Creative problem solving**: Finding novel solutions to ambiguous problems
- **Cross-functional collaboration**: Working with designers, product managers, and stakeholders

## Training the Next Generation

Our Learn Programming program teaches students to code with AI from day one. The curriculum covers:
- Prompt engineering for code generation
- Debugging AI-generated code
- Architecture and system design
- Ethics and responsible AI usage

The best developers of 2030 will be those who learned to partner with AI in 2026. That is the future we are building toward.`,
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-neutral-400 mb-8">
            The article you are looking for does not exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-lime-500 hover:underline"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const content = fallbackContent[slug] || post.excerpt;
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-lime-500 transition-colors text-sm mb-4"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            >
              {post.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 text-sm text-neutral-400"
            >
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {post.readTime}
              </span>
              <div className="flex items-center gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full border border-neutral-700 text-neutral-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-bold mt-12 mb-4 text-white"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-neutral-300">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(paragraph)) {
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-neutral-300">
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              if (paragraph.startsWith("**") && paragraph.includes("**")) {
                return (
                  <p key={idx} className="text-neutral-300 mb-6 leading-relaxed">
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-white font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-neutral-300 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </motion.div>

          {/* Share / CTA */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-neutral-500 mb-2">Enjoyed this article?</p>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <ServiceDialog
                title="Discuss This With Us"
                className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-4 sm:px-6 border-t border-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rp, i) => (
              <motion.div
                key={rp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <Link
                  to={`/blog/${rp.slug}`}
                  className="group block h-full rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-lime-500 transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                      <Clock size={12} /> {rp.readTime}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
