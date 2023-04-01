import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Row from "./components/Row";

const myArray = [
  {
    id: "1",
    name: "Row - 1",
  },
  {
    id: "2",
    name: "Row - 2",
  },
  {
    id: "3",
    name: "Row - 3",
  },
  {
    id: "4",
    name: "Row - 4",
  },
];

function App() {
  const [rows, updateRows] = useState(myArray);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(rows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateRows(items);
  }
  const handleGridRow = () => {
    const items = Array.from(rows);
    items.splice(items.length + 1, 0, {
      id: items.length + 1?.toString(),
      name: `Row - ${items.length + 1}`,
    });
    updateRows(items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Draggable Grid</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <section className="draggable-grid">
            <div className="grid-item">
              <button onClick={handleGridRow}>Add Row</button>
              <button>Add Column</button>
            </div>
            <div>
              {" "}
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Row rows={rows} />
                    {/* {provided.placeholder} */}
                  </ul>
                )}
              </Droppable>
            </div>
          </section>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
