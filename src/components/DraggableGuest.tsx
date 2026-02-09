
import { Draggable } from "@hello-pangea/dnd";
import type { Guest } from "../types/guest";
import GuestCard from "./GuestCard";

interface Props {
  guest: Guest;
  index: number;
  isAdmin: boolean;
}

const DraggableGuest = ({ guest, index, isAdmin }: Props) => {
  return (
    <Draggable
      draggableId={guest.id}
      index={index}
      isDragDisabled={!isAdmin}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            marginBottom: 10,
            cursor: isAdmin ? "grab" : "default",
            ...provided.draggableProps.style,
          }}
        >
          <div style={{ position: "relative" }}>
            {isAdmin && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 8,
                  fontSize: "0.75rem",
                  color: "#B89B5E",
                }}
              >
                ⠿
              </span>
            )}
            <GuestCard guest={guest} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableGuest;
