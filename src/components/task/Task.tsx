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

  const getStatusString = (task: Task) => {
    const today = new Date();
    if (task.dueDate <= today) {
      return "Overdue";
    } else if (task.dueDate <= addDays(today, 7)) {
      return "Due soon";
    }
    return "Not urgent";
  };

  return (
    <div className="card mt-2">
      <div className="card-body">
        <h5 className="card-title">{prop.task.name}</h5>
        <div className="card-text">
          <p>Description:; {prop.task.description}</p>
          <p>Due: {prop.task.dueDate.toISOString()}</p>
          <p>Created: {prop.task.dueDate.toISOString()}</p>
          <p>status: {getStatusString(prop.task)}</p>
          <Link to="/task/1">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
