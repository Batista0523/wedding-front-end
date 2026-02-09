// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { DragDropContext } from "@hello-pangea/dnd";
// import type { DropResult } from "@hello-pangea/dnd";
// import TableColumn from "./TableColumn";
// import type { Guest } from "../types/guest";

// const API = import.meta.env.VITE_BASE_URL as string;
// const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE as string;

// const STORAGE_KEY = "wedding_seating_v1";

// type TablesState = {
//   [key: string]: Guest[];
// };

// const emptyTables: TablesState = {
//   unassigned: [],
//   table_1: [],
//   table_2: [],
//   table_3: [],
//   table_4: [],
//   table_5: [],
//   table_6: [],
//   table_7: [],
// };

// const removeGuestFromAllTables = (
//   tables: TablesState,
//   guestId: string,
// ): TablesState => {
//   const cleaned: TablesState = {};
//   for (const key in tables) {
//     cleaned[key] = tables[key].filter((g) => g.id !== guestId);
//   }
//   return cleaned;
// };

// const SeatingBoard = () => {
//   const [tables, setTables] = useState<TablesState>(emptyTables);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const initialized = useRef(false);

//   // 🔹 Load seating (localStorage → DB fallback)
//   useEffect(() => {
//     if (initialized.current) return;
//     initialized.current = true;

//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         setTables(JSON.parse(saved));
//         return;
//       } catch {
//         localStorage.removeItem(STORAGE_KEY);
//       }
//     }

//     axios.get(`${API}/guests`).then((res) => {
//       const confirmed: Guest[] = res.data.payload.filter(
//         (g: Guest) =>
//           g.status === "confirmed" &&
//           (g.attendance === "both" || g.attendance === "celebration"),
//       );

//       const sorted = [...confirmed].sort((a, b) =>
//         a.full_name.localeCompare(b.full_name),
//       );

//       setTables({ ...emptyTables, unassigned: sorted });
//     });
//   }, []);

//   // 🔹 Persist seating
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
//   }, [tables]);

//   // 🔹 Drag logic (anti-duplicate)
//   const onDragEnd = (result: DropResult) => {
//     if (!isAdmin) return;

//     const { source, destination } = result;
//     if (!destination) return;
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     const movedGuest = tables[source.droppableId][source.index];
//     if (!movedGuest?.id) return;

//     const cleaned = removeGuestFromAllTables(tables, movedGuest.id);

//     const destList = [...cleaned[destination.droppableId]];
//     destList.splice(destination.index, 0, movedGuest);

//     setTables({
//       ...cleaned,
//       [destination.droppableId]: destList,
//     });
//   };

//   // 🔹 Remove card (admin only)
//   const removeGuest = (guestId: string) => {
//     const cleaned = removeGuestFromAllTables(tables, guestId);

//     const removed =
//       Object.values(tables)
//         .flat()
//         .find((g) => g.id === guestId) || null;

//     setTables({
//       ...cleaned,
//       unassigned: removed
//         ? [...cleaned.unassigned, removed]
//         : cleaned.unassigned,
//     });
//   };

//   const toggleAdmin = () => {
//     if (isAdmin) {
//       setIsAdmin(false);
//       return;
//     }
//     const code = prompt("Código administrador");
//     if (code === ADMIN_CODE) {
//       setIsAdmin(true);
//     } else {
//       alert("Código incorrecto");
//     }
//   };

//   return (
//     <>
//       <div className="text-center mb-3">
//         <button
//           onClick={toggleAdmin}
//           className="btn btn-sm"
//           style={{
//             borderRadius: 20,
//             padding: "0.4rem 1.2rem",
//             border: "1px solid #B89B5E",
//             backgroundColor: isAdmin ? "#f5f5f5" : "transparent",
//             color: "#B89B5E",
//             fontWeight: 500,
//           }}
//         >
//           {isAdmin ? "Desactivar modo administrador" : "Modo administrador"}
//         </button>
//       </div>

//       {!isAdmin && (
//         <p className="text-center text-muted mb-4">
//           Distribución final de mesas
//         </p>
//       )}

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="d-flex gap-4 flex-wrap justify-content-center">
//           {isAdmin && (
//             <TableColumn
//               id="unassigned"
//               title="Sin mesa"
//               guests={tables.unassigned}
//               isAdmin={isAdmin}
//               onRemoveGuest={removeGuest}
//             />
//           )}

//           {Array.from({ length: 7 }).map((_, i) => (
//             <TableColumn
//               key={i}
//               id={`table_${i + 1}`}
//               title={`Mesa ${i + 1}`}
//               guests={tables[`table_${i + 1}`]}
//               isAdmin={isAdmin}
//               onRemoveGuest={removeGuest}
//             />
//           ))}
//         </div>
//       </DragDropContext>
//     </>
//   );
// };

// export default SeatingBoard;
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TableColumn from "./TableColumn";
import type { Guest } from "../types/guest";

const API = import.meta.env.VITE_BASE_URL as string;
const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE as string;
const STORAGE_KEY = "wedding_seating_v2";

type TablesState = {
  [key: string]: Guest[];
};

const TABLE_IDS = [
  "unassigned",
  "table_1",
  "table_2",
  "table_3",
  "table_4",
  "table_5",
  "table_6",
  "table_7",
];

const emptyTables: TablesState = TABLE_IDS.reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {} as TablesState);

const SeatingBoard = () => {
  const [tables, setTables] = useState<TablesState>(emptyTables);
  const [isAdmin, setIsAdmin] = useState(false);
  const initialized = useRef(false);

  // Load seating
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

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
      const guests: Guest[] = res.data.payload.filter(
        (g: Guest) =>
          g.status === "confirmed" &&
          (g.attendance === "both" || g.attendance === "celebration")
      );

      guests.sort((a, b) => a.full_name.localeCompare(b.full_name));

      setTables({ ...emptyTables, unassigned: guests });
    });
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
  }, [tables]);

  // Assign guest to table
  const assignGuestToTable = (guest: Guest, tableId: string) => {
    const cleaned: TablesState = {};

    for (const key of TABLE_IDS) {
      cleaned[key] = tables[key].filter((g) => g.id !== guest.id);
    }

    cleaned[tableId] = [...cleaned[tableId], guest];

    setTables(cleaned);
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }
    const code = prompt("Código administrador");
    if (code === ADMIN_CODE) setIsAdmin(true);
    else alert("Código incorrecto");
  };

  return (
    <>
      <div className="text-center mb-4">
        <button
          onClick={toggleAdmin}
          className="btn btn-sm"
          style={{
            borderRadius: 20,
            padding: "0.45rem 1.4rem",
            border: "1px solid #B89B5E",
            backgroundColor: isAdmin ? "#f7f4ee" : "transparent",
            color: "#B89B5E",
            fontWeight: 500,
          }}
        >
          {isAdmin ? "Desactivar modo administrador" : "Modo administrador"}
        </button>
      </div>

      <div className="d-flex gap-4 flex-wrap justify-content-center">
        {TABLE_IDS.filter((id) => isAdmin || id !== "unassigned").map((id) => (
          <TableColumn
            key={id}
            id={id}
            title={
              id === "unassigned"
                ? "Sin mesa"
                : `Mesa ${id.split("_")[1]}`
            }
            guests={tables[id]}
            isAdmin={isAdmin}
            onAssign={assignGuestToTable}
          />
        ))}
      </div>
    </>
  );
};

export default SeatingBoard;
