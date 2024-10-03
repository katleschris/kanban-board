import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [tasks, setTasks] = useState({
  week1: [
    { id: '1', content: 'Set up morning & evening skincare routine (Glow Up Your Looks)' },
    { id: '2', content: 'Track expenses for the week (Glow Up Your Finances)' },
    { id: '3', content: 'Meditate for 5 minutes each morning (Glow Up Your Mindset)' },
  ],
  week2: [
    { id: '4', content: 'Book a dental checkup (Glow Up Your Looks)' },
    { id: '5', content: 'Increase cardio to 4 sessions this week (Glow Up Your Health)' },
  ],
  week3: [
    { id: '6', content: 'Go through wardrobe, declutter (Glow Up Your Looks)' },
    { id: '7', content: 'Explore side-hustle opportunities (Glow Up Your Finances)' },
  ],
  week4: [
    { id: '8', content: 'Experiment with new hairstyles or makeup (Glow Up Your Looks)' },
    { id: '9', content: 'Finalize and create your vision board (Glow Up Your Mindset)' },
  ]
});

  const [newTask, setNewTask] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('week1');
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Function to add a task
  const addTask = () => {
    const taskId = Date.now().toString();
    const newTaskObj = { id: taskId, content: newTask, category: 'Uncategorized' };
    
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedWeek]: [...prevTasks[selectedWeek], newTaskObj],
    }));
    setNewTask('');
  };

  // Function to delete a task
  const deleteTask = (week, id) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [week]: prevTasks[week].filter(task => task.id !== id),
    }));
  };

  // Function to edit a task
  const editTask = (week, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [week]: prevTasks[week].map(task => 
        task.id === taskId ? { ...task, content: editContent } : task
      ),
    }));
    setIsEditing(null);
    setEditContent('');
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      
      {/* Task Creation Form */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
        <option value="week1">Week 1</option>
        <option value="week2">Week 2</option>
        <option value="week3">Week 3</option>
        <option value="week4">Week 4</option>
      </select>
      <button onClick={addTask}>Add Task</button>

      {/* Kanban Board */}
      <DragDropContext>
        <div className="board">
          {Object.keys(tasks).map((week, index) => (
            <div key={index} className="column">
              <h2>{`Week ${index + 1}`}</h2>
              <Droppable droppableId={week}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks[week].map((task, taskIndex) => (
                      <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="task"
                          >
                            {isEditing === task.id ? (
                              <div>
                                <input
                                  type="text"
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                />
                                <button onClick={() => editTask(week, task.id)}>Save</button>
                              </div>
                            ) : (
                              <div>
                                <span>{task.content}</span>
                                <button onClick={() => deleteTask(week, task.id)}>Delete</button>
                                <button onClick={() => { 
                                  setIsEditing(task.id);
                                  setEditContent(task.content);
                                }}>Edit</button>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;

  


  