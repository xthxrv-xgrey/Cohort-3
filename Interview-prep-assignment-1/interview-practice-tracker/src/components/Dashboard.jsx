import { CircleCheck, CircleDashed, Clock, ListTodo } from "lucide-react";

function StatCard({ label, value, Icon, tone }) {
  return (
    <div className="stat-card">
      <span className={`stat-icon stat-icon-${tone}`}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function Dashboard({ stats }) {
  const share = (count) => (stats.total === 0 ? 0 : (count / stats.total) * 100);

  return (
    <section aria-labelledby="dashboard-heading" className="dashboard">
      <h2 id="dashboard-heading" className="sr-only">
        Dashboard
      </h2>

      <div className="stats">
        <StatCard label="Total" value={stats.total} Icon={ListTodo} tone="total" />
        <StatCard label="Completed" value={stats.completed} Icon={CircleCheck} tone="completed" />
        <StatCard label="In Progress" value={stats.inProgress} Icon={Clock} tone="progress" />
        <StatCard label="Pending" value={stats.pending} Icon={CircleDashed} tone="pending" />
      </div>

      <div className="card progress-card">
        <div className="progress-header">
          <span className="progress-title">Overall completion</span>
          <span className="progress-percent">{stats.percent}%</span>
        </div>

        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Overall completion"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={stats.percent}
        >
          <span className="segment segment-completed" style={{ width: `${share(stats.completed)}%` }} />
          <span className="segment segment-progress" style={{ width: `${share(stats.inProgress)}%` }} />
        </div>

        <p className="progress-legend">
          <span className="legend-item">
            <span className="legend-dot legend-completed" /> Completed
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-progress" /> In progress
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-pending" /> Pending
          </span>
        </p>
      </div>
    </section>
  );
}

export default Dashboard;
