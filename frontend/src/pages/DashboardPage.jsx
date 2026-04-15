import { useEffect, useState } from "react";
import API from "../api/client";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(true);

  const isAdmin = user?.role === "admin";

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data);
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  const loadUsers = async () => {
    if (!isAdmin) return;

    try {
      const res = await API.get("/users");
      setUsers(res.data.data.filter((item) => item.role === "user"));
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const handleSubmitTask = async (payload) => {
    try {
      if (editingTask) {
        const res = await API.put(`/tasks/${editingTask._id}`, payload);
        setTasks((prev) =>
          prev.map((task) => (task._id === editingTask._id ? res.data.data : task))
        );
        setEditingTask(null);
      } else {
        const res = await API.post("/tasks", payload);
        setTasks((prev) => [res.data.data, ...prev]);
      }

      setError("");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          (editingTask ? "Failed to update task" : "Failed to save task")
      );
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Protected Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">
          {isAdmin ? "Admin Task Control Center" : "My Assigned Tasks"}
        </h1>
        <p className="mt-3 text-slate-600">
          Logged in as <span className="font-semibold text-slate-900">{user?.name}</span>{" "}
          ({user?.role})
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {isAdmin && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total users</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">{users.length}</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total tasks</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">{tasks.length}</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Admin permissions</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Assign · Update · Delete</h3>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <TaskForm
          onSubmit={handleSubmitTask}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
          isAdmin={isAdmin}
          users={users}
        />

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              {isAdmin ? "All Assigned Tasks" : "Tasks Assigned To Me"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isAdmin
                ? "As admin, you can assign tasks to users and manage every task in the system."
                : "You can only see and manage your own tasks."}
            </p>
          </div>

          {loadingTasks ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading tasks...
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </div>
    </section>
  );
}