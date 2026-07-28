import { useEffect, useState } from 'react';
import './App.css';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type {Task} from './types/Task';



function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://127.0.0.1:8000/tasks");
        console.log("Response:", response);
        console.log("Status:", response.status);
        console.log("Content type:", response.headers.get("content-type"));

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks with status ${response.status}`);
        }

        const taskData: Task[] = await response.json();
        setTasks(taskData);
      } catch (error) {
        console.error("Failed to load tasks:", error);

        if (error instanceof Error) {
          setError(`Could not load tasks: ${error.message}.`);
        } else {
          setError("Could not load tasks from server.");
        
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

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

      {isLoading && <p>Loading tasks...</p>}

      {error && <p className = "error">{error}</p>}

      {!isLoading && !error && (
        <section className = "task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={deleteTask}
            />
          ))}
        </section>
      )}

    </main>
  );
}

export default App
