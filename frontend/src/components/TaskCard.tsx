import type { Task } from '../types/Task';


type TaskCardProps = {
    task: Task;
    onDeleteTask: (taskId: number) => Promise<void>;
};

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