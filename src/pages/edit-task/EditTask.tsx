import TaskFormComponent from "../../components/task-form/TaskForm";

const EditTaskPage = () => {
  const onFormSubmitted = () => {
    console.log("edit form submitted");
  };

  return (
    <TaskFormComponent
      onFormSubmitted={onFormSubmitted}
      name="abc"
      description="def"
      dueDate={new Date()}
    />
  );
};

export default EditTaskPage;
