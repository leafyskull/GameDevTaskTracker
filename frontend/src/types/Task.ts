


export type Task = {
    id: number;
    title: string;
    description: string;
    type: "Feature" | "Bug" | "Improvement" | "Other";
    priority: "Low" | "Medium" | "High";
    status: "Planned" | "In Progress" | "Complete";
};

export type NewTask = Omit<Task, "id">;