import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesignerTasks from "./DesignerTasks";
import PagesTasks from "./PagesTasks";
import AddUser from "./AddUser";
import TaskForm from "./TaskForm";

// Uncomment if API_BASE_URL is used elsewhere
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Dashboard() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const renderContent = () => {
    switch (selectedField) {
      case "designers":
        return <DesignerTasks />;
      case "pages":
        return <PagesTasks />;
      case "user":
        return <AddUser />;
      case "addtask":
        return <TaskForm />;
      default:
        return <div className="text-gray-100">Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-40" : "w-60 "
        } flex flex-col h-screen p-3 bg-gray-800 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {[
                { key: "designers", label: "Designer" },
                { key: "pages", label: "Pages" },
                { key: "user", label: "Add User" },
                { key: "addtask", label: "Add Task" }
              ].map(({ key, label }) => (
                <li className="rounded-sm" key={key}>
                  <button
                    onClick={() => setSelectedField(key)}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <span className="text-gray-100">{label}</span>
                  </button>
                </li>
              ))}

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("username");
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-500 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-gray-100">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        {renderContent()}
      </div>
    </div>
  );
}
