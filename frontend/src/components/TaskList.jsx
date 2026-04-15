export default function TaskList({ tasks, onDelete, onEdit, isAdmin }) {
  if (!tasks.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">No tasks yet</h3>
        <p className="mt-2 text-slate-600">
          {isAdmin
            ? "Assign a task to a user to get started."
            : "No tasks assigned to you yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
              <p className="mt-2 text-slate-600">
                {task.description || "No description provided."}
              </p>
            </div>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-slate-500">
            <div>
              Assigned to: <span className="font-medium">{task.owner?.name}</span>
            </div>
            <div>
              Owner email: <span className="font-medium">{task.owner?.email}</span>
            </div>
            <div>
              Created by: <span className="font-medium">{task.createdBy?.name}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}