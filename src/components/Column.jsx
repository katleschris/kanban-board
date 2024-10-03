import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ columnId, tasks }) => {
  const titleMap = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
  };

  return (
    <div className="column">
      <h2>{titleMap[columnId]}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
