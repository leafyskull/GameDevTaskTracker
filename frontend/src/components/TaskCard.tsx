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
    onUpdateTask: (updatedTask: Task) => Promise<boolean>;
};

// TaskCard: Displays details about a task and provides a button to delete the task.
// task: Task object
// onDeleteTask: Function to handle task deletion
// onUpdateTask: Function to handle task updates
function TaskCard({ task, onDeleteTask, onUpdateTask }: TaskCardProps){
    
    // This makes the delete button disable and change text while
    // a task is being deleted, to prevent the user from clicking
    // delete several times.
    const [isDeleting, setIsDeleting] = useState(false);


    // *** FOR EDITING TASKS *** //

    // isEditing - Indicates whether the task is currently being edited.
    // If true, displays edit form. If false, displays task details.
    const [isEditing, setIsEditing] = useState(false);

    // isSaving - Indicates whether the task is currently being saved after editing.
    const [isSaving, setIsSaving] = useState(false);

    // Edit form fields
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [type, setType] = useState<Task["type"]>(task.type);
    const [priority, setPriority] = useState<Task["priority"]>(task.priority);
    const [status, setStatus] = useState<Task["status"]>(task.status);



    async function handleDelete(){
        setIsDeleting(true);

        try { 
            await onDeleteTask(task.id);
        } finally {
            setIsDeleting(false);
        }
    }

    // handleSave: Handles saving the edited task details.
    // This happens when the user clicks the "Save" button after editing a task.
    async function handleSave(event: React.FormEvent<HTMLFormElement>) { 

        event.preventDefault();

        if (title.trim() === "") return;
        
        const updatedTask: Task = {
            ...task,
            title: title.trim(),
            description: description.trim(),
            type: type,
            priority: priority,
            status: status,
        }

        setIsSaving(true);

        try {
            const wasUpdated = await onUpdateTask(updatedTask);
            if (wasUpdated) setIsEditing(false);
        } catch (error) {
            console.error("Failed to update task:", error);
        } finally {
            setIsSaving(false);
        }

    }

    // handleCancelEdit: Handles canceling the edit operation.
    // This happens when the user clicks the "Cancel" button while editing a task.
    function handleCancelEdit() {
        // Reset form fields to original task values
        setTitle(task.title);
        setDescription(task.description);
        setType(task.type);
        setPriority(task.priority);
        setStatus(task.status);

        setIsEditing(false);
    }

    // Placeholder for edit functionality
    async function handleEdit(){
        
        // For now, just toggle if user is editing or not.
        setIsEditing(!isEditing);
    }

    // *** TASK CARD VISUAL *** //
    return (
        <article>

            {/* Task info */}
            { isEditing ?
            <input type = "text" value = {title} onChange = {(e) => setTitle(e.target.value)} />: 
            <h2>{task.title}</h2>
            }

            {isEditing ? 
            <input type = "text" value = {description} onChange = {(e) => setDescription(e.target.value)} /> :
            <p>{task.description}</p>
            }

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

            <button
                type = "button"
                onClick = {isEditing ? handleCancelEdit : handleEdit}
            >
                {isEditing ? "Cancel" : "Edit"}
            </button>
        </article>
    );
}

export default TaskCard;