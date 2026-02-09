import { Droppable } from "@hello-pangea/dnd";
import type { Guest } from "../types/guest";
import DraggableGuest from "./DraggableGuest";
interface Props {
  id: string;
  title: string;
  guests: Guest[];
}

const TableColumn = ({ id, title, guests }: Props) => {
  return (
    <div
      className="bg-light p-3"
      style={{
        width: 280,
        minHeight: 200,
        borderRadius: 18,
      }}
    >
      <h6 className="text-center fw-bold mb-3">{title}</h6>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: 120,
              maxHeight: id === "unassigned" ? 420 : "auto",
              overflowY: id === "unassigned" ? "auto" : "visible",
              paddingRight: id === "unassigned" ? 4 : 0,
            }}
          >
            {guests.map((guest, index) => (
              <DraggableGuest key={guest.id} guest={guest} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TableColumn;
