// import { Draggable } from "@hello-pangea/dnd";
// import type { Guest } from "../types/guest";

// interface Props {
//   guest: Guest;
//   index: number;
//   isAdmin: boolean;
//   onRemove: (guestId: string) => void;
// }

// const DraggableGuest = ({ guest, index, isAdmin, onRemove }: Props) => {
//   return (
//     <Draggable
//       draggableId={guest.id!}
//       index={index}
//       isDragDisabled={!isAdmin}
//     >
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white shadow-sm p-2 mb-2"
//           style={{
//             borderRadius: 12,
//             position: "relative",
//             ...provided.draggableProps.style,
//           }}
//         >
//           {isAdmin && (
//             <button
//               onClick={() => onRemove(guest.id!)}
//               style={{
//                 position: "absolute",
//                 top: 4,
//                 right: 6,
//                 border: "none",
//                 background: "transparent",
//                 color: "#c0392b",
//                 fontSize: "0.85rem",
//                 cursor: "pointer",
//               }}
//               title="Quitar de la mesa"
//             >
//               ✕
//             </button>
//           )}

//           <strong>{guest.full_name}</strong>

//           {guest.has_plus_one && (
//             <div style={{ fontSize: "0.8rem", color: "#666" }}>
//               + {guest.plus_one_name}
//             </div>
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default DraggableGuest;
import type { Guest } from "../types/guest";

interface Props {
  guest: Guest;
  isAdmin: boolean;
  onAssign: (guest: Guest, tableId: string) => void;
}

const TABLE_OPTIONS = [
  { value: "unassigned", label: "Sin mesa" },
  { value: "table_1", label: "Mesa 1" },
  { value: "table_2", label: "Mesa 2" },
  { value: "table_3", label: "Mesa 3" },
  { value: "table_4", label: "Mesa 4" },
  { value: "table_5", label: "Mesa 5" },
  { value: "table_6", label: "Mesa 6" },
  { value: "table_7", label: "Mesa 7" },
];

const GuestRow = ({ guest, isAdmin, onAssign }: Props) => {
  return (
    <div
      style={{
        padding: "0.6rem 0",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontWeight: 500 }}>{guest.full_name}</div>

      {guest.has_plus_one && (
        <div style={{ fontSize: "0.8rem", color: "#777" }}>
          + {guest.plus_one_name}
        </div>
      )}

      {isAdmin && (
        <select
          className="form-select form-select-sm mt-2"
          defaultValue=""
          onChange={(e) => onAssign(guest, e.target.value)}
        >
          <option value="" disabled>
            Asignar mesa…
          </option>
          {TABLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GuestRow;
