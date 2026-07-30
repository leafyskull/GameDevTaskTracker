// TaskCard.tsx
// 7/30/2026
// This file contains the TaskCard component for the Game Dev Tracker project.
// The TaskCard will store information about a task, as well as provide a button(s)
// for functionality.

import type { Task } from '../types/Task';

// TaskCardProps - defines the properties that the TaskCard component expects to receive.
type TaskCardProps = {
    task: Task;
    onDeleteTask: (taskId: number) => Promise<void>;
};

// TaskCard: Displays details about a task and provides a button to delete the task.
// task: Task object
// onDeleteTask: Function to handle task deletion
function TaskCard({ task, onDeleteTask }: TaskCardProps){
    return (
        <article>
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <div className = "task-details">
                <span>Type: {task.type}</span>
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
            </div>

            <button
                type = "button"
                onClick = {() => onDeleteTask(task.id)}
            >
                Delete Task
            </button>
            
        </article>
    );
}

export default TaskCard;