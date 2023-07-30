import { Link } from "react-router-dom";
import { Task, TaskData } from "../../models/task";
import TaskComponent from "../task/Task";
import CreateTaskComponent from "../create-task/CreateTask";
import { useCallback, useEffect, useRef, useState } from "react";
import { set } from "date-fns";

const HomeComponent = () => {
  const [enteredSearchInput, setEnteredSearchInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState("due");

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
  }, [enteredSearchInput, tasks]);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearchInput(event.target.value);
  };

  const sortByHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  const fetchTasksHandler = useCallback(async (sortBy: string) => {
    const response = await fetch(
      `http://localhost:3001/tasks?sortBy=${sortBy}`
    );
    const data = await response.json();

    const transformedTasks: Task[] = data.map((taskData: any) => {
      return {
        id: taskData.id,
        name: taskData.name,
        description: taskData.description,
        dueDate: new Date(taskData.dueDate),
        createdDate: new Date(taskData.release_date),
      } as Task;
    });
    setTasks(transformedTasks);
  }, []);

  useEffect(() => {
    fetchTasksHandler(sortBy);
  }, []);

  const onTaskCreated = async () => {
    fetchTasksHandler(sortBy);
  };

  return (
    <>
      <CreateTaskComponent onTaskCreated={onTaskCreated} />
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
                value="due"
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
                value="create"
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
