import { useRef, useState } from "react";
import TaskFormComponent from "../task-form/TaskForm";
import { TaskData } from "../../models/task";

interface CreateTaskProps {
  onTaskCreated: any;
}

const CreateTaskComponent = (prop: CreateTaskProps) => {
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  const taskCreatedHandler = async (task: TaskData) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (data.id) {
        closeModalButtonRef.current?.click();
        alert("Task created successfully");
        prop.onTaskCreated();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create new task
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModalButtonRef}
              ></button>
            </div>
            <div className="modal-body">
              <TaskFormComponent onFormSubmitted={taskCreatedHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskComponent;
