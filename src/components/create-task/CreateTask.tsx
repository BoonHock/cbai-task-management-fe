import { useRef, useState } from "react";
import TaskFormComponent from "../task-form/TaskForm";

const CreateTaskComponent = (prop: { onFormSubmitted: any }) => {
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

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
              <TaskFormComponent onFormSubmitted={prop.onFormSubmitted} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskComponent;
