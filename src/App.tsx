import "./App.css";
import { Task } from "./models/task";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeComponent from "./components/home/Home";
import EditTaskPage from "./pages/edit-task/EditTask";

const router = createBrowserRouter([
  { path: "/", element: <HomeComponent /> },
  { path: "/task/:id", element: <EditTaskPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
