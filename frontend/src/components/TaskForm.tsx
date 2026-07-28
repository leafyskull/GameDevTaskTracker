import { useState } from "react";
import type { Task } from "../types/Task";

type TaskFormProps = {
    onAddTask: (task: Task) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (title.trim() === "") {
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            type: "Feature",
            priority: "Medium",
            status: "Planned",
        };

        onAddTask(newTask);

        setTitle("");
        setDescription("");
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

            <button type = "submit">Add Task</button>
        </form>
    );
}

export default TaskForm;