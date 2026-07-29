# Main.py
# 7/27/2026
# This file contains the backend code for the Game Development Tracker application.

from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Start FastAPI application.
app = FastAPI()

# Add CORS middleware to allow requests from the frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        ],
        allow_credentials = True,
        allow_methods = ["*"],
        allow_headers = ["*"],
)



# TaskCreate: Handles the creation of tasks, from user input.
class TaskCreate(BaseModel):
    title: str
    description: str
    type: Literal["Feature", "Bug", "Improvement", "Other"]
    priority: Literal["Low", "Medium", "High"]
    status: Literal["Planned", "In Progress", "Complete"]

# Task: Represents a task in the system.
class Task(BaseModel):
    id: int
    title: str
    description: str
    type: Literal["Feature", "Bug", "Improvement", "Other"]
    priority: Literal["Low", "Medium", "High"]
    status: Literal["Planned", "In Progress", "Complete"]



# Placeholder for tasks, to be replaced with a database.
tasks: list[Task] = [
    Task(
        id = 1,
        title = "Add barbarian turns",
        description = "Create basic enemy movement.",
        type = "Feature",
        priority = "Medium",
        status = "Planned",
    ),
    Task(
        id = 2,
        title = "Add villages",
        description = "Village tiles spawn on map creation, which the player must protect.",
        type = "Feature",
        priority = "Medium",
        status = "Planned",
    ),
    Task(
        id = 3,
        title = "Add barbarian camp",
        description = "Barbarian camp tiles spawn on map creation, and can spawn barbarian units.",
        type = "Feature",
        priority = "Medium",
        status = "Planned",
    ),
]



### *** API Endpoints *** ###

# app.get("/") - Root endpoint, returns a welcome message.
@app.get("/")
def read_root():
    return {"message": "Game Development Tracker API"}

# app.get("/tasks") - Returns a list of all tasks.
@app.get("/tasks")
def get_tasks() -> list[Task]:
    return tasks

# app.post("/tasks") - Creates a new task and returns it.
@app.post("/tasks", status_code = 201)
def create_task(task_data: TaskCreate) -> Task:
    next_id = max(task.id for task in tasks) + 1 if tasks else 1

    new_task = Task(
        id = next_id,
        title = task_data.title,
        description = task_data.description,
        type = task_data.type,
        priority = task_data.priority,
        status = task_data.status,
    )

    tasks.append(new_task)

    return new_task

# app.delete("/tasks/{task_id}") - Deletes a task by its ID.
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for i in range(len(tasks)):
        if tasks[i].id == task_id:
            del tasks[i]
            return {"message": f"Task with ID {task_id} deleted successfully."}
    raise HTTPException(status_code=404, detail=f"Task with ID {task_id} not found.")