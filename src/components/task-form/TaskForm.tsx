import { useRef, useState } from "react";

interface TaskFormProps {
  onFormSubmitted: any;
  name?: string;
  description?: string;
  dueDate?: Date;
}

const TaskFormComponent = (prop: TaskFormProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  const [isFormValid, setIsFormValid] = useState(true);

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredDescription = descriptionInputRef.current?.value;
    const enteredDueDate = dueDateInputRef.current?.value;

    setIsFormValid(true);
    if (!enteredName || !enteredDescription || !enteredDueDate) {
      setIsFormValid(false);
      return;
    }

    // submit form
    closeModalButtonRef.current?.click();

    prop.onFormSubmitted();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputName"
            ref={nameInputRef}
            defaultValue={prop.name}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
          Description
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputDescription"
            ref={descriptionInputRef}
            defaultValue={prop.description}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputDueDate" className="col-sm-2 col-form-label">
          Due Date
        </label>
        <div className="col-sm-10">
          <input
            type="date"
            className="form-control"
            id="inputDueDate"
            ref={dueDateInputRef}
            defaultValue={(prop.dueDate ? prop.dueDate : new Date())
              .toISOString()
              .slice(0, 10)}
          />
        </div>
      </div>
      {!isFormValid && <p className="text-danger ">Form is invalid</p>}
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default TaskFormComponent;
