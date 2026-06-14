import { useState } from "react";
function TaskForm({
  onClose,
  addTask,
  editingTask,
  tasks,
  setTasks
}) {
    const [title, setTitle] = useState(
    editingTask?.title || ""
    );

    const [description, setDescription] = useState(
    editingTask?.description || ""
    );

    const [priority, setPriority] = useState(
    editingTask?.priority || "Medium"
    );

    const [dueDate, setDueDate] = useState(
    editingTask?.dueDate || ""
    );
    const handleSubmit = () => {

        if (!title.trim()) {
            alert("Task title is required");
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            status: "Pending"
        };

        if (editingTask) {

            setTasks(
                tasks.map((task) =>
                task.id === editingTask.id
                    ? {
                        ...task,
                        title,
                        description,
                        priority,
                        dueDate
                    }
                    : task
                )
            );

        } else {

            addTask(newTask);

        }

        onClose();
    };
    return (
        <div className="modal-overlay">

        <div className="modal">

            <h2>{editingTask ? "Edit Task" : "Create NewTask"}</h2>
            <p className="modal-subtitle">
                Add a new task and stay organized.
            </p>
            <label>Task Title</label>
            <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e)=>
                setTitle(e.target.value)
            }
            />

            <label>Description</label>
            <textarea
            placeholder="Describe the task"
            value={description}
            onChange={(e)=>
                setDescription(e.target.value)
            }
            ></textarea>

            <label>Priority</label>
            <select
              value={priority}
              onChange={(e)=>
                 setPriority(e.target.value)
            }
            >
               <option>High</option>
               <option>Medium</option>
               <option>Low</option>
            </select>

            <label>Due Date</label>
            <input 
            type="date"
            value={dueDate}
            onChange={(e) => 
                setDueDate(e.target.value)
            }
            />

            <div className="modal-actions">

            <button
                className="cancel-btn"
                onClick={onClose}
            >
                Cancel
            </button>

            <button className="save-btn" onClick={handleSubmit}>
                {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>

            </div>

        </div>

        </div>
    );
}

export default TaskForm;