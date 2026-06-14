function TaskCard({
  id,
  title,
  status,
  priority,
  dueDate,
  task,
  deleteTask,
  toggleComplete,
  editTask
}) {
  let dueMessage = "";

if (dueDate) {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;

  const diffDays =
    Math.round(
      diffTime /
      (1000 * 60 * 60 * 24)
    );

  if (
    diffDays < 0 &&
    status !== "Completed"
  ) {
    dueMessage = "⚠ Overdue";
  }

  else if (
    diffDays === 0 &&
    status !== "Completed"
  ) {
    dueMessage = "📅 Due Today";
  }

  else if (
    diffDays > 0 &&
    status !== "Completed"
  ) {
    dueMessage =
      `⏳ ${diffDays} day${
        diffDays > 1 ? "s" : ""
      } left`;
  }

}
  return (
    <div className={`task-card ${status.toLowerCase()}`}>

      <div className="task-info">
        <div className="task-top">
          <h3>{title}</h3>
          <span className={`task-status ${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        <div className="task-meta">
          <span
            className={`task-priority priority-${priority.toLowerCase()}`}
          >
            {priority} Priority
          </span>
        </div>
        <div className="task-footer">
          <p className="task-date">
            📅 Due: {dueDate || "No date"}
          </p>

          {dueMessage && (
            <p
              className={`due-status ${
                dueMessage.includes("Overdue")
                  ? "overdue"
                  : "upcoming"
              }`}
            >
              {dueMessage}
            </p>
          )}      
        </div>
      </div>

      <div className="task-actions">

        <button
          className="edit-btn"
          onClick={() => editTask(task)}
        >
          ✏️
        </button>

        <button
          className="complete-btn"
          onClick={() => toggleComplete(id)}
        >
          {status === "Completed" ? "↩" : "✓"}
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(id)}
        >
          🗑
        </button>

      </div>

    </div>
  );
}

export default TaskCard;