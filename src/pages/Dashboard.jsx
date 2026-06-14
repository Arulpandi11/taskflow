import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const currentUser =
  JSON.parse(
    localStorage.getItem("currentUser")
  ) || {};
  const navigate = useNavigate();
  const [darkMode, setDarkMode] =useState(false);
  const [showForm, setShowForm] =useState(false);
  const [searchTerm, setSearchTerm] =useState("");
  const [statusFilter, setStatusFilter] =useState("All");
  const [priorityFilter, setPriorityFilter] =useState("All");
  useEffect(() => {

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "dark") {
    setDarkMode(true);
  }

  }, []);
  useEffect(() => {

  const currentUser =
    localStorage.getItem(
      "currentUser"
    );

  if (!currentUser) {
    navigate("/");
  }

  }, [navigate]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });
  const userTasks = tasks.filter(
  (task) =>
    task.userEmail ===
    currentUser?.email
  );
  const filteredTasks = userTasks.filter((task) => {

  const matchesSearch =
    task.title
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = task.dueDate
    ? new Date(task.dueDate)
    : null;

  if (due) {
    due.setHours(0, 0, 0, 0);
  }

  const isOverdue =
    due &&
    due < today &&
    task.status !== "Completed";

  const matchesStatus =
    statusFilter === "All"
      ? true
      : statusFilter === "Overdue"
      ? isOverdue
      : task.status === statusFilter;

  const matchesPriority =
  priorityFilter === "All"
    ? true
    : task.priority === priorityFilter;
  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority
  );

 });
  const totalTasks = userTasks.length;

  const completedTasks = userTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = userTasks.filter(
    (task) => task.status === "Pending"
  ).length;
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const overdueTasks = userTasks.filter((task) => {

    if (
      !task.dueDate ||
      task.status === "Completed"
    ) {
      return false;
    }

    const due = new Date(task.dueDate);

    due.setHours(0, 0, 0, 0);

    return due < today;

  }).length;
  const completionRate =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      );
  const [editingTask, setEditingTask] = useState(null);
  const addTask = (task) => {

    const newTask = {
      ...task,
      userEmail: currentUser?.email
    };

    setTasks([
      ...tasks,
      newTask
    ]);

  };
  const deleteTask = (id) => {
  setTasks(
    tasks.filter((task) => task.id !== id)
  );
  };
  const editTask = (task) => {
  setEditingTask(task);
  setShowForm(true);
  };
  const toggleComplete = (id) => {

  setTasks(
    tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === "Completed"
                ? "Pending"
                : "Completed"
          }
        : task
    )
  );

 };
 useEffect(() => {

  if (darkMode) {
    document.body.classList.add(
      "dark-mode"
    );
  } else {
    document.body.classList.remove(
      "dark-mode"
    );
  }

}, [darkMode]);
useEffect(() => {

  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );

}, [darkMode]);
 useEffect(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
 }, [tasks]);
  return (
    
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <p>Track, organize, and complete your work.</p>
        </div>

        <div className="stats-container">
          <StatsCard
            title="Total Tasks"
            count={totalTasks}
            color="#4f46e5"
          />

          <StatsCard
            title="Pending"
            count={pendingTasks}
            color="#f59e0b"
          />

          <StatsCard
            title="Completed"
            count={completedTasks}
            color="#10b981"
          />
          <StatsCard
            title="Overdue"
            count={overdueTasks}
            color="#ef4444"
          />
          <div className="completion-card">

            <div className="completion-header">
              <h3>Completion Rate</h3>
              <span>{completionRate}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{width: `${completionRate}%`}}
              ></div>
            </div>

          </div>
        </div>

        <div className="task-controls">

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select  value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }>
            <option value="All">All Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option value="All">All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={() =>
              setShowForm(true)
            }
          >
            + Add Task
          </button>
        </div>        
        {userTasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                📋
              </div>

              <h2>No Tasks Yet</h2>

              <p>
                Create your first task and start
                organizing your work.
              </p>

              <button
                onClick={() => setShowForm(true)}
              >
                + Create Task
              </button>

            </div>

          ) : (

            <div className="tasks-list">

              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  task={task}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                  editTask={editTask}
                />
              ))}
              {filteredTasks.length === 0 && (

                <div className="search-empty">

                  <div className="search-empty-icon">
                    🔍
                  </div>

                  <h2>No Matching Tasks</h2>

                  <p>
                    {searchTerm
                      ? `No tasks found for "${searchTerm}"`
                      : "No tasks match the selected filters"}
                  </p>

                </div>

              )}

            </div>

       )}
      </div>
      {
        showForm && (
          <TaskForm
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            addTask={addTask}
            editingTask={editingTask}
            setTasks={setTasks}
            tasks={tasks}
          />
        )
      }
    </>
  );
}

export default Dashboard;