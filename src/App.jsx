import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, TextField, Select, MenuItem, Container, Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
    <Container>
      <h1>My Kanban Board</h1>
      
      {/* Task Creation Form */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a new goal"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            fullWidth
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            <MenuItem value="week1">Week 1</MenuItem>
            <MenuItem value="week2">Week 2</MenuItem>
            <MenuItem value="week3">Week 3</MenuItem>
            <MenuItem value="week4">Week 4</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={addTask}>
            Add
          </Button>
        </Grid>
      </Grid>

      {/* Kanban Board */}
      <DragDropContext>
        <Grid container spacing={3}>
          {Object.keys(tasks).map((week, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h2>{`Week ${index + 1}`}</h2>
                <Droppable droppableId={week}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks[week].map((task, taskIndex) => (
                        <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              elevation={1}
                              sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                              {isEditing === task.id ? (
                                <div>
                                  <TextField
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    variant="outlined"
                                  />
                                  <Button onClick={() => editTask(week, task.id)}>Save</Button>
                                </div>
                              ) : (
                                <div>
                                  <span>{task.content}</span>
                                </div>
                              )}
                              <div>
                                <IconButton onClick={() => deleteTask(week, task.id)} color="secondary">
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => { 
                                  setIsEditing(task.id);
                                  setEditContent(task.content);
                                }} color="primary">
                                  <EditIcon />
                                </IconButton>
                              </div>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default App;
