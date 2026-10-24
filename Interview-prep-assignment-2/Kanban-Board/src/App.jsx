import { useState } from "react";

import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { Toaster } from "sonner";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Toaster />

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <KanbanBoard searchQuery={searchQuery} />

      <AddTaskModal />
      <EditTaskModal />
    </>
  );
};

export default App;
