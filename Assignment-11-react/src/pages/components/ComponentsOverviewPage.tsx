import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Card, Input, Flex } from "@/components";
import { Sparkles, Layers, Minimize2, TextCursorInput, Compass, HelpCircle, AlignLeft } from "lucide-react";

interface ComponentItem {
  name: string;
  description: string;
  category: "Interactive" | "Overlay" | "Form" | "Navigation" | "Structure";
  path: string;
  icon: React.ReactNode;
}

const ComponentsOverviewPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const items: ComponentItem[] = [
    {
      name: "Button",
      description: "Interactive click actions featuring spring-like entrance and hover animations.",
      category: "Interactive",
      path: "/components/button",
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
    },
    {
      name: "Card",
      description: "A content container wrapper displaying programmatic GSAP 3D wobble hover tilt effects.",
      category: "Interactive",
      path: "/components/card",
      icon: <Layers className="w-6 h-6 text-purple-500" />,
    },
    {
      name: "Carousel",
      description: "GSAP transition timelines supporting autoplay loops, dots, and custom React children slides.",
      category: "Interactive",
      path: "/components/carousel",
      icon: <Compass className="w-6 h-6 text-pink-500" />,
    },
    {
      name: "Modal",
      description: "Fluid overlay portals displaying entrance scales and customizable action buttons.",
      category: "Overlay",
      path: "/components/modal",
      icon: <Minimize2 className="w-6 h-6 text-red-500" />,
    },
    {
      name: "Input",
      description: "Form elements displaying password toggles, floating labels, search bars, and animations.",
      category: "Form",
      path: "/components/input",
      icon: <TextCursorInput className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Navbar",
      description: "Responsive top site header headers with support for glassmorphism, sizes, and navigation link layouts.",
      category: "Navigation",
      path: "/components/navbar",
      icon: <Compass className="w-6 h-6 text-green-500" />,
    },
    {
      name: "Tooltip",
      description: "Helper tip balloons featuring directional arrows and elastic scale hover animations.",
      category: "Overlay",
      path: "/components/tooltip",
      icon: <HelpCircle className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Layout Helpers",
      description: "Flex alignments, responsive grids, and size containers forming layout structures.",
      category: "Structure",
      path: "/components/layout",
      icon: <AlignLeft className="w-6 h-6 text-teal-500" />,
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Components</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Browse and inspect EaseUi library layout structures, overlays, inputs, and interactive widgets.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md">
        <Input
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800"
        />
      </div>

      {/* Grid Display */}
      {filteredItems.length > 0 ? (
        <Grid cols={3} gap="lg">
          {filteredItems.map((item) => (
            <Card
              key={item.name}
              variant="outline"
              onClick={() => navigate(item.path)}
              className="p-6 h-full flex flex-col justify-between border-gray-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-all duration-300 rounded-2xl cursor-pointer"
              title={item.name}
              description={item.description}
              hoverAnimation="scale"
            >
              <Flex justify="between" align="center" className="mb-4">
                <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {item.category}
                </span>
              </Flex>
            </Card>
          ))}
        </Grid>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">
          No components match your search. Try searching for "Interactive", "Overlay", or names like "Button".
        </div>
      )}
    </div>
  );
};

export default ComponentsOverviewPage;
