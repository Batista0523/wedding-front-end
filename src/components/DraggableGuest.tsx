import { Draggable } from "@hello-pangea/dnd";
import type { Guest } from "../types/guest";

interface Props {
  guest: Guest;
  index: number;
  isAdmin: boolean;
  onRemove: (guestId: string) => void;
}

const DraggableGuest = ({ guest, index, isAdmin, onRemove }: Props) => {
  return (
    <Draggable
      draggableId={guest.id!}
      index={index}
      isDragDisabled={!isAdmin}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white shadow-sm p-2 mb-2"
          style={{
            borderRadius: 12,
            position: "relative",
            ...provided.draggableProps.style,
          }}
        >
          {isAdmin && (
            <button
              onClick={() => onRemove(guest.id!)}
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                border: "none",
                background: "transparent",
                color: "#c0392b",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
              title="Quitar de la mesa"
            >
              ✕
            </button>
          )}

          <strong>{guest.full_name}</strong>

          {guest.has_plus_one && (
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              + {guest.plus_one_name}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableGuest;
