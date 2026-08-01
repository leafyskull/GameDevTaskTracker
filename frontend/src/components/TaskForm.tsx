// TaskForm.tsx
// 7/30/2026
// This file contains the TaskForm component for the Game Dev Tracker project.
// The TaskForm allows users to input details for a new task and submit it to the backend.

import { useState } from "react";
import type { Task, NewTask } from "../types/Task";

// TaskFormProps: Defines the properties of a task.
type TaskFormProps = {
    onAddTask: (task: NewTask) => Promise<boolean>;
};

// TaskForm: A form component that allows users to add a new task.
function TaskForm({ onAddTask }: TaskFormProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<Task["type"]>("Feature");
    const [priority, setPriority] = useState<Task["priority"]>("Medium");
    const [status, setStatus] = useState<Task["status"]>("Planned");

    // handleSubmit: Handles the submitting of the task form.
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (title.trim() === "") {
            return;
        }

        // Create a new task given task data from HTML form.
        const newTask: NewTask = {
            title: title.trim(),
            description: description.trim(),
            type,
            priority,
            status,
        };

        // Wait to add new task before clearing form.
        const wasAdded = await onAddTask(newTask);

        if (!wasAdded) return;

        // Clear the form after adding new task.
        setTitle("");
        setDescription("");
        setType("Feature");
        setPriority("Medium");
        setStatus("Planned");
    }

    return (
        <form className = "task-form" onSubmit = {handleSubmit}>
            <h2>Add Task</h2>

            <label>
                Title
                <input
                    type = "text"
                    value = {title}
                    onChange = {(event) => setTitle(event.target.value)}
                />
            </label>

            <label>
                Description
                <input
                    type = "text"
                    value = {description}
                    onChange = {(event) => setDescription(event.target.value)}
                />
            </label>

            <label>
                Type
                <select
                    value = {type}
                    onChange = {(event) => setType(event.target.value as Task["type"])}
                >
                    <option value = "Feature">Feature</option>
                    <option value = "Bug">Bug</option>
                    <option value = "Improvement">Improvement</option>
                    <option value = "Other">Other</option>
                </select>
            </label>

            <label>
                Priority
                <select
                    value = {priority}
                    onChange = {(event) => setPriority(event.target.value as Task["priority"])}
                >
                    <option value = "Low">Low</option>
                    <option value = "Medium">Medium</option>
                    <option value = "High">High</option>   
                </select>
            </label>

            <label>
                Status
                <select
                    value = {status}
                    onChange = {(event => setStatus(event?.target.value as Task["status"]))}
                >
                    <option value = "Planned">Planned</option>
                    <option value = "In Progress">In Progress</option>
                    <option value = "Complete">Complete</option>
                </select>
            </label>

            <button type = "submit">Add Task</button>
        </form>
    );
}

export default TaskForm;