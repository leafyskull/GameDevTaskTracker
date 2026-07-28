from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()



class Task(BaseModel):
    id: int
    title: str
    description: str
    type: Literal["Feature", "Bug", "Improvement", "Other"]
    priority: Literal["Low", "Medium", "High"]
    status: Literal["Planned", "In Progress", "Complete"]

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


@app.get("/")
def read_root():
    return {"message": "Game Development Tracker API"}

@app.get("/tasks")
def get_tasks() -> list[Task]:
    return tasks