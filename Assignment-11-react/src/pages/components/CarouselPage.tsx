import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Carousel } from "@/components";

const CarouselPage = () => {
  const images = [
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      title: "Yosemite Valley, USA",
      description: "Experience the majestic granite cliffs and towering waterfalls of California's national park.",
    },
    {
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
      title: "Abstract Architecture",
      description: "Modern minimalist forms meet fluid lines in clean contemporary structures.",
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      title: "Mountain Mist",
      description: "Watch clouds roll slowly over dense pine forests atop rugged alpine ranges.",
    },
  ];

  const basicUsageCode = `import { Carousel } from "@/components";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Yosemite Valley, USA",
    description: "Experience the majestic granite cliffs."
  },
  {
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    title: "Abstract Architecture",
    description: "Modern minimalist forms meet fluid lines."
  }
];

<Carousel items={slides} variant="light" size="md" />`;

  const fadeEffectCode = `<Carousel 
  items={slides} 
  variant="dark" 
  size="md" 
  transitionEffect="fade" 
/>`;

  const glassAutoplayCode = `<Carousel 
  items={slides} 
  variant="glass" 
  size="md" 
  autoPlay 
  interval={2500} 
/>`;

  const customChildrenCode = `<Carousel variant="light" size="md" showArrows showDots>
  <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center text-white p-8">
    <h3 className="text-3xl font-extrabold mb-2">Slide 1: Custom UI</h3>
    <p className="max-w-md text-center text-indigo-100">Render standard React children instead of an image array.</p>
  </div>
  <div className="w-full h-full bg-linear-to-br from-emerald-400 to-teal-600 flex flex-col justify-center items-center text-white p-8">
    <h3 className="text-3xl font-extrabold mb-2">Slide 2: Tailwind Cards</h3>
    <p className="max-w-md text-center text-emerald-100">Flexibility to showcase dashboards, testimonials, or layouts.</p>
  </div>
</Carousel>`;

  const propsData = [
    {
      prop: "items",
      type: "CarouselItem[]",
      default: "[]",
      description: "An array of slide data objects: { image: string, title?: string, description?: string, link?: string }",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "glass"',
      default: '"light"',
      description: "Visual styling variant of the container border and arrows/dots overlay",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "full"',
      default: '"md"',
      description: "Sizing constraints on width and heights of the carousel box viewport",
    },
    {
      prop: "transitionEffect",
      type: '"slide" | "fade"',
      default: '"slide"',
      description: "GSAP animation transition type used when shifting slides",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Enables automatic transition of slides",
    },
    {
      prop: "interval",
      type: "number",
      default: "3000",
      description: "Time duration in milliseconds between active slide changes when autoPlay is active",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Displays Left/Right chevron arrow buttons on hover",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Displays clickable pagination dots indicator at the bottom",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Carousel</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          A premium, motion-rich slider component powered by GSAP. Supports keyboard events, autoplay, navigation configurations, image slides, and custom HTML/React children elements.
        </p>
      </header>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Usage</h2>
        <p className="text-sm text-gray-500">
          Default Carousel with sliding animation and light themes.
        </p>
        <ComponentDemo code={basicUsageCode}>
          <Carousel items={images} variant="light" size="md" />
        </ComponentDemo>
      </section>

      {/* Fade Effect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Fade Transition</h2>
        <p className="text-sm text-gray-500">
          Applies a fading animation using GSAP opacity controls. Best suited for high-impact visual banners.
        </p>
        <ComponentDemo code={fadeEffectCode}>
          <Carousel items={images} variant="dark" size="md" transitionEffect="fade" />
        </ComponentDemo>
      </section>

      {/* Glassmorphic Autoplay */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Autoplay & Glassmorphism</h2>
        <p className="text-sm text-gray-500">
          Glassmorphic controls overlay with custom timing autoplay (2.5 seconds loop).
        </p>
        <ComponentDemo code={glassAutoplayCode}>
          <div className="w-full max-w-3xl rounded-xl p-4 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Carousel items={images} variant="glass" size="md" autoPlay interval={2500} />
          </div>
        </ComponentDemo>
      </section>

      {/* Custom Children */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Slide Content</h2>
        <p className="text-sm text-gray-500">
          Instead of simple images, you can pass custom children elements (e.g. customized marketing divs, pricing cards, or testimonials) to display them in the slider.
        </p>
        <ComponentDemo code={customChildrenCode}>
          <Carousel variant="light" size="md" showArrows showDots>
            <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center text-white p-8 text-center">
              <h3 className="text-3xl font-extrabold mb-2">Slide 1: Custom UI</h3>
              <p className="max-w-md text-indigo-100 text-sm">
                Pass standard React children elements to create customized marketing slide templates.
              </p>
            </div>
            <div className="w-full h-full bg-linear-to-br from-emerald-500 to-teal-600 flex flex-col justify-center items-center text-white p-8 text-center">
              <h3 className="text-3xl font-extrabold mb-2">Slide 2: Interactive Grid</h3>
              <p className="max-w-md text-emerald-100 text-sm">
                Flexibility to render responsive layouts, card elements, or review widgets directly inside the viewport.
              </p>
            </div>
          </Carousel>
        </ComponentDemo>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;