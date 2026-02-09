// import { Droppable } from "@hello-pangea/dnd";
// import DraggableGuest from "./GuestRow";
// import type { Guest } from "../types/guest";

// interface Props {
//   id: string;
//   title: string;
//   guests: Guest[];
//   isAdmin: boolean;
//   onRemoveGuest: (guestId: string) => void;
// }

// const TableColumn = ({
//   id,
//   title,
//   guests,
//   isAdmin,
//   onRemoveGuest,
// }: Props) => {
//   return (
//     <div style={{ width: 260 }}>
//       <h6 className="text-center mb-2">{title}</h6>

//       <Droppable droppableId={id} isDropDisabled={!isAdmin}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             style={{
//               minHeight: 120,
//               padding: 12,
//               borderRadius: 16,
//               backgroundColor: "#fafafa",
//               border: "1px solid rgba(0,0,0,0.05)",
//             }}
//           >
//             {guests.map((g, index) => (
//               <DraggableGuest
//                 key={g.id}
//                 guest={g}
//                 index={index}
//                 isAdmin={isAdmin}
//                 onRemove={onRemoveGuest}
//               />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default TableColumn;
import GuestRow from "./GuestRow";
import type { Guest } from "../types/guest";

interface Props {
  id: string;
  title: string;
  guests: Guest[];
  isAdmin: boolean;
  onAssign: (guest: Guest, tableId: string) => void;
}

const TableColumn = ({ id, title, guests, isAdmin, onAssign }: Props) => {
  return (
    <div
      style={{
        width: 280,
        background: "#fff",
        borderRadius: 18,
        padding: "1rem",
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
      }}
    >
      <h6 className="text-center mb-3">{title}</h6>

      {guests.length === 0 && (
        <p className="text-muted text-center" style={{ fontSize: "0.85rem" }}>
          — vacío —
        </p>
      )}

      {guests.map((g) => (
        <GuestRow
          key={g.id}
          guest={g}
          isAdmin={isAdmin}
          onAssign={onAssign}
        />
      ))}
    </div>
  );
};

export default TableColumn;
