import { Link } from "react-router-dom";
import { Task } from "../../models/task";
import { addDays } from "date-fns";

interface TaskProps {
  task: Task;
}

const TaskComponent = (prop: TaskProps) => {
  // const title = "title";
  // const description = "lorem ipsum";
  // const dueDate = new Date();

  let statusString = "Not urgent";
  const today = new Date();

  if (prop.task.dueDate <= today) {
    statusString = "Overdue";
  } else if (prop.task.dueDate <= addDays(today, 7)) {
    statusString = "Due soon";
  }

  return (
    <div className="card mt-2">
      <div className="card-body">
        <h5 className="card-title">{prop.task.name}</h5>
        <div className="card-text">
          <p className="m-0">Description:; {prop.task.description}</p>
          <p className="m-0">Due: {prop.task.dueDate.toISOString()}</p>
          <p className="m-0">Created: {prop.task.createdDate.toISOString()}</p>
          <p className="m-0">status: {statusString}</p>
          <Link to={`/task/${prop.task.id}`}>Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
