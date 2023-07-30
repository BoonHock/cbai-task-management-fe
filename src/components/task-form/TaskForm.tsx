import { useEffect, useRef, useState } from "react";
import { TaskData } from "../../models/task";

interface TaskFormProps {
  onFormSubmitted: any;
  name?: string;
  description?: string;
  dueDate?: Date;
}

const TaskFormComponent = (prop: TaskFormProps) => {
  const [dueDate, setDueDate] = useState(new Date());

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);

  const [isFormValid, setIsFormValid] = useState(true);

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredDescription = descriptionInputRef.current?.value;
    const enteredDueDate = dueDateInputRef.current?.value;

    setIsFormValid(true);
    if (!enteredName || !enteredDescription || !enteredDueDate) {
      setIsFormValid(false);
      return;
    }

    const taskData: TaskData = {
      name: enteredName,
      description: enteredDescription,
      dueDate: new Date(enteredDueDate),
    };
    await prop.onFormSubmitted(taskData);

    nameInputRef.current!.value = "";
    descriptionInputRef.current!.value = "";
    setDueDate(new Date());
  };

  useEffect(() => {
    if (prop.dueDate) {
      setDueDate(prop.dueDate);
    }
  }, [prop.dueDate]);

  const dueDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(new Date(event.target.value));
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
            value={dueDate.toISOString().slice(0, 10)}
            onChange={dueDateHandler}
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
