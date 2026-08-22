import { useNavigate } from "react-router";
import { Container, Grid, Flex, Card, Button } from "@/components";
import { Sparkles, Zap, Shield, Code2, Heart, Award } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  const corePillars = [
    {
      title: "GSAP Motion Control",
      description:
        "Every element supports rich, spring-like interactive animations out of the box using GSAP, going beyond standard CSS transitions.",
      icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: "Tailwind CSS v4 Integration",
      description:
        "Engineered on top of the latest Tailwind v4 specifications, ensuring high-speed build compilation and full utility class support.",
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "High Performance",
      description:
        "Component packages are fully tree-shakable, leading to exceptionally small bundle sizes and rapid startup response times.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
    },
  ];

  const philosophyPoints = [
    {
      title: "Aesthetics First",
      description:
        "A component shouldn't just function—it must delight. We design with curated gradients, subtle shadows, and premium layout spaces.",
      icon: <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      title: "Zero Setup Theme",
      description:
        "Designed to toggle seamlessly between light, dark, and glassmorphic designs dynamically with zero manual Tailwind adjustments.",
      icon: <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />,
    },
    {
      title: "Developer Delight",
      description:
        "Simple React props API, consistent React Ref forwarding, and comprehensive documentation to get you up and running in minutes.",
      icon: <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />,
    },
  ];

  return (
    <Container className="py-12 space-y-16 max-w-5xl" size="xl">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent py-2">
          About EaseUi
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
          A motion-centric, premium UI component library crafted for developers who demand visual excellence and dynamic animations.
        </p>
      </div>

      {/* Core Pillars (Grid) */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-center mb-8">
          Why EaseUi?
        </h2>
        <Grid cols={3} gap="md" className="w-full">
          {corePillars.map((pillar, index) => (
            <Card
              key={index}
              variant="outline"
              className="p-6 h-full flex flex-col justify-between border-gray-200 dark:border-slate-800 bg-transparent hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 rounded-2xl"
              title={pillar.title}
              description={pillar.description}
            >
              <div className="mb-4">{pillar.icon}</div>
            </Card>
          ))}
        </Grid>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-12">
        <Grid cols={2} gap="lg" className="items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-tight">Our Philosophy</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              EaseUi was born out of a simple frustration: most React component libraries are either visually flat or require massive overhead to animate. 
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              We believe UI should feel alive. Micro-animations and spring-based layouts improve the perception of speed and delight users. EaseUi combines the styling efficiency of Tailwind with the robust, programmatic animation capabilities of GSAP.
            </p>
            <Button
              variant="primary"
              size="lg"
              hoverAnimation="bounce"
              onClick={() => navigate("/components")}
              className="mt-4 rounded-xl"
            >
              Explore Components
            </Button>
          </div>

          <div className="space-y-6">
            {philosophyPoints.map((point, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 shadow-xs border border-gray-100 dark:border-slate-800"
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl h-fit">
                  {point.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{point.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Grid>
      </section>

      {/* Tech Stack */}
      <section className="text-center space-y-6">
        <h3 className="text-2xl font-bold">Built With Premium Tech</h3>
        <Flex gap="md" justify="center" wrap="wrap" className="max-w-3xl mx-auto">
          {[
            "React 19",
            "Vite",
            "Redux Toolkit",
            "GSAP (GreenSock)",
            "Tailwind CSS v4",
            "TypeScript",
            "Lucide Icons",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-gray-100 dark:bg-slate-850 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors duration-200 text-sm font-semibold text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-slate-800"
            >
              {tech}
            </span>
          ))}
        </Flex>
      </section>

      {/* Creator Credits */}
      <footer className="text-center text-sm text-gray-400 pt-8 border-t border-gray-100 dark:border-slate-800">
        <p>EaseUi UI Library • Designed & Developed by Devendra Dhote</p>
      </footer>
    </Container>
  );
};

export default AboutPage;
