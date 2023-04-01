import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";


const getDatas = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `Row-${k + offset}`,
    content: `Row - ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function App() {
  const [state, setState] = useState([getDatas(15), getDatas(5, 15)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }
  const handleRowAdd = () => {
    const prevState = [...state];
    const prevStateLength = state[0]?.length + state[1]?.length;
    prevState[0].push({
      id: `Row-${prevStateLength}`,
      content: `Row - ${prevStateLength}`,
    });
    setState(prevState);
  };
  const handleItemClick = (item) => {
    alert("Id= " + item?.id);
  };

  return (
    <div className="App">
      <button type="button" onClick={handleRowAdd} className="btn">
        Add new item
      </button>
      <div
        style={{
          display: "flex",
          flexBasis: "80%",
          flexGrow: 0,
          flexShrink: 0,
          backgroundColor: "rgb(239, 236, 236)",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ flexBasis: "50%", flexGrow: 0, flexShrink: 0 }}
                >
                  <div>
                    <h1>{ind == 1 ? "Trash" : "Rows"}</h1>
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className="item"
                              onClick={() => handleItemClick(item)}
                            >
                              {item.content}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
