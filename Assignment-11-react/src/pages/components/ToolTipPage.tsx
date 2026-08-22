import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Tooltip, Button } from "@/components";

const ToolTipPage = () => {
  const basicUsageCode = `import { Tooltip, Button } from "@/components";

<Tooltip content="Tooltip message info!" position="top">
  <Button variant="primary">Hover Me</Button>
</Tooltip>`;

  const positionsCode = `<Tooltip content="Top message" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip content="Bottom message" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>
<Tooltip content="Left message" position="left">
  <Button variant="outline">Left</Button>
</Tooltip>
<Tooltip content="Right message" position="right">
  <Button variant="outline">Right</Button>
</Tooltip>`;

  const variantsCode = `<Tooltip content="Dark mode default theme" variant="dark">
  <Button variant="dark">Dark Variant</Button>
</Tooltip>
<Tooltip content="Light mode light background" variant="light">
  <Button variant="outline">Light Variant</Button>
</Tooltip>
<Tooltip content="Glassmorphic overlay effect" variant="glass">
  <Button variant="secondary">Glass Variant</Button>
</Tooltip>
<Tooltip content="Brand primary indigo styling" variant="primary">
  <Button variant="primary">Primary Variant</Button>
</Tooltip>`;

  const delaysCode = `<Tooltip content="Reveals immediately" delay={0}>
  <Button variant="outline">No Delay</Button>
</Tooltip>
<Tooltip content="Reveals after 1 second" delay={1000}>
  <Button variant="outline">1s Delay</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "-",
      description: "Required. The text or custom elements content rendered inside the tooltip bubble container",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Controls where the tooltip aligns itself relative to the trigger element child",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "glass" | "primary"',
      default: '"dark"',
      description: "Specifies the visual style and coloring scheme of the tooltip popup",
    },
    {
      prop: "delay",
      type: "number",
      default: "200",
      description: "Slight delay in milliseconds before the tooltip reveals itself on hover/focus",
    },
    {
      prop: "children",
      type: "React.ReactElement",
      default: "-",
      description: "Required. Exactly one direct React element trigger child which wires mouse actions",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Tooltip</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          A customizable popover tooltip powered by GSAP scale-elastic transitions. Fires dynamically on hover and focus events, supports multiple alignment positions, custom delay timing, and four visual themes.
        </p>
      </header>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Usage</h2>
        <p className="text-sm text-gray-500">
          Standard tooltip centered on top with brief hover reveal.
        </p>
        <ComponentDemo code={basicUsageCode}>
          <Tooltip content="This is a simple top-aligned tooltip!" position="top">
            <Button variant="primary">Hover Me</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      {/* Positions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Positions</h2>
        <p className="text-sm text-gray-500">
          Orient tooltips relative to your trigger using the `position` prop.
        </p>
        <ComponentDemo code={positionsCode}>
          <div className="flex gap-4 flex-wrap">
            <Tooltip content="Tooltip aligns on top!" position="top">
              <Button variant="outline" size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip aligns on bottom!" position="bottom">
              <Button variant="outline" size="sm">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip aligns on left!" position="left">
              <Button variant="outline" size="sm">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip aligns on right!" position="right">
              <Button variant="outline" size="sm">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Themes & Variants</h2>
        <p className="text-sm text-gray-500">
          Modify the visual appearance using dark, light, glassmorphic, and primary options.
        </p>
        <ComponentDemo code={variantsCode}>
          <div className="flex gap-4 flex-wrap">
            <Tooltip content="Dark theme default background" variant="dark">
              <Button variant="dark" size="sm">Dark Variant</Button>
            </Tooltip>
            <Tooltip content="Light theme crisp borders" variant="light">
              <Button variant="outline" size="sm">Light Variant</Button>
            </Tooltip>
            <Tooltip content="Glassmorphism blur background" variant="glass">
              <div className="p-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-md">
                <Tooltip content="Glassmorphic overlay blur effect" variant="glass">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Glass Variant</Button>
                </Tooltip>
              </div>
            </Tooltip>
            <Tooltip content="Brand primary brand colors text" variant="primary">
              <Button variant="primary" size="sm">Primary Variant</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Delay Timing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Delay Timing</h2>
        <p className="text-sm text-gray-500">
          Prevent tooltips from triggering immediately on fast pointer movements using custom hover delay props.
        </p>
        <ComponentDemo code={delaysCode}>
          <div className="flex gap-4">
            <Tooltip content="Fires instantly with no delay" delay={0}>
              <Button variant="outline" size="sm">Instant (0ms)</Button>
            </Tooltip>
            <Tooltip content="Fires after exactly 1 second delay" delay={1000}>
              <Button variant="outline" size="sm">Slow (1000ms)</Button>
            </Tooltip>
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

export default ToolTipPage;