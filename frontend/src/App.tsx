// App.tsx
// 7/27/2026
// This file contains the main application component for the Game Dev Tracker project.

import { useEffect, useState } from 'react';
import './App.css';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type { Task, NewTask } from './types/Task';



function App() {

  // tasks - holds the list of tasks fetched from the backend.
  // isLoading - indicates whether the tasks are currently being loaded.
  // error - holds any error message that occurs during fetching or adding tasks.
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

  async function addTask(newTask: NewTask): Promise<boolean> {
    try {
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Failed to add task with status ${response.status}`);
      }

      const createdTask: Task = await response.json();

      setTasks((currentTasks) => [...currentTasks, createdTask]);
      return true;
    }
    catch (error)
    {
      console.error("Failed to add task:", error);

      if (error instanceof Error) {
        setError(`Could not add task: ${error.message}.`);
      } else {
        setError("Could not add task to server.");
      }

      return false;
    }
  
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
