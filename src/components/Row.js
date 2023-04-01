import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Row = ({ rows }) => {
  return (
    <React.Fragment>
      {rows.map(({ id, name, thumb }, index) => {
        return (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="characters-thumb"></div>
                <p>{name}</p>
              </li>
            )}
          </Draggable>
        );
      })}
    </React.Fragment>
  );
};

export default Row;
