import { useState } from 'react';
import './App.css';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type {Task} from './types/Task';



const startingTasks: Task[] = [
  {
    id: 1,
    title: "Add barbarian turns",
    description: "Create basic enemy movement",
    type: "Feature",
    priority: "Medium",
    status: "Planned"
  },
  {
    id: 2,
    title: "Add villages",
    description: "Village tiles spawn on map creation, which the player must protect.",
    type: "Feature",
    priority: "Medium",
    status: "Planned"
  },
  {
    id: 3,
    title: "Add barbarian camp",
    description: "Barbarian camp tiles spawn on map creation, and can spawn barbarian units.",
    type: "Feature",
    priority: "Medium",
    status: "Planned"
  }
]




function App() {

  const [tasks, setTasks] = useState<Task[]>(startingTasks);

  function addTask(newTask: Task) {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function deleteTask(taskId: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main>

      <header>
        <h1>Game Development Tracker</h1>
        <p>Tracks features, bugs, and improvements for your game development projects.</p>
      </header>

      <TaskForm onAddTask={addTask} />

      <section className = "task-list">
        {tasks.map((task) => (
          <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={deleteTask} />
        ))}
      </section>

    </main>
  );
}

export default App
