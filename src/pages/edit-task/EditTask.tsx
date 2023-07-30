import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskFormComponent from "../../components/task-form/TaskForm";
import { TaskData } from "../../models/task";

const EditTaskPage = () => {
  const params = useParams();

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(new Date("2023-07-30"));

  const onFormSubmitted = async (task: TaskData) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (data.id === params.id) {
        alert("Task updated successfully");
      } else {
        alert("Task update failed");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchTasksHandler = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${params.id}`);
      const data = await response.json();

      setTaskId(data.id);
      setTaskName(data.name);
      setTaskDescription(data.description);
      setTaskDueDate(new Date(data.dueDate));
    } catch (error: any) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTasksHandler();
  }, []);

  return (
    <>
      <Link to={`/`}>Home</Link>
      <TaskFormComponent
        onFormSubmitted={onFormSubmitted}
        name={taskName}
        description={taskDescription}
        dueDate={taskDueDate}
      />
    </>
  );
};

export default EditTaskPage;
