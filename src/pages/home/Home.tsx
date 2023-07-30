import { Task } from "../../models/task";
import TaskComponent from "../../components/task/Task";
import CreateTaskComponent from "../../components/create-task/CreateTask";
import { useCallback, useEffect, useState } from "react";

const HomeComponent = () => {
  const PAGE_SIZE = 5;

  const [enteredSearchInput, setEnteredSearchInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState("due");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [oldSearchInput, setOldSearchInput] = useState("");

  useEffect(() => {
    if (oldSearchInput === enteredSearchInput) {
      return;
    }
    const identifier = setTimeout(() => {
      setOldSearchInput(enteredSearchInput);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredSearchInput]);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearchInput(event.target.value);
  };

  const sortByHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  const fetchTasksHandler = useCallback(
    async (sortBy: string, enteredSearchInput: string, currentPage: number) => {
      const response = await fetch(
        `http://localhost:3001/tasks?sortBy=${sortBy}&search=${enteredSearchInput}&page=${currentPage}&limit=${PAGE_SIZE}`
      );
      const res = await response.json();
      const { data, total } = res;

      const transformedTasks: Task[] = data.map((taskData: any) => {
        return {
          id: taskData.id,
          name: taskData.name,
          description: taskData.description,
          dueDate: new Date(taskData.dueDate),
          createdDate: new Date(taskData.createdDate),
        } as Task;
      });
      setTasks(transformedTasks);

      const totalPages = Math.ceil(total / PAGE_SIZE);
      setTotalPages(totalPages);
    },
    []
  );

  useEffect(() => {
    fetchTasksHandler(sortBy, enteredSearchInput, currentPage);
  }, [fetchTasksHandler, oldSearchInput, sortBy, currentPage]);

  const onTaskCreated = async () => {
    fetchTasksHandler(sortBy, enteredSearchInput, currentPage);
  };

  const prevHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const nextHandler = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage((prev) => {
      return prev + 1;
    });
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
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
      <div>
        <button
          itemType="button"
          className="btn btn-info"
          onClick={prevHandler}
        >
          &lt;
        </button>
        &nbsp;page {currentPage} of {totalPages}&nbsp;
        <button
          itemType="button"
          className="btn btn-info"
          onClick={nextHandler}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default HomeComponent;
