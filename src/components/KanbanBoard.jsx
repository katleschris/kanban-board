import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const KanbanBoard = ({ tasks, setTasks }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside a column

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {Object.keys(tasks).map((key) => (
          <Column key={key} columnId={key} tasks={tasks[key]} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
