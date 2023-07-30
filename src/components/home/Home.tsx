import { Link } from "react-router-dom";
import { Task } from "../../models/task";
import TaskComponent from "../task/Task";
import CreateTaskComponent from "../create-task/CreateTask";
import { useEffect, useRef, useState } from "react";

const fullTasks: Task[] = [
  {
    id: "1",
    name: "title",
    description: "lorem ipsum",
    dueDate: new Date("2021-10-10"),
    createdDate: new Date("2022-10-10"),
  },
  {
    id: "2",
    name: "title2",
    description: "afdasfdasfadsf sdfdac",
    dueDate: new Date("2023-10-10"),
    createdDate: new Date("2021-10-10"),
  },
  {
    id: "3",
    name: "3",
    description: "3",
    dueDate: new Date("2023-07-31"),
    createdDate: new Date("2023-10-10"),
  },
];

const HomeComponent = () => {
  const [enteredSearchInput, setEnteredSearchInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>(fullTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState(0);

  useEffect(() => {
    if (enteredSearchInput.length === 0) {
      setFilteredTasks(tasks);
    }
    const identifier = setTimeout(() => {
      const filteredTasks = tasks.filter((task) =>
        task.name.includes(enteredSearchInput)
      );
      setFilteredTasks(filteredTasks);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredSearchInput]);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearchInput(event.target.value);
  };

  const sortByHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "0") {
      // sort by due date
    } else {
      // sort by created date
    }
  };

  const taskCreatedHandler = () => {
    console.log("task created");
  };

  return (
    <>
      <CreateTaskComponent onFormSubmitted={taskCreatedHandler} />
      <div className="mb-3 row mt-3">
        <label className="col-sm-1 col-form-label">Search</label>
        <div className="col-sm-11">
          <input
            type="text"
            className="form-control"
            onChange={searchInputHandler}
          />
        </div>
      </div>
      <div className="mb-3 row mt-3">
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-1 pt-0">Sort by</legend>
          <div className="col-sm-11">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="0"
                onChange={sortByHandler}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Due date
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="1"
                onChange={sortByHandler}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Create date
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      {/* <Link to="/task/create">Create new</Link> */}
      {filteredTasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </>
  );
};

export default HomeComponent;
