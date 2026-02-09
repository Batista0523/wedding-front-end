import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import TableColumn from "./TableColumn";
import type { Guest } from "../types/guest";

const API = import.meta.env.VITE_BASE_URL as string;

type TablesState = {
  [key: string]: Guest[];
};

const STORAGE_KEY = "wedding_seating_v1";
const SeatingBoard = () => {
    const [initialized, setInitialized] = useState(false);

  const [tables, setTables] = useState<TablesState>({
    unassigned: [],
    table_1: [],
    table_2: [],
    table_3: [],
    table_4: [],
    table_5: [],
    table_6: [],
    table_7: [],
  });

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setTables(parsed);
      setInitialized(true);
      return;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  axios.get(`${API}/guests`).then((res) => {
    const confirmed: Guest[] = res.data.payload.filter(
      (g: Guest) =>
        g.status === "confirmed" &&
        (g.attendance === "both" || g.attendance === "celebration")
    );

    const sorted = [...confirmed].sort((a, b) =>
      a.full_name.localeCompare(b.full_name)
    );

    setTables((prev) => ({
      ...prev,
      unassigned: sorted,
    }));

    setInitialized(true);
  });
}, []);

useEffect(() => {
  if (!initialized) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
}, [tables, initialized]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = [...tables[source.droppableId]];
    const [movedGuest] = sourceList.splice(source.index, 1);

    const destList = [...tables[destination.droppableId]];
    destList.splice(destination.index, 0, movedGuest);

    setTables({
      ...tables,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex gap-4 flex-wrap justify-content-center">
        <TableColumn
          id="unassigned"
          title="Sin mesa"
          guests={tables.unassigned}
        />

        <TableColumn id="table_1" title="Mesa 1" guests={tables.table_1} />
        <TableColumn id="table_2" title="Mesa 2" guests={tables.table_2} />
        <TableColumn id="table_3" title="Mesa 3" guests={tables.table_3} />
        <TableColumn id="table_4" title="Mesa 4" guests={tables.table_4} />
        <TableColumn id="table_5" title="Mesa 5" guests={tables.table_5} />
        <TableColumn id="table_6" title="Mesa 6" guests={tables.table_6} />
        <TableColumn id="table_7" title="Mesa 7" guests={tables.table_7} />
      </div>
    </DragDropContext>
  );
};

export default SeatingBoard;
