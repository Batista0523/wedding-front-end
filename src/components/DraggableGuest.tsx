import { Draggable } from "@hello-pangea/dnd";
import type { Guest } from "../types/guest";
import GuestCard from "./GuestCard";

interface Props {
  guest: Guest;
  index: number;
}

const DraggableGuest = ({ guest, index }: Props) => {
  return (
    <Draggable draggableId={guest.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            marginBottom: 10,
            ...provided.draggableProps.style,
          }}
        >
          <GuestCard guest={guest} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableGuest;
