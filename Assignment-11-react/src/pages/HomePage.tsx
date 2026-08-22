import { useNavigate } from "react-router";
import { Container, Grid, Flex, Card, Button } from "@/components";
import { ArrowRight, Sparkles, Layers, Code2 } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const featuredComponents = [
    {
      name: "Button",
      desc: "Spring-like physics-based button actions and hover jiggles.",
      path: "/components/button",
      badge: "Motion",
    },
    {
      name: "Card",
      desc: "3D tilt effects and floating image layers on mouse move.",
      path: "/components/card",
      badge: "3D Wobble",
    },
    {
      name: "Carousel",
      desc: "GSAP transition timelines supporting autoplay and infinite loops.",
      path: "/components/carousel",
      badge: "Fluid",
    },
    {
      name: "Modal",
      desc: "Scale-fade entrance modals with clean blurred backdrops.",
      path: "/components/modal",
      badge: "Portal",
    },
    {
      name: "Tooltip",
      desc: "Directional tooltip bubbles featuring swift scale animations.",
      path: "/components/tooltip",
      badge: "GSAP",
    },
    {
      name: "Layout Helpers",
      desc: "Flexible, responsive flex and grid wrapper containers.",
      path: "/components/layout",
      badge: "Flexbox",
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none z-[-1]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none z-[-1]" />

      <Container size="xl" className="pt-20 space-y-24">
        {/* HERO SECTION */}
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing EaseUi v1.0.6</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-none">
            Build Beautiful interfaces{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              with Motion.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            A premium React UI component library powered by GSAP and Tailwind CSS. Create rich, interactive, and glassmorphic dashboards that wow your users instantly.
          </p>

          <Flex gap="md" justify="center" className="w-full">
            <Button
              variant="primary"
              size="lg"
              hoverAnimation="bounce"
              onClick={() => navigate("/components/button")}
              className="group rounded-xl shadow-lg shadow-indigo-500/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              hoverAnimation="scale"
              onClick={() => navigate("/about")}
              className="rounded-xl border-gray-300 dark:border-slate-800"
            >
              Read Philosophy
            </Button>
          </Flex>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <section className="space-y-6">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight">Core Features</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Everything you need to craft high-fidelity designs in fraction of the time.
            </p>
          </div>

          <Grid cols={3} gap="lg">
            <Card
              variant="outline"
              className="p-6 border-gray-200 dark:border-slate-850 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
              title="Motion Centric"
              description="Programmatic UI physics. Animations use GSAP under the hood for true performance and elastic transitions."
            >
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit mb-4">
                <Sparkles size={24} />
              </div>
            </Card>

            <Card
              variant="outline"
              className="p-6 border-gray-200 dark:border-slate-855 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
              title="Modern Styling"
              description="Glassmorphic variables, sleek dark modes, and tailored layouts built directly on top of Tailwind CSS v4."
            >
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl w-fit mb-4">
                <Layers size={24} />
              </div>
            </Card>

            <Card
              variant="outline"
              className="p-6 border-gray-200 dark:border-slate-860 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl hover:border-pink-500 dark:hover:border-pink-500 transition-colors"
              title="Developer Ergonomics"
              description="Written in clean TypeScript. Exposes intuitive, self-explanatory props and full ref forwarding for all elements."
            >
              <div className="p-3 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-xl w-fit mb-4">
                <Code2 size={24} />
              </div>
            </Card>
          </Grid>
        </section>

        {/* EXPLORE COMPONENTS GRID */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Interactive Components</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Click any of our motion components below to view its usage documentation.
              </p>
            </div>
            <Button
              variant="link"
              hoverAnimation="jiggle"
              onClick={() => navigate("/components/button")}
              className="w-fit"
            >
              View Component Catalog &rarr;
            </Button>
          </div>

          <Grid cols={3} gap="md">
            {featuredComponents.map((comp) => (
              <div
                key={comp.name}
                onClick={() => navigate(comp.path)}
                className="group relative cursor-pointer border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 p-6 rounded-2xl hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {comp.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-500 rounded-full">
                    {comp.badge}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
