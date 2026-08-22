import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Container, Grid, Flex } from "@/components";

const LayoutPage = () => {
  const containerCode = `import { Container } from "@/components";

<Container size="sm" className="bg-indigo-100 p-4 rounded text-center">
  Small Container (max-w-screen-sm)
</Container>
<Container size="md" className="bg-indigo-200 p-4 rounded text-center mt-4">
  Medium Container (max-w-screen-md)
</Container>
<Container size="lg" className="bg-indigo-300 p-4 rounded text-center mt-4">
  Large Container (max-w-screen-lg)
</Container>`;

  const gridCode = `import { Grid } from "@/components";

// 3 columns grid with medium gap
<Grid cols={3} gap="md">
  <div className="bg-indigo-500 text-white p-4 rounded text-center">1</div>
  <div className="bg-indigo-500 text-white p-4 rounded text-center">2</div>
  <div className="bg-indigo-500 text-white p-4 rounded text-center">3</div>
</Grid>

// 4 columns grid with small gap
<Grid cols={4} gap="sm">
  <div className="bg-purple-500 text-white p-4 rounded text-center">1</div>
  <div className="bg-purple-500 text-white p-4 rounded text-center">2</div>
  <div className="bg-purple-500 text-white p-4 rounded text-center">3</div>
  <div className="bg-purple-500 text-white p-4 rounded text-center">4</div>
</Grid>`;

  const flexCode = `import { Flex } from "@/components";

// Row layout centered with gap spacing
<Flex direction="row" justify="center" align="center" gap="md">
  <div className="bg-emerald-500 text-white px-6 py-2 rounded">Flex Item 1</div>
  <div className="bg-emerald-500 text-white px-6 py-2 rounded">Flex Item 2</div>
</Flex>

// Column layout spaced out
<Flex direction="col" gap="sm" className="w-full">
  <div className="bg-teal-500 text-white p-3 rounded">Stacked 1</div>
  <div className="bg-teal-500 text-white p-3 rounded">Stacked 2</div>
</Flex>`;

  const containerProps = [
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "xl" | "full"',
      default: '"xl"',
      description: "Controls the maximum width boundary of the centered container element",
    },
    {
      prop: "centered",
      type: "boolean",
      default: "false",
      description: "Applies flexbox rules to center all inner child elements vertically and horizontally",
    },
  ];

  const gridProps = [
    {
      prop: "cols",
      type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
      default: "3",
      description: "Defines the columns split configuration spanning responsive breakpoints",
    },
    {
      prop: "gap",
      type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Specifies grid horizontal and vertical gap gutters spacing",
    },
  ];

  const flexProps = [
    {
      prop: "direction",
      type: '"row" | "row-reverse" | "col" | "col-reverse"',
      default: '"row"',
      description: "Specifies the flex flex-direction rule determining layout flow",
    },
    {
      prop: "justify",
      type: '"start" | "center" | "end" | "between" | "around" | "evenly"',
      default: '"start"',
      description: "Controls align-content justification layout along the main axis",
    },
    {
      prop: "align",
      type: '"start" | "center" | "end" | "stretch" | "baseline"',
      default: '"stretch"',
      description: "Controls alignment positioning of elements along the cross axis",
    },
    {
      prop: "wrap",
      type: '"wrap" | "nowrap" | "wrap-reverse"',
      default: '"nowrap"',
      description: "Specifies whether items wrap onto multiple layout lines if space is restricted",
    },
    {
      prop: "gap",
      type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
      default: '"sm"',
      description: "Sets the spacing gap gutters between child flex elements",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Layout Components</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Responsive structural wrappers (Container, Grid, Flex) designed to align layouts, configure responsive column grids, and structure spacing parameters consistently.
        </p>
      </header>

      {/* Container */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Container</h2>
        <p className="text-sm text-gray-500">
          The Container component wraps elements in responsive max-width blocks relative to page layout boundaries.
        </p>
        <ComponentDemo code={containerCode}>
          <div className="w-full space-y-4">
            <Container size="sm" className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 p-4 rounded text-center font-semibold text-sm border border-indigo-200 dark:border-indigo-900">
              Small Container (max-w-screen-sm)
            </Container>
            <Container size="md" className="bg-indigo-200 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 p-4 rounded text-center font-semibold text-sm border border-indigo-300 dark:border-indigo-800">
              Medium Container (max-w-screen-md)
            </Container>
            <Container size="lg" className="bg-indigo-300 dark:bg-indigo-850/40 text-indigo-900 dark:text-indigo-100 p-4 rounded text-center font-semibold text-sm border border-indigo-400 dark:border-indigo-750">
              Large Container (max-w-screen-lg)
            </Container>
          </div>
        </ComponentDemo>
      </section>

      {/* Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Grid</h2>
        <p className="text-sm text-gray-500">
          The Grid component creates column splits with responsive layouts and customizable grid gaps.
        </p>
        <ComponentDemo code={gridCode}>
          <div className="w-full space-y-8">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cols: 3, Gap: Medium</h4>
              <Grid cols={3} gap="md">
                <div className="bg-indigo-500 text-white p-4 rounded text-center font-bold shadow">1</div>
                <div className="bg-indigo-500 text-white p-4 rounded text-center font-bold shadow">2</div>
                <div className="bg-indigo-500 text-white p-4 rounded text-center font-bold shadow">3</div>
              </Grid>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cols: 4, Gap: Small</h4>
              <Grid cols={4} gap="sm">
                <div className="bg-purple-500 text-white p-4 rounded text-center font-bold shadow">1</div>
                <div className="bg-purple-500 text-white p-4 rounded text-center font-bold shadow">2</div>
                <div className="bg-purple-500 text-white p-4 rounded text-center font-bold shadow">3</div>
                <div className="bg-purple-500 text-white p-4 rounded text-center font-bold shadow">4</div>
              </Grid>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* Flex */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Flex</h2>
        <p className="text-sm text-gray-500">
          The Flex component handles horizontal or vertical layout structures using CSS Flexbox rules.
        </p>
        <ComponentDemo code={flexCode}>
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Row centered, Gap: Medium</h4>
              <Flex direction="row" justify="center" align="center" gap="md" className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg">
                <div className="bg-emerald-500 text-white px-6 py-2 rounded font-semibold text-sm shadow">Item 1</div>
                <div className="bg-emerald-500 text-white px-6 py-2 rounded font-semibold text-sm shadow">Item 2</div>
              </Flex>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Col, Gap: Extra Small</h4>
              <Flex direction="col" gap="xs" className="w-full">
                <div className="bg-teal-500 text-white p-3 rounded font-semibold text-sm shadow">Stacked Element 1</div>
                <div className="bg-teal-500 text-white p-3 rounded font-semibold text-sm shadow">Stacked Element 2</div>
              </Flex>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* API Reference */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">API Reference</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Container Props</h3>
          <PropsTable data={containerProps} />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold">Grid Props</h3>
          <PropsTable data={gridProps} />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold">Flex Props</h3>
          <PropsTable data={flexProps} />
        </div>
      </section>
    </div>
  );
};

export default LayoutPage;