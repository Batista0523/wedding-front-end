import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import TableColumn from "./TableColumn";
import type { Guest } from "../types/guest";

const API = import.meta.env.VITE_BASE_URL as string;
const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE as string;

const STORAGE_KEY = "wedding_seating_v1";

type TablesState = {
  [key: string]: Guest[];
};

const SeatingBoard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
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

  // 🔒 Ensure init runs ONCE
  const initializedRef = useRef(false);

  // LOAD seating (single source of truth)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setTables(JSON.parse(saved));
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    axios.get(`${API}/guests`).then((res) => {
      const confirmed: Guest[] = res.data.payload.filter(
        (g: Guest) =>
          g.status === "confirmed" &&
          (g.attendance === "both" || g.attendance === "celebration"),
      );

      const sorted = [...confirmed].sort((a, b) =>
        a.full_name.localeCompare(b.full_name),
      );

      setTables({
        unassigned: sorted,
        table_1: [],
        table_2: [],
        table_3: [],
        table_4: [],
        table_5: [],
        table_6: [],
        table_7: [],
      });
    });
  }, []);

  // SAVE seating on EVERY change (independent of admin)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
  }, [tables]);

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

  const activateAdmin = () => {
    const code = prompt("Código de administrador");
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      alert("Modo administrador activado");
    } else {
      alert("Código incorrecto");
    }
  };

  const deactivateAdmin = () => {
    setIsAdmin(false);
    alert("Modo administrador desactivado");
  };

  return (
    <>
      <div className="text-center mb-3">
        {!isAdmin ? (
          <button
            onClick={activateAdmin}
            className="btn btn-sm"
            style={{
              borderRadius: 20,
              padding: "0.4rem 1.2rem",
              border: "1px solid #B89B5E",
              backgroundColor: "transparent",
              color: "#B89B5E",
              fontWeight: 500,
            }}
          >
            Activar modo administrador
          </button>
        ) : (
          <button
            onClick={deactivateAdmin}
            className="btn btn-sm"
            style={{
              borderRadius: 20,
              padding: "0.4rem 1.2rem",
              border: "1px solid #999",
              backgroundColor: "#f5f5f5",
              color: "#555",
              fontWeight: 500,
            }}
          >
            Desactivar modo administrador
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="text-center mb-4">
          <span style={{ fontSize: "0.85rem", color: "#777" }}>
            🔒 Distribución de mesas final
          </span>
        </div>
      )}

      <DragDropContext onDragEnd={isAdmin ? onDragEnd : () => {}}>
        <div className="d-flex gap-4 flex-wrap justify-content-center">
          {isAdmin && (
            <TableColumn
              id="unassigned"
              title="Sin mesa"
              guests={tables.unassigned}
              isAdmin={isAdmin}
            />
          )}

          <TableColumn
            id="table_1"
            title="Mesa 1"
            guests={tables.table_1}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_2"
            title="Mesa 2"
            guests={tables.table_2}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_3"
            title="Mesa 3"
            guests={tables.table_3}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_4"
            title="Mesa 4"
            guests={tables.table_4}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_5"
            title="Mesa 5"
            guests={tables.table_5}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_6"
            title="Mesa 6"
            guests={tables.table_6}
            isAdmin={isAdmin}
          />
          <TableColumn
            id="table_7"
            title="Mesa 7"
            guests={tables.table_7}
            isAdmin={isAdmin}
          />
        </div>
      </DragDropContext>
    </>
  );
};

export default SeatingBoard;
