import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import Navbar  from "@/components/navbar/Navbar";

const NavbarPage = () => {
  const defaultCode = `<Navbar variant="light" size="default" />`;

  const darkCode = `<Navbar variant="dark" size="default" />`;

  const primaryCode = `<Navbar variant="primary" size="default" />`;

  const glassCode = `<Navbar variant="glass" size="default" />`;

  const sizesCode = `<Navbar variant="light" size="sm" />
<Navbar variant="light" size="lg" />
<Navbar variant="light" size="xl" />`;

  const propsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "primary" | "glass"',
      default: '"light"',
      description: "Applies visual colors and shadow/backdrop styling to the header wrapper",
    },
    {
      prop: "size",
      type: '"default" | "sm" | "lg" | "xl"',
      default: '"default"',
      description: "Controls the absolute vertical height sizing of the Navbar bar",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation triggered once the component mounts in the DOM",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "Hover motion animations applied dynamically via GSAP triggers",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Allows rendering custom tag containers using Radix UI Slot element",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Navbar</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          A responsive top page navigation header menu component supporting sizing classes, glassmorphic styling, custom link placements, and GSAP-triggered motion hooks.
        </p>
      </header>

      {/* Default Light */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Light</h2>
        <p className="text-sm text-gray-500">
          Clean shadow and white background borders suited for standard interfaces.
        </p>
        <ComponentDemo code={defaultCode}>
          <div className="w-full p-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl">
            <Navbar variant="light" />
          </div>
        </ComponentDemo>
      </section>

      {/* Dark Theme */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Dark Variant</h2>
        <p className="text-sm text-gray-500">
          Slate-900 background colors with contrast layouts.
        </p>
        <ComponentDemo code={darkCode}>
          <div className="w-full p-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl">
            <Navbar variant="dark" />
          </div>
        </ComponentDemo>
      </section>

      {/* Primary Brand */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Brand Primary</h2>
        <p className="text-sm text-gray-500">
          Indigo theme matching EaseUi's core visual branding colors.
        </p>
        <ComponentDemo code={primaryCode}>
          <div className="w-full p-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl">
            <Navbar variant="primary" />
          </div>
        </ComponentDemo>
      </section>

      {/* Glassmorphic */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Glassmorphic Blur</h2>
        <p className="text-sm text-gray-500">
          Backdrop-blur border styling. Ideal for overlay headers over content layers.
        </p>
        <ComponentDemo code={glassCode}>
          <div className="w-full p-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl">
            <Navbar variant="glass" />
          </div>
        </ComponentDemo>
      </section>

      {/* Sizing options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizing Options</h2>
        <p className="text-sm text-gray-500">
          Height configurations (`sm`, `lg`, `xl`) to align layout spacing.
        </p>
        <ComponentDemo code={sizesCode}>
          <div className="w-full space-y-4 p-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl">
            <div>
              <span className="text-xs text-gray-400 font-bold">Small (size="sm")</span>
              <Navbar variant="light" size="sm" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold">Large (size="lg")</span>
              <Navbar variant="light" size="lg" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold">Extra Large (size="xl")</span>
              <Navbar variant="light" size="xl" />
            </div>
          </div>
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

export default NavbarPage;
