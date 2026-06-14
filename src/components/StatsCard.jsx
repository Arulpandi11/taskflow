import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle
} from "react-icons/fi";

function StatsCard({ title, count, color }) {

  const getIcon = () => {
    switch (title) {
      case "Total Tasks":
        return <FiFileText />;

      case "Pending":
        return <FiClock />;

      case "Completed":
        return <FiCheckCircle />;

      case "Overdue":
        return <FiAlertTriangle />;

      default:
        return null;
    }
  };

  return (
    <div className="stat-card">

      <div className="stat-header">

        <div
          className="stat-icon"
          style={{ color }}
        >
          {getIcon()}
        </div>

        <div>
          <h3>{title}</h3>
          <p style={{ color }}>{count}</p>
        </div>

      </div>

    </div>
  );
}

export default StatsCard;