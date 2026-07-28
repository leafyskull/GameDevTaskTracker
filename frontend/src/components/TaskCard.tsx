import type { Task } from '../types/Task';


type TaskCardProps = {
    task: Task;
};

function TaskCard({ task }: TaskCardProps){
    return (
        <article>
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <div className = "task-details">
                <span>Type: {task.type}</span>
                <span>Priority: {task.priority}</span>
                <span>Status: {task.status}</span>
            </div>
            
        </article>
    );
}

export default TaskCard;