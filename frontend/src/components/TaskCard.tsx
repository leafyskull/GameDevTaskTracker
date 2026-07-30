// TaskCard.tsx
// 7/30/2026
// This file contains the TaskCard component for the Game Dev Tracker project.
// The TaskCard will store information about a task, as well as provide a button(s)
// for functionality.

import type { Task } from '../types/Task';
import { useState} from 'react';

// TaskCardProps - defines the properties that the TaskCard component expects to receive.
type TaskCardProps = {
    task: Task;
    onDeleteTask: (taskId: number) => Promise<void>;
};

// TaskCard: Displays details about a task and provides a button to delete the task.
// task: Task object
// onDeleteTask: Function to handle task deletion
function TaskCard({ task, onDeleteTask }: TaskCardProps){
    
    // This makes the delete button disable and change text while
    // a task is being deleted, to prevent the user from clicking
    // delete several times.
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete(){
        setIsDeleting(true);

        try { 
            await onDeleteTask(task.id);
        } finally {
            setIsDeleting(false);
        }
    }

    // *** TASK CARD VISUAL *** //
    return (
        <article>

            {/* Task info */}
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            {/* Task Details */}
            <div className = "task-details">
                <span>Type: {task.type}</span>
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
            </div>
    
            {/* Delete button */}
            <button
                type = "button"
                onClick = {handleDelete}
                disabled = {isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
            
        </article>
    );
}

export default TaskCard;